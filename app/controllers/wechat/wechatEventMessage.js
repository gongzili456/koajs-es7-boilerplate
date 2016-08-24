import Debug from 'debug'

const debug = new Debug('app:controllers:wechatEventMessage:')

function eventsHandling(msg) {
	switch (msg.Event) {
	case 'subscribe':
			// TODO insert user info into db or update is_subscribe status true
		break
	case 'unsubscribe':
			// TODO update is_subscribe status false
		break
	default:
	}
}

function messageHandling(msg) {
	// TODO somtings
}

/**
* Wechat Event & Message Handling
*/
export default function* () {
	const message = this.weixin

	debug('message: ', message)

	if (message.MsgType === 'event') {
		eventsHandling(message)
	} else {
		messageHandling(message)
	}

	this.body = ''
}
