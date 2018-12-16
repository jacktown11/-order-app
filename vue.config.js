const path = require('path')
const express = require('express')

// mock code
const mockData = require('./mock/data.json')

function resolve (folder) {
  return path.join(__dirname, folder)
}  

module.exports = {
  /** 区分打包环境与开发环境
   * process.env.NODE_ENV==='production'  (打包环境)
   * process.env.NODE_ENV==='development' (开发环境)
   * baseUrl: process.env.NODE_ENV==='production'?"https://cdn.didabisai.com/front/":'front/',
   */
  // 基本路径
  baseUrl: '/',
  // 输出文件目录
  outputDir: 'dist',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  // webpack配置
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: () => { },
  configureWebpack: {
    resolve: {
      alias: {
        '@src': resolve('src'),
        '@comp': resolve('src/components'),
        '@common': resolve('src/common'),
      }
    }
   },
  //如果想要引入babel-polyfill可以这样写
  // configureWebpack: (config) => {
  //   config.entry = ["babel-polyfill", "./src/main.js"]
  // },

  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: true,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require('os').cpus().length > 1,
  // PWA 插件相关配置
  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {},
  // webpack-dev-server 相关配置
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: {
      '/outer': {
        target: 'http://localhost:8080/api/seller',
        pathRewrite: {
          '^/outer': '' // 这里一定要重写，不然会导致死递归
        }
      }
    },
    before: app => { 
      const apiRoutes = express.Router()
      const pathArr = ['/seller', '/goods', '/ratings']
      pathArr.forEach((urlPath) => {
        apiRoutes.get(urlPath, (req, res) => {
          console.log(urlPath)
          res.json({
            errNum: 0,
            data: mockData[urlPath.slice(1)]
          });
        });
      })

      app.use('/api', apiRoutes)
    }
  },
  // 第三方插件配置
  pluginOptions: {
    // ...
  }
}
