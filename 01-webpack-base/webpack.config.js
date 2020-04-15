//引入path路径
const path = require('path');
//模块输出
module.exports = {
	//入口地址
	entry:'./src/index.js',
	//出口地址
	output:{
		filename:'bundle.js',//打包后的js的文件名
		path:path.resolve(__dirname,'dist')
	},
	//配置解析css文件
	module:{
		rules:[
			{
				test:/\.css/,//匹配所有的css扩展名的文件
				use:['style-loader','css-loader']//使用的插件
			}
		]
	}
}