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
	}
}