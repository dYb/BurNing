const Koa = require('koa')
const koaJWT = require('koa-jwt')
const koaBody = require('koa-bodyparser')
const { times } = require('lodash')

const router = require('./routes')
const { DB, Person } = require('./db')
const app = new Koa()
app
  .use(koaBody())
  .use(koaJWT({
    cookie: 'jsonwebtoken',
    secret: 'NETEASE',
    passthrough: true
  }))
  .use(router.routes())
  .use(router.allowedMethods())
  // Always return the main index.html, so react-router render the route in the client


// router.get('*', async (ctx, next) => {
//   if (ctx.path.endsWith('graphiql')) {
//     await next()
//   } else {
//     await send(ctx, 'public/index.html')
//   }
// })


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
