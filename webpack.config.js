'use strict';

const path = require('path');

module.exports = {
  context: path.join(__dirname, 'client'),
  
  entry: './index.js',
  
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'require.js'
  },
  
  module: {
    loaders: [
      {test: /\.css$/, loader: 'style-loader!css-loader'},
      {test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.eot$|\.woff2$|\.html/, loader: 'file-loader?name=/[name].[ext]'},
      {test: /\.js$/, loader:'babel-loader?presets[]=react,presets[]=es2015', exclude: /node_modules/}
    ]
  },
  
  devServer: {
    inline: true,
    host: '0.0.0.0',
    port: 5000,
    historyApiFallback: true
  }
};