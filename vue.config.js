const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin(); // 打包速度分析
const webpack = require('webpack')

const moduleConfig = {
  devServer: {
    port: "8088",
    proxy: {
      // GitHub认证跨域 代理这个请求地址
      '/githubAuthorize': {
        target: 'https://github.com/login/oauth/authorize',
        changeOrigin: true,
        pathRewrite: {
          '^/githubAuthorize': ''
        }
      },
      // GitHub请求token的请求
      '/githubAccessToken': {
        target: 'https://github.com/login/oauth/access_token',
        changeOrigin: true,
        pathRewrite: {
          '^/githubAccessToken': ''
        }
      },
      // GitHub请求token的请求
      '/githubUserInfo': {
        target: 'https://api.github.com/user',
        changeOrigin: true,
        pathRewrite: {
          '^/githubUserInfo': ''
        }
      }
    }
  },
  publicPath: '/',
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      return smp.wrap({
        plugins: [
          new BundleAnalyzerPlugin(), // 打包分析
          new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
        ]
      })
    }
  },
}
module.exports = moduleConfig
