const common = require('./webpack.common.js');

module.exports = {
  ...common,
  resolve: {
    fallback: {
      assert: 'assert-polyfill',
      stream: 'stream-browserify',
      url: 'url-polyfill'
    }
  }
}
