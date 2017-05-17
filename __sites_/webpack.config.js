var webpack = require('webpack');

module.exports = {
  entry: [
      "webpack-dev-server/client?http://localhost:9000",
      'webpack/hot/only-dev-server',
      "./src/index"
    ],
  output: {
    path: __dirname + '/build',
    filename: "bundle.js",
    publicPath: '/build/',
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loaders: ["react-hot-loader/webpack",'babel-loader?presets[]=react,presets[]=es2015'],
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        loader: "style!css!less"
      }
    ]
  },
  plugins: [
      new webpack.NoErrorsPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ]
};
