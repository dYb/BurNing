import Router from 'koa-router'

import login from './login'
import graphql from './graphql'
import universal from './universal'

const router = new Router()

router.get('/favicon.ico', (ctx) => {
  ctx.redirect('https://facebook.github.io/react/favicon.ico')
})

router
  .use(login.routes())
  .use(graphql.routes())
  .use(universal.routes())

module.exports = router
