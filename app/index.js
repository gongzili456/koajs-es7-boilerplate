import Koa from 'koa'
import boom from 'boom'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import Debug from 'debug'
import http from 'http'
import Socket from 'socket.io'
import router from './routes'
// import filters from './filters'
const debug = new Debug('app:index:')

const APP = new Koa()
// Error Handler
APP.use((ctx, next) =>
  next()
  .then(() => {
    if (ctx.status >= 400) {
      debug('ctx.status: ', ctx.status)
      return ctx.body = boom.create(ctx.status).output.payload
    }
    return false
  })
  .catch(e => {
    debug('app error: ', e.status, ',', e.message, ',', e.stack)
    const status = e.status || 500
    ctx.status = status
    ctx.body = boom.create(status, e.message).output.payload
  })
)

// User log
APP.use(logger())

// Use body parser
APP.use(bodyParser())

// Use Filters
// APP.use(somfilter)
// End Filters

// Use router
APP.use(router().routes())
APP.use(router().allowedMethods())

const server = http.createServer(APP.callback())
const io = new Socket()

io.on('connection', socket => {
  debug('A socket client connected.')
})

APP.context.io = io

export default server
