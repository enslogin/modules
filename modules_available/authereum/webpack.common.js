const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'production',
  entry: './lib/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: path.basename(__dirname) + '/60/js',
    library: 'enslogin-module-' + path.basename(__dirname),
    libraryTarget: 'umd'
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /js/i,
      })
    ]
  }
}
