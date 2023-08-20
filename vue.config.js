const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 3001
  },
  configureWebpack: {
    plugins: [
      // fix "process is not defined" error
      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
    ],
    resolve: {
      fallback: {
        path: require.resolve('path-browserify'),
        os: false,
        fs: false
      }
    }
  }
})
