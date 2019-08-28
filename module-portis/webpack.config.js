const path = require('path')

module.exports = {
  mode: 'production',
  entry: './lib/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'enslogin-module-portis.js',
    library: 'enslogin-module-portis',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        // include: [ path.resolve(__dirname, "dist") ]
        // exclude: [ path.resolve(__dirname, "node_modules") ],
        loader: 'babel-loader'
      }
    ]
  }
}
