const common = require('./webpack.common.js');

module.exports = {
  ...common,
  resolve: {
    fallback: {
      stream: 'stream-browserify'
    }
  }
}
