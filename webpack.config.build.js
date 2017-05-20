var webpack = require('webpack');

module.exports = {
  entry: "./src/react-core-image-upload",
  output: {
    path: __dirname + '/',
    filename: "react-core-image-upload.js",
  },
  externals: {
    "react":"React",
    "react-dom":'ReactDOM'
  },

  module: {
    loaders: [
      {
        test: /\.js?$/,
        loaders: ["react-hot-loader/webpack",'babel-loader?presets[]=react,presets[]=es2015'],
        exclude: /node_modules/
      },

      {
        test: /\.ope/,
        loader: "style!css"
      }
        ]
  },
  plugins: [
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.UglifyJsPlugin( {
        minimize : true,
        sourceMap : false,
        mangle: true,
        compress: {
          warnings: false
        }
      } )
    ]
};
