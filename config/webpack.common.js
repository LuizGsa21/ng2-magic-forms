var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
	entry: {
		'vendor': helpers.src('playground', 'vendor.ts'),
		'main': helpers.src('playground', 'main.ts'),
		'polyfills': helpers.src('playground', 'polyfills.ts')
	},
	
	resolve: {
		extensions: ['', '.js', '.ts']
	},
	
	module: {
		loaders: [
			{
				test: /\.json$/,
				loader: 'json'
			},
			{
				test: /\.ts$/,
				loader: 'ts'
			},
			{
				test: /\.html$/,
				loader: 'html'
			},
			{
				test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
				loader: 'file?name=assets/[name].[hash].[ext]'
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				loader: 'raw-loader!sass-loader'
			}
		]
	},

	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: [
				'vendor',
				'polyfills'
			]
		}),
		new HtmlWebpackPlugin({
			template: helpers.src('playground', 'index.html')
		})
	]
};
