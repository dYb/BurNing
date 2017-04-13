const Koa = require('koa')
const send = require('koa-send')
const koaBody = require('koa-bodyparser')
const koaRouter = require('koa-router')
const { graphqlKoa, graphiqlKoa } = require('graphql-server-koa')

const schema = require('./schema')

const app = new Koa()
const router = koaRouter()

app.use(koaBody())
router.get('/', async (ctx) => {
  await send(ctx, 'public/index.html')
})
router.post('/graphql', graphqlKoa({schema}))
router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }))

app.use(router.routes())
app.use(router.allowedMethods())
app.listen(3000, () => console.log('Now browser to localhost:3000/graphql'))
