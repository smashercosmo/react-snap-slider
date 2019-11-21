const { WebpackPluginServe: Serve } = require('webpack-plugin-serve')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const { DIST_DIR } = require('./constants')
const base = require('./webpack.base.config')

module.exports = {
  ...base({ optimize: false }),
  plugins: [
    new HtmlWebpackPlugin({
      template: 'example/index.html',
    }),
    new Serve({
      port: 8000,
      host: 'localhost',
      static: [DIST_DIR],
    }),
  ],
  watch: true,
}
