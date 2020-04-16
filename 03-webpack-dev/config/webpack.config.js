const path = require("path");
//引入html插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	//mode:'development',//开发环境
	mode:'production',//生产环境
	entry:{
		app:'./src/index.js'
	},
	output:{
		filename:'[name].bundle.js',
		path:path.resolve(__dirname,'../dist')
	},
	devtool:'cheap-module-eval-source-map',//可以定位到错误的源文件的位置  inline-source-map
	//cheap-module-eval-source-map 优势比inline-source-map速度快
	devServer:{//配置自动刷新页面
		contentBase:'./dist',
		hot:true // 启动模块热更新
	},
	plugins:[
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title:'webpack dev',
			template:'./index.template.html'
		}),
		new webpack.HotModuleReplacementPlugin()//添加了热更新的插件
	]
}