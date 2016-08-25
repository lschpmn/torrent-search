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
      {test: /\.css$/, loader: 'style!css'},
      {test: /\.scss$/, loader: `style!css!sass`},
      {test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.eot$|\.woff2$|\.html/, loader: 'file?name=/[name].[ext]'}
    ]
  },
  
  devServer: {
    inline: true,
    host: '0.0.0.0',
    port: 5000,
    historyApiFallback: true
  }
};