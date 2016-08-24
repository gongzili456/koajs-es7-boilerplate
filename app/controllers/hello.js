export function getOne(ctx) {
	ctx.body = {
		name: 'Jack',
		age: 19,
	}
}

export function create(ctx) {
	console.log('body: ', ctx.request.body)
	ctx.body = ctx.request.body
}
