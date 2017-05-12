const Router = require('koa-router')
const { DB } = require('../db')
const router = new Router()
const { sign } = require('jsonwebtoken')

router.post('/login', async (ctx) => {
  const { email, password } = ctx.request.body
  if (!email || !password) {
    ctx.body = ''
    return
  }
  const person = await DB.model('person').find({ where: { email, password } })
  if (person) {
    const token = await sign({ id: person.id, email, name: person.name, isAdmin: person.isAdmin }, 'NETEASE', { expiresIn: '7 days' })
    ctx.body = token
    ctx.cookies.set('jsonwebtoken', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      overwrite: true,
      httpOnly: false
    })
  } else {
    ctx.body = ''
  }
})
module.exports = router
