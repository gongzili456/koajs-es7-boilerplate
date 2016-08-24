import wxOauth from 'wx-oauth'
import Router from 'koa-router'
import config from 'config'
import convert from 'koa-convert'

export default (controllers) => {
	const router = new Router()

	router.get('/signin', convert(wxOauth(config.wechat, controllers.signin)))

	return router
}
