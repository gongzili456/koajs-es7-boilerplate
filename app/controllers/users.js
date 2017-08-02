export async function list(ctx) {
  ctx.body = [{
    name: 'Jack',
    age: 21,
  }, {
    name: 'Rose',
    age: 19,
  }, {
    name: 'Tom',
    age: 33,
  }]
}

export async function create(ctx) {
  ctx.body = ctx.request.body
}
