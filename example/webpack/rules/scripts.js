module.exports = ({ optimize }) => {
  return [
    {
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-modules'],
              ['@babel/preset-react', { development: !optimize }],
              ['@babel/preset-typescript'],
            ],
          },
        },
      ],
    },
  ]
}
