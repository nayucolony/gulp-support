var path = require('path');

module.exports = {
  entry: [
    "picturefill",
    "./src/js/main.js"
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: ['style-loader','css-loader']
      }
    ]
  }
}