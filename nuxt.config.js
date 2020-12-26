/**
 * 导入环境变量
 */
import env from './env'
export default {
  /**
   * @module [serve] - Nuxt.js的server端ip和端口
   * @param  [host]  - ip【默认localhost】
   * @param  [port]  - 端口【默认3000】
   */
  server: {
    host: '0.0.0.0',
    port: 3001
  },
  /*
   ** @module [mode]               - 使用此更改nuxt.config.js中的nuxt模式
   ** @param  {string} [spa]       - 没有服务器端渲染（只有客户端路由/导航等）
   ** @param  {string} [universal] - 同构应用程序（服务器端呈现+客户端路由导航等）
   */
  mode: 'universal',
  /**
   * @module [head]            - Nuxt.js的头部模块【公共头部】
   * @param  {string} [title]  - 浏览器选项卡标题/页面标题
   * @param  {array}  [meta]   - meta配置参数
   * @param  [maximum-scale]   - 为允许用户的最大缩放值【yes(默认)代表允许，no(0)代表不允许】与user-scalable两者结合使用可以阻止页面被放大（经测试，少一项都达不到效果）
   * @param  [user-scalable]   - 为是否允许用户进行缩放【yes(默认)代表允许，no(0)代表不允许】与maximum-scale两者结合使用可以阻止页面被放大（经测试，少一项都达不到效果）
   * @param  {string} [link]   - 选项卡/页面图标
   * @param  {array}  [script] - Global site tag (gtag.js) - Google Analytics
   * Environment variables
   */
  head: {
    title: '' || process.env.npm_package_name,
    meta: [
      { charset: 'utf-8' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'format-detection', content: 'telephone=yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'white' },
      { name: 'x5-fullscreen', content: 'true' },
      { name: 'apple-touch-fullscreen', content: 'yes' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /**
   * @module [loading] - Nuxt.js的loading模块(自定义进度条颜色)
   */
  loading: { color: '#fff' },
  /**
   * @module   [router]     - Nuxt.js的路由模块
   * @requires [redirect]   - 验证是pc还是mobile端，重定向跳转不同的路由
   * @requires [pcOrMobile] - 验证是pc还是mobile端，并注入到上下文中
   */
  router: {
    middleware: ['redirect']
  },
  /**
   * @module  [css]    - nuxt.js的全局css样式模块
   * @param   [resset] - 重置样式
   */
  css: ['~assets/style/reset.scss'],
  /**
   * @module  [modules] - Nuxt.js的modules模块
   * @require [axios]   - 请求方式，参考文档【https://axios.nuxtjs.org/usage】
   * @require [proxy]   - proxy代理
   */
  modules: ['@nuxtjs/proxy'],
  /**
   * @module [@nuxtjs/proxy] - Nuxt.js的代理模块【主要用来解决跨域】
   */
  proxy: [
    [
      '/api',
      {
        target: env[process.env.NODE_ENV].ENV_API,
        pathRewrite: { '^/api': '/api' }
      }
    ]
  ],
  /**
   * @module            [build]                - Nuxt.js的build模块
   * @param  {array}    [transpile]            - nuxt提供的transpile配置【当前用以解决vant的按需引入】
   * @param  {object}   [babel]                - nuxt提供的babel配置    【当前用以解决vant的按需引入】
   * @param  {object}   [loaders]              - nuxt提供的loaders配置  【当前用以解决vant的按需引入】
   * @param  {object}   [styleResources]       - 全局注入样式变量和mixin【不能使用别名(~和@)】
   * @param  {function} [extend]               - 可以在此处扩展webpack配置
   * @param  {object}   [config.resolve.alias] - 显示所有别名以及指向的路径
   * @param  {boolean}  [ctx.isDev]            - 是否是开发环境
   */
  build: {
    babel: {
      plugins: [
        ['component', { libraryName: 'element-ui', styleLibraryName: '~theme' }]
      ]
    },
    // 为防止重复打包
    vendor: ['axios']
  }
}
