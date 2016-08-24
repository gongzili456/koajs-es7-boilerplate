import Router from 'koa-router'
import wechat from 'co-wechat'
import convert from 'koa-convert'
import config from 'config'

export default function(controllers, validate) {
	const router = new Router({
		prefix: '/wechat',
	})

	// router.all('/events', convert(wechat(config.wechat.token)
	// .middleware(controllers.wechat.wechatEventMessage)))

	/**
	* payment in here.
	*/

	return router
}
