const common = require('./webpack.common.js');

module.exports = {
  ...common,
  resolve: {
    fallback: {
      crypto: 'crypto-browserify',
      stream: 'stream-browserify'
    }
  }
}
