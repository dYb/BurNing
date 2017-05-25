import fs from 'fs'
import path from 'path'
import React from 'react'
import Router from 'koa-router'
import { promisify } from 'bluebird'
import { Provider } from 'react-redux'
import { StaticRouter, matchPath } from 'react-router-dom'
import { renderToString } from 'react-dom/server'

import App from 'containers/App'
import configureStore from 'redux/store'
import routes from 'src/routes'

const readFile = promisify(fs.readFile)
const router = new Router()

router.get('/', async (ctx) => {
  const filePath = path.resolve(__dirname, '../..', 'public', 'index.html')
  try {
    const html = await readFile(filePath, 'utf8')
    const context = {}
    const store = configureStore({
      auth: {
        user: ctx.state.user
      }
    })
    let match = null
    const matchedRoute = routes.find((route) => {
      match = matchPath(ctx.req.url, route)
      return match
    })
    if (matchedRoute && matchedRoute.onNavigate && typeof matchedRoute.onNavigate === 'function') {
      await store.dispatch(matchedRoute.onNavigate(match.params))
    }
    const markup = renderToString(
      <Provider store={store}>
        <StaticRouter
          location={ctx.req.url}
          context={context}
        >
          <App />
        </StaticRouter>
      </Provider>
    )
    if (context.url) {
      ctx.redirect(301, context.url)
    } else {
      // we're good, send the response
      const preloadState = JSON.stringify(store.getState())
      ctx.body = html
        .replace('{{SSR}}', markup)
        .replace('{{STATE}}', preloadState.replace(/</g, '\\u003c'))
    }
  } catch (err) {
    console.error(err)
    ctx.body = err.toString()
    ctx.status = 404
  }
})
module.exports = router
