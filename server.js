const Koa = require('koa')
const koaBody = require('koa-bodyparser')
const koaRouter = require('koa-router')
const { graphqlKoa, graphiqlKoa } = require('graphql-server-koa')

const schema = require('./schema')

const app = new Koa()
const router = koaRouter()

app.use(koaBody())
router.get('/', (ctx) => {
  ctx.body = '<a href="/graphiql">graphql</a>'
})
router.post('/graphql', graphqlKoa({schema}))
router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }))

app.use(router.routes())
app.use(router.allowedMethods())
app.listen(3000, () => console.log('Now browser to localhost:3000/graphql'))
