## 1.配置开发环境
	--1.1 创建04-webpack-config的文件夹 ，
	--1.2 初始化项目 npm init,生成 package.json
	--1.3 安装webpack依赖
	npm install --save-dev webpack webpack-cli html-webpack-plugin clean-webpack-plugin
	或
	cnpm install --save-dev webpack webpack-cli html-webpack-plugin clean-webpack-plugin
	--1.4 创建文件，并填写代码
	src/index.js
```
console.log('webpack config js 文件运行了！');
	```
	config/webpack.config.js
```
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');


module.exports = {
	entry:{
		app:'./src/index.js'
	},
	output:{
		filename:'[name].bundle.js',
		path:path.resolve(__dirname,'../dist')
	},
	plugins:[
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title:'webpack-config',
			template:'./index.template.html'
		})
		
	]
}
	```
	
	--1.5 修改 package.json
```
"build":"webpack --config ./config/webpack.config.js"

	```
	
	--1.6 新创建了 index.template.html
```
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>webpack模板</title>
	</head>
	<body>
		>webpack模板
	</body>
</html>
	```
	--1.7 在cmd中运行  npm run  build, 查看结果
	
	
	
## 2.将以上操作，更改为 开发环境和生产环境在不同的配置文件中
	--2.1 安装插件
	npm install --save-dev webpack-merge uglifyjs-webpack-plugin
	
	--2.2 新创建 
	config/webpack.common.js
```
//生产环境和开发环境都使用的配置文件
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');


module.exports = {
	entry:{
		app:'./src/index.js'
	},
	output:{
		filename:'[name].bundle.js',
		path:path.resolve(__dirname,'../dist')
	},
	plugins:[
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title:'webpack-config',
			template:'./index.template.html'
		})
		
	]
}
	```
	
	config/webpack.dev.js
```
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
	```
	
	
	config/webpack.prod.js
```
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
	```
	
	将 config/webpack.config.js 删除
	
	--2.3 修改 package.json文件
```
"scripts": {
    "start": "webpack-dev-server --config ./config/webpack.dev.js --open",
    "build": "webpack --config ./config/webpack.prod.js"
  },
	```
	
	--2.4 cmd 执行 npm run start 
	 npm run build
	 查看结果