const Router = require('koa-router')
const { graphqlKoa, graphiqlKoa } = require('graphql-server-koa')
const schema = require('../schema')

const router = new Router()

router.post('/graphql', graphqlKoa((ctx) => {
  return {
    schema,
    context: {
      user: ctx.state.user
    },
    debug: process.env.NODE_ENV === 'development'
  }
}))
router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }))
module.exports = router
