var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');
var WriteFilePlugin = require('write-file-webpack-plugin');
var CompressionPlugin = require("compression-webpack-plugin");
var _ = require('lodash');
const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
var config = _.merge({}, commonConfig);
config.plugins = [];
config.entry = {
  'magic-form': helpers.src('ng2-magic-form', 'index')
};


module.exports = webpackMerge(config, {
  devtool: 'source-map',
  context: helpers.src('ng2-magic-form'),
  output: {
    path: helpers.dist(),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin('[name].[hash].css'),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    })
  ],
  devServer: {
    host: 'localhost',
    port: 3000,
    outputPath: helpers.dist(),
    // required for html5 router
    historyApiFallback: true,
    stats: 'minimal'
  }
});
