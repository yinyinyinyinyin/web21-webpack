const path=require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
module.exports = {
	entry:{
		index:'./src/index.js'
	},
	plugins:[
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title:'webpack catch',
			template:'./index.template.html'
		})
	],
	optimization:{//代码分离
		splitChunks:{
			"chunks":"all"
		}
	},
	output:{
		filename:'[name].[chunkhash].js',
		path:path.resolve(__dirname,'dist')
	}
}