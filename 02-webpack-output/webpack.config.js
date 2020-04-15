const path = require("path");
//引入自动清除的插件--注意：下面这句与旧版本不一致了，多个个大括号
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
//引入修改index.html的插件
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
	//入口有两个以上文件，需要的配置
	entry:{
		index:'./src/index.js',
		test:'./src/test.js',
		yinruifang:'./src/yyy.js'
	},
	
	//plugin配置
	plugins:[
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title:'output',
			template:'./index.template.html'
		})
	],
	//出口
	output:{
		filename:'[name].bundle.js',
		path:path.resolve(__dirname,'dist')
	}
}

