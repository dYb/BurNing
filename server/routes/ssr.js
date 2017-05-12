const fs = require('fs')
const path = require('path')
const React = require('react')
const Router = require('koa-router')
const { promisify } = require('bluebird')
const { Provider } = require('react-redux')
const { StaticRouter, matchPath } = require('react-router-dom')
const { renderToString } = require('react-dom/server')

const actions = require('../../src/actions')
const { default: App } = require('../../src/containers/App')
const { default: configureStore } = require('../../src/store')
const { default: routes } = require('../../src/routes')

const readFile = promisify(fs.readFile)
const router = new Router()

router.get('/', async (ctx) => {
  const filePath = path.resolve(__dirname, '../..', 'public', 'index.html')
  try {
    const html = await readFile(filePath, 'utf8')
    const context = {}
    const store = configureStore({
      authToken: ctx.state.user
    })
    let match = null
    const matchedRoute = routes.find((route) => {
      match = matchPath(ctx.req.url, route)
      return match
    })
    if (matchedRoute && matchedRoute.onNavigate && typeof actions[matchedRoute.onNavigate] === 'function') {
      await store.dispatch(actions[matchedRoute.onNavigate](match.params))
    }
    const markup = renderToString(
      <Provider store={store}>
        <StaticRouter
          location={ctx.req.url}
          context={context}
        >
          <App location={{ pathname: ctx.req.url }} />
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
