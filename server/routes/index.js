const Router = require('koa-router')

const graphql = require('./graphql')
const login = require('./login')
const ssr = require('./ssr')

const router = new Router()

router
  .use(graphql.routes())
  .use(login.routes())
  .use(ssr.routes())

module.exports = router
