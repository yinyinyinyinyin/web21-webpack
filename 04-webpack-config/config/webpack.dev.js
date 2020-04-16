//开发环境的配置文件
//引入 common   
const common = require("./webpack.common");
const merge = require("webpack-merge");//合并


module.exports = merge(common,{
	devtool:'inline-source-map',
	devServer:{
		contentBase:'./dist'
	}
})