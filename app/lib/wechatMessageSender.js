import WechatApi from 'wechat-api'
import config from 'config'
import Debug from 'debug'

const debug = new Debug('app:lib:wechatMessageSender:')

const api = new WechatApi(config.wechat.appid, config.wechat.appsecret)

export default (openid, text) => {
	api.sendText(openid, text, (err, data) => {
		debug('err: ', err, 'data: ', data)
	})
}
