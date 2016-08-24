import Router from 'koa-router'
import Joi from 'joi'
import convert from 'koa-convert'

export default function(controllers, validate) {
	const router = new Router({
		prefix: '/hello',
	})

	router.get('/', controllers.hello.getOne)

	router.post('/', convert(validate({
		email: Joi.string().email(),
		age: Joi.number().required(),
	})), controllers.hello.create)

	return router
}
