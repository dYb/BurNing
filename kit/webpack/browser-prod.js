const { resolve } = require('path')
const webpack = require('webpack')
console.log(__dirname)
const root = resolve(__dirname, '../../')
module.exports = {
  context: root,
  entry: [
    './public/browser.js'
    // the entry point of our app
  ],
  output: {
    filename: 'bundle.js',
    // the output bundle

    path: resolve(root, './public/dist'),

    publicPath: 'http://localhost:3002/'
    // necessary for HMR to know where to load the hot update chunks
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  target: 'web',
  resolve: {
    modules: ['node_modules', '.'],
    extensions: ['.js', '.jsx', '.css', '.json']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally
    new webpack.DefinePlugin({
      'process.env': {
        BROWSER: JSON.stringify(true),
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.NamedModulesPlugin()
    // prints more readable module names in the browser console on HMR updates
  ]
}
