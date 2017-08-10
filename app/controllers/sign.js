import jwt from 'jsonwebtoken'
import config from 'config'
import fs from 'fs'
import path from 'path'

const cert = fs.readFileSync(path.join(__dirname, '../../cert/private'))

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
export async function wechatSign(ctx) {
  const token = jwt.sign({}, cert, config.jsonwebtoken)
  ctx.body = {
    message: 'success',
    data: `Authorization: Bearer ${token}`,
  }
}

/**
* Simple json web token
*/
export async function jsonwebtoken(ctx) {
  const token = jwt.sign({}, cert, config.jsonwebtoken)
  ctx.body = {
    message: 'success',
    data: `Authorization: Bearer ${token}`,
  }
}
