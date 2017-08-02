import jwt from 'jsonwebtoken'
import httpErrors from 'http-errors'
import fs from 'fs'
import path from 'path'
import Debug from 'debug'

const debug = new Debug('app:lib:authorization:')

const cert = fs.readFileSync(path.join(__dirname, '../../cert/public.pub'))

const TOKEN_NAME = 'x-token'

function resolveAuthorizationHeader() {
  debug('headers -> ', this.headers)
  if (!this.headers || !this.headers[TOKEN_NAME]) {
    return null
  }

  const token = this.headers[TOKEN_NAME]
  debug('raw token -> ', token)

  const match = /^Authorization: Bearer (.*)$/i.exec(token)

  if (!match) {
    return null
  }

  return match[1]
}

function verify(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, cert, { algorithm: 'RS256' }, (err, decoded) => {
      debug('verify err: ', err, 'decoded: ', decoded)
      if (err) return reject(httpErrors(401, err.message))
      return resolve(decoded)
    })
  })
}

export default async (ctx, next) => {
  const token = resolveAuthorizationHeader.call(ctx)
  debug('token -> ', token)
  if (!token) {
    ctx.throw(401, 'Bad Authorization header format. Format is "Authorization: Bearer <token>"\n')
  }
  const decoded = await verify(token)

  ctx._tid = decoded

  await next()
}
