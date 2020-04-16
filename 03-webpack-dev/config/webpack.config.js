const path = require("path");
//引入html插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
	entry:{
		index:'./src/index.js'
	},
	output:{
		filename:'[name].bundle.js',
		path:path.resolve(__dirname,'../dist')
	},
	devtool:'cheap-module-eval-source-map',//可以定位到错误的源文件的位置  inline-source-map
	//cheap-module-eval-source-map 优势比inline-source-map速度快
	plugins:[
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title:'webpack dev',
			template:'./index.template.html'
		})
	]
}