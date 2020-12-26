/**
 * @param {object} [context] - 上下文对象【参考地址：https://zh.nuxtjs.org/api/context/】
 * @param {object} [context.req]      -【服务端】http的请求对象
 * @param {object} [context.redirect] -【客户端/服务端】重定向用户请求的路由
 * @param {object} [context.route]    -【客户端/服务端】vue路由
 * @param {objcet} [userAgent]        - 获取客户端的userAgent
 * @callback 判定是移动端还是设备端,如果是pc端重定向到/，如果是移动端重定向到/mobile.
 */
export default function({ req, redirect, route }) {
  // const userAgent = req ? req.headers['user-agent'] : navigator.userAgent || ''
  // const isMobile = (ua) => {
  //   return !!ua.match(/AppleWebKit.*Mobile.*/)
  // }
  // let query = ''
  // if (Object.keys(route.query).length) {
  //   query =
  //     '?' + Object.keys(route.query)[0] + '=' + Object.values(route.query)[0]
  // }
  // if (route.path === '/') {
  //   return isMobile(userAgent)
  //     ? redirect('/mobile' + query)
  //     : redirect('/pc' + query)
  // }
}
