//生产环境和开发环境都使用的配置文件
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
	entry:{
		index:'./src/index.js'
	},
	plugins:[
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title:'webpack-config',
			template:'./index.template.html'
		})
	],
	output:{
		filename:'[name].bundle.js',
		chunkFilename: '[name].bundle.js',
		path:path.resolve(__dirname,'../dist')
	},
}