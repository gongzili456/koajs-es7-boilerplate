import Debug from 'debug'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'

const cert = fs.readFileSync(path.join(__dirname, '../../cert/private'))
const debug = new Debug('app:controllers:signin:')

/**
* @api {get} /signin 登录
* @apiName 登录
* @apiDescription 基于微信网页授权获取用户信息，最终返回token，需在新微信客户端使用，或在微信web开发者工具中测试。
* @apiGroup Authorize
* @apiVersion 0.0.1
* @apiSampleRequest off
*
* @apiSuccessExample Success-Response:
* HTTP/1.1 200 ok
* {
*   data: 'xxxxxxxxxxxx'
* }
*/
export default function* () {
	debug('userinfo: ', this._wechat_userinfo)

	const token = jwt.sign(this._wechat_userinfo, cert, {
		algorithm: 'RS256',
		expiresIn: '7d',
	})

	this.body = {
		data: token,
	}
}
