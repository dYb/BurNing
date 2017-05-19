const fs = require('fs')
const { resolve } = require('path')

const Router = require('koa-router')
const { promisify } = require('bluebird')

let router = null

if (process.env.NODE_ENV === 'production') {
  router = require('./ssr')
} else {
  router = new Router()
  const readFile = promisify(fs.readFile)
  const filePath = resolve(__dirname, '../..', 'public', 'index.html')

  router.get('/', async (ctx) => {
    const html = await readFile(filePath, 'utf8')
    ctx.body = html.replace('{{STATE}}', '{}').replace('{{SSR}}', '')
  })
}

export default router
