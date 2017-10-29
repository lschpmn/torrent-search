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
    rules: [
      {
        test: /\.css$/, 
        use: ['style-loader', 'css-loader'],
      },
      
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.eot$|\.woff2$|\.html/, 
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            },
          }
        ],
      },
      {
        test: /\.js$/, 
        use:[
          {
            loader: 'babel-loader',
            options: {
              presets: ['env', 'react']
            },
          }
        ], 
        exclude: /node_modules/,
      }
    ],
  },
  
  devServer: {
    inline: true,
    host: '0.0.0.0',
    port: 5000,
    historyApiFallback: true
  }
};