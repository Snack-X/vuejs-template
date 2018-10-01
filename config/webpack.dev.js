// current mode is defined as development, and is set to all context afterwards
process.env.NODE_ENV = 'development';

const merge = require('webpack-merge');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const base = require('./webpack.base.js');

// merge base config with development only config
module.exports = merge(base, {
  mode: 'development',
  // enable source map
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    // HTML file is read and used as a html template for output
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
  ],
});
