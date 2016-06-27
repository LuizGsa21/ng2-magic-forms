var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');
var WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = webpackMerge(commonConfig, {
	devtool: 'source-map',
  context: helpers.src(),
	output: {
		path: helpers.build(),
		publicPath: '/',
		filename: '[name].js',
		chunkFilename: '[id].chunk.js'
	},
	plugins: [
    // required to force web-dev-server to save files to disk,
    // new WriteFilePlugin(),
		new OpenBrowserPlugin({ url: 'http://localhost:3000' }),
		new webpack.ProvidePlugin({
			// $: "jquery",
			// jQuery: "jquery",
			// _: "lodash"
		}),
		new ExtractTextPlugin('[name].css')
	],
	devServer: {
    host: 'localhost',
    port: 3000,
    outputPath: helpers.build(),
    // required for html5 router
    historyApiFallback: true,
		stats: 'minimal'
	}
});
