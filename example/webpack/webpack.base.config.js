const scripts = require('./rules/scripts')
const styles = require('./rules/styles')
const { DIST_DIR, ENTRY } = require('./constants')

/**
 * @param {Object} options
 * @param {Boolean} options.optimize
 */
module.exports = options => {
  const { optimize } = options

  return {
    entry: optimize ? [ENTRY] : [ENTRY, 'webpack-plugin-serve/client'],
    mode: optimize ? 'production' : 'development',
    output: {
      path: DIST_DIR,
      filename: optimize ? '[name].[contenthash].js' : '[name].js',
      publicPath: '/',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    devtool: optimize ? 'source-map' : 'cheap-module-source-map',
    module: {
      rules: [...scripts(options), ...styles(options, false)],
    },
  }
}
