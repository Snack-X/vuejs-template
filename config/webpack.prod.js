// current mode is defined as production, and is set to all context afterwards
process.env.NODE_ENV = 'production';

const merge = require('webpack-merge');
const base = require('./webpack.base.js');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

// merge base config with production only config
module.exports = merge(base, {
  mode: 'production',
  optimization: {
    minimizer: [
      // compress CSS output
      new OptimizeCSSAssetsPlugin(),
    ],
    // big chunks, like vue and vue-router, are splitted as a separate file
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    // HTML file is read and used as a HTML template for output
    // output html file is minified
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
    // extract all CSS from JS code as a separate file, and its hash is apppended
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:7].css',
      chunkFilename: '[id].[contenthash:7].css',
    }),
    // compress JS output
    new MinifyPlugin(),
  ],
});
