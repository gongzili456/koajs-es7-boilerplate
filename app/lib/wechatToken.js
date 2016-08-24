import wechatAcceccToken from 'wechat-access-token'
import config from 'config'

export default function() {
	return new Promise((resolve, reject) => {
		wechatAcceccToken(config.wechat.appid, config.wechat.appsecret, (err, t) => {
			if (err) return reject(err)
			return resolve(t.access_token)
		})
	})
}
