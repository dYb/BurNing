const { resolve } = require('path')
const webpack = require('webpack')
const nodeModules = require('webpack-node-externals')
console.log(__dirname)
const root = resolve(__dirname, '../../')
module.exports = {
  context: root,
  entry: 'server/app.js',
  output: {
    filename: 'server.js',
    // the output bundle
    path: resolve(root, 'dist')
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
  node: {
    __dirname: true
  },
  resolve: {
    modules: ['.', 'src', 'node_modules'],
    extensions: ['.js', '.jsx', '.css', '.json']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        BROWSER: JSON.stringify(false),
        NODE_ENV: JSON.stringify('production')
      }
    })
  ],
  externals: nodeModules({
    whitelist: /redux\//
  })
}
