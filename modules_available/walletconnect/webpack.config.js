const common = require('./webpack.common.js');

module.exports = {
  ...common,
  resolve: {
    fallback: {
      assert: 'assert-polyfill',
      crypto: 'crypto-browserify',
      http: 'stream-http',
      https: 'https-browserify',
      os: 'os-browserify',
      stream: 'stream-browserify',
      url: 'url-polyfill'
    }
  }
}
