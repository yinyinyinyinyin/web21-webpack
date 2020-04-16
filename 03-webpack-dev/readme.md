## 1.配置开发环境
	--1.1 创建03-webpack-dev的文件夹 ，
	--1.2 初始化项目 npm init,生成 package.json
	--1.3 安装webpack依赖
	npm install --save-dev webpack webpack-cli
	npm install --save-dev html-webpack-plugin clean-webpack-plugin
	或
	cnpm install --save-dev webpack webpack-cli
	cnpm install --save-dev html-webpack-plugin clean-webpack-plugin
	--1.4 创建项目目录
	src/index.js
```
console.log('hello webpack dev');

	```
	index.template.html
```
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>webpack-开发环境设置</title>
	</head>
	<body>
		webpack-开发环境设置
	</body>
</html>

	```
	config/webpack.config.js
```
const path = require("path");{
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
	plugins:[
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title:'webpack dev',
			template:'./index.template.html'
		})
	]
}
	```
	--1.5配置package.json
```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
+	"build":"webpack --config ./config/webpack.config.js"
  },
	```
	--1.6 cmd 下运行 npm run build
	
	--1.7 在编辑器上运行 dist/index.html ,查看结果
	
	
	--1.8 修改了 src/index.js 
```

console.log('我是index文件');
var oBtn=document.createElement('button');
oBtn.innerHTML = "点击修改内容";
document.body.appendChild(oBtn);
cosnole.error('I get called from print.js!');//这句是会报错的
	```
	--1.9 运行 npm run build ，打包后运行dist/index.html ，发现报错，定位的位置是打包后的位置，不好定位源文件的那句话出错了
	 
	 
## 2.以上问题解决办法是： 使用  devtools
	--2.1 修改 config/webpack.config.js
```
+   devtool:'inline-source-map',//可以在开发环境下定位到错误的源文件的位置
	plugins:[
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title:'webpack dev',
			template:'./index.template.html'
		})
	]
	```
	--2.2 cmd上运行  npm run build ，查看结果
	
	 