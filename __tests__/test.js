const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
  console.log('body 1')
  ctx.body = 'hello world 1'
  await next()
  console.log('body 11')
})

app.use(async (ctx, next) => {
  console.log('Before time')
  const start = Date.now()
  await next()
  const s = Date.now() - start
  console.log('After time')
})

app.use(async (ctx, next) => {
  console.log('Before log')
  await next()
  console.log('After log')
})

app.use((ctx) => {
  console.log('body 2')
  ctx.body = 'hello world 2'
})

app.listen(3000)

