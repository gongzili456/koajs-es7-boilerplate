import Joi from 'joi'
import boom from 'boom'

export default (schema) =>
	(ctx, next) => {
		Joi.validate(ctx.request.body, schema, (err, value) => {
			console.log('err: ', err)
			console.log('value: ', value)
			if (err) {
				return ctx.body = boom.create(400, err.details[0].message)
			}
			return next()
		})
	}
