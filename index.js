require('babel-core/register')
// require('babel-polyfill')
const APP = require('./app')

const PORT = process.env.PORT || 8000

APP.listen(PORT, () => {
	console.log('APP Server started on port:', PORT)
})
