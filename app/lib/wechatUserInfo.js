import Debug from 'debug'
import wechatToken from './wechatToken'
import request from 'co-request'

const debug = new Debug('app:lib:wechatUserInfo:')

export default async (openid) => {
	const token = await wechatToken()

	const info = await request.get(`https://api.weixin.qq.com/cgi-bin/user/info?access_token=${token}&openid=${openid}&lang=zh_CN`)

	debug('info: ', info)

	if (!info.errcode) {
		throw new Error('WechatAPIError')
	}

	return info
}
