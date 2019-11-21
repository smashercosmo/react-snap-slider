const MiniCssExtractPlugin = require('mini-css-extract-plugin')

/**
 * @param {Object} options
 * @param {Boolean} options.optimize
 * @param {Boolean} modules
 */
module.exports = ({ optimize }, modules) => {
  const modulesOptions = modules
    ? {
        localIdentName: optimize
          ? '[name]_[local]_[hash:base64:5]'
          : '[name]_[local]',
      }
    : false

  return [
    {
      test: /\.css$/,
      exclude: /node_modules/,
      use: [
        optimize ? MiniCssExtractPlugin.loader : { loader: 'style-loader' },
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            modules: modulesOptions,
          },
        },
      ],
    },
  ]
}
