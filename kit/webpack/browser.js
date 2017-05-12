const { resolve } = require('path')
const webpack = require('webpack')
console.log(__dirname)
const root = resolve(__dirname, '../../')
module.exports = {
  context: root,
  entry: [
    // 'react-hot-loader/patch',
    // activate HMR for React

    'webpack-dev-server/client?http://localhost:3002',
    // // bundle the client for webpack-dev-server
    // // and connect to the provided endpoint

    'webpack/hot/only-dev-server',
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates

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

  devtool: 'inline-source-map',

  devServer: {
    hot: true,
    // enable HMR on the server
    host: '0.0.0.0',
    port: 3002,

    contentBase: './public/dist',
    // match the output path

    publicPath: 'http://localhost:3002/'
    // match the output `publicPath`
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
        BROWSER: JSON.stringify(true)
      }
    }),
    new webpack.NamedModulesPlugin()
    // prints more readable module names in the browser console on HMR updates
  ]
}
