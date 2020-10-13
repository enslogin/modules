const path = require('path')

module.exports = {
  mode: 'production',
  entry: './lib/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: path.basename(__dirname) + '/60/js',
    library: 'enslogin-module-' + path.basename(__dirname),
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
  },
  resolve: {
    fallback: {
      crypto: 'crypto-browserify',
      stream: 'stream-browserify',
      http: 'stream-http',
      https: 'https-browserify',
      os: 'os-browserify'
    }
  }
}
