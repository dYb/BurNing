const { resolve } = require('path')
const webpack = require('webpack')
const nodeModules = require('webpack-node-externals')
console.log(__dirname)
const root = resolve(__dirname, '../../')
module.exports = {
  context: root,
  entry: '',
  output: {
    filename: 'bundle.js',
    // the output bundle

    path: resolve(root, './public/dist'),

    publicPath: 'http://localhost:3002/'
    // necessary for HMR to know where to load the hot update chunks
  },

  devtool: 'inline-source-map',

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
  target: 'node',
  resolve: {
    modules: ['node_modules', '.'],
    extensions: ['.js', '.jsx', '.css', '.json']
  },
  plugins: [
    new webpack.DefinePlugin({
      SERVER: false
    })
  ],
  externals: nodeModules()
}
