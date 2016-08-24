import Router from 'koa-router'
import RequireDir from 'require-dir'
import Debug from 'debug'
import validator from 'koa-joi-validator'
import authentication from '../lib/authentication'

const debug = new Debug('app:router:index:')

const ROUTES = new RequireDir()
const CONTROLLERS = new RequireDir('../controllers', { recurse: true })

debug('ROUTES: ', ROUTES)
export default function() {
	const router = new Router({
		prefix: '/api/v1',
	})

	router.get('/', authentication, ctx => {
		ctx.body = 'index.'
	})

	Object.values(ROUTES).map(r => {
		const IR = r(CONTROLLERS, validator.validate, authentication)
		return router.use(IR.routes(), IR.allowedMethods())
	})

	return router
}
