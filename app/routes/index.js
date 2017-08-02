import Router from 'koa-router'
import RequireDir from 'require-dir'
import Debug from 'debug'
import validator from 'koa-joi-validator'
import Joi from 'joi'
import convert from 'koa-convert'
import authentication from '../lib/authentication'

const debug = new Debug('app:router:index:')

const ROUTES = new RequireDir()
const CONTROLLERS = new RequireDir('../controllers', { recurse: true })

debug('ROUTES: ', ROUTES)
export default function() {
  const router = new Router({
    prefix: '/api/v1',
  })

  router.get('/sign', CONTROLLERS.sign)

  router.get('/users', authentication, CONTROLLERS.users.list)
  router.post('/users', authentication, convert(validator.validate({
    body: {
      name: Joi.string().required(),
      age: Joi.number(),
    },
  })), CONTROLLERS.users.create)

  return router
}
