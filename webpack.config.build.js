var webpack = require('webpack');

module.exports = {
  entry: "./src/react-core-image-upload",
  output: {
    path: __dirname + '/',
    filename: "react-core-image-upload.js",
    libraryTarget: 'umd',
  },
  externals: {
    "react":"react",
    "react-dom":'react-dom',
    'prop-types': 'prop-types'
  },

  module: {
    loaders: [
      {
        test: /\.js?$/,
        loaders: ['babel-loader?presets[]=react,presets[]=es2015'],
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
