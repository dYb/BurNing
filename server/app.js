const Koa = require('koa')
const send = require('koa-send')
const koaJWT = require('koa-jwt')
const koaBody = require('koa-bodyparser')
const koaRouter = require('koa-router')
const { times } = require('lodash')
const { sign } = require('jsonwebtoken')
const { graphqlKoa, graphiqlKoa } = require('graphql-server-koa')

const { DB, Person } = require('./db')
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
    ctx.body = await sign({ id: person.id, email, name: person.name, isAdmin: person.isAdmin }, 'NETEASE', { expiresIn: '7 days' })
  } else {
    ctx.body = ''
  }
})

app.use(router.routes()).use(router.allowedMethods())
app.listen(3000, '0.0.0.0', () => console.log('Now browser to localhost:3000/graphql'))

DB.sync({ force: true }).then(() => {
  times(10, (i) => {
    Person.create({
      name: 'ybduan' + i,
      email: 'dyb' + i + '@gmail.com',
      password: '123456',
      isAdmin: i === 0
    }).then((person) => {
      return person.createPost({
        title: `Sample title by ${person.name}`,
        content: `This is a sample article`,
        outward: i % 2 === 0,
        receivers: [1]
      })
    })
  })
})
