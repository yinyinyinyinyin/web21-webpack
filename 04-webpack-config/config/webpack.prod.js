//生产环境的配置

const merge = require("webpack-merge");

const common = require("./webpack.common");

// 代码压缩
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common,{
	plugins:[
		new UglifyJSPlugin()
	]
})