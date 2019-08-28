const path = require('path')

module.exports = {
  mode: 'production',
  entry: './lib/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'enslogin-module-metamask.js',
    library: 'enslogin-module-metamask',
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
