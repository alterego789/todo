const path = require('path');

// import path from 'path';
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { ImportFallback } = require('./webpack/plugins.js');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProd = process.env.NODE_ENV === "production";

const out = path.resolve(__dirname, 'public');
const defaultName = isProd ? '[name]-[chunkhash]' : '[name]-[hash]';

// TODO: get rid of webpack
module.exports = {
	mode: isProd ? 'production' : 'development',
	entry: {
		main: './js/main.tsx'
	},

	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.json', '.wasm', '...'],
		symlinks: false,
		plugins: [
			new ImportFallback
		],
	},
	devServer: {
		// see: https://localhost:8080/webpack-dev-server
		historyApiFallback: true,
		https: true,
		proxy: {
			'/api/**': {
				target: 'http://localhost:8081/'
			}
		}
	},

	output: {
		filename: 'static/js/' + defaultName + '.js',
		chunkFilename: 'static/js/' + defaultName + '.js',
		path: out,
		publicPath: '/'
	},

	// @ts-ignore
	plugins: [
		new HTMLWebpackPlugin({
			template: './index.html',
			filename: './index.html'
		}),
		new MiniCssExtractPlugin()
	],
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				// use: 'ts-loader',
				use: [{
					loader: 'ts-loader',
					options: { allowTsInNodeModules: true }
				}]
				// exclude: /node_modules/,
			},

			{
				test: /\.css$/i,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader"
				],
			},
			{
				test: /\.(png|jp(e*)g|svg)$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 8000, // Convert images < 8kb to base64 strings
						name: 'static/img/[name]-[hash:4].[ext]',
						fallback: (isProd ? 'responsive-loader' : '')
					}
				}]
			},
		]
	},
	optimization: {
		//runtimeChunk: true,
		splitChunks: {
			chunks: 'all',
			minSize: 30000,
			maxSize: 90000,
			minChunks: 1,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			automaticNameDelimiter: '~',
			cacheGroups: {
				react: {
					test: /[\\/](react|fbjs)/,
					chunks: 'all',
					name: 'react',
					enforce: true
				},
				// node_modules: {
				// 	test: /[\\/]node_modules[\\/]/,
				// 	// cacheGroupKey here is `node_modules` as the key of the cacheGroup
				// 	name(module, chunks, cacheGroupKey) {
				// 		const name = module.identifier().split('node_modules').pop().split('\\').slice(1, 3).join('~');
				// 		return name;
				// 	},
				// 	chunks: 'all',
				// 	enforce: true
				// },
				node_modules: {
					test: /node_modules/,
					name: "node_modules",
					chunks: 'all',
					enforce: true
				},
			}
		}
	},
};
