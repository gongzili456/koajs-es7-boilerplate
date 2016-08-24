import jwt from 'jsonwebtoken'
import httpErrors from 'http-errors'
import fs from 'fs'
import path from 'path'
import Debug from 'debug'

const debug = new Debug('app:lib:authorization:')

const cert = fs.readFileSync(path.join(__dirname, '../../cert/public.pub'))

function resolveAuthorizationHeader() {
	if (!this.header || !this.header.authorization) {
		return null
	}
	const parts = this.header.authorization.split(' ')
	if (parts.length === 2 && /^Bearer$/i.test(parts[0])) {
		return parts[1]
	}
	return null
}

function verify(token) {
	return new Promise((resolve, reject) => {
		jwt.verify(token, cert, { algorithm: 'RS256' }, (err, decoded) => {
			debug('verify err: ', err, 'decoded: ', decoded)
			if (err) return reject(httpErrors(401, err.message))
			return	resolve(decoded)
		})
	})
}

export default async (ctx, next) => {
	const token = resolveAuthorizationHeader.call(ctx)
	if (!token) {
		ctx.throw(401, 'Bad Authorization header format. Format is "Authorization: Bearer <token>"\n')
	}
	const decoded = await verify(token)

	ctx.state.user = decoded
	next()
}
