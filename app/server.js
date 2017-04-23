const Koa = require('koa')
const send = require('koa-send')
const koaJWT = require('koa-jwt')
const koaBody = require('koa-bodyparser')
const koaRouter = require('koa-router')
const { sign } = require('jsonwebtoken')
const { graphqlKoa, graphiqlKoa } = require('graphql-server-koa')

const DB = require('./db')
const schema = require('./schema')

const app = new Koa()
const router = koaRouter()

app.use(koaBody()).use(koaJWT({ secret: 'NETEASE', passthrough: true }))


router.get('*', async (ctx, next) => {
  if (ctx.path.endsWith('graphiql')) {
    await next()
  } else {
    await send(ctx, 'public/index.html')
  }
})
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

router.post('/login', async (ctx) => {
  const { email, password } = ctx.request.body
  if (!email || !password) {
    ctx.body = ''
    return
  }

  const person = await DB.model('person').find({ where: { email, password } })
  if (person) {
    ctx.body = await sign({ id: person.id, email, name: person.name, isAdmin: person.isAdmin }, 'NETEASE', { expiresIn: '2 days' })
  } else {
    ctx.body = ''
  }
})

app.use(router.routes()).use(router.allowedMethods())
app.listen(3000, '0.0.0.0', () => console.log('Now browser to localhost:3000/graphql'))
