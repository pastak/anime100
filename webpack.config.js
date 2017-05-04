const path = require('path')

const isProductionBuild = process.env.NODE_ENV === 'production'

module.exports = {
  devtool: isProductionBuild ? false : 'inline-source-map',
  entry: {
    main: ['babel-register', './src/main.js']
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      }
    ]
  }
}
