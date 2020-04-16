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
	
## 3.配置开发环境或者生产环境mode
	-- 修改 config/webpack.config.js
```
mode:'development',//开发环境 ，代码再打包后不会压缩

	```
```
		mode:'production',//生产环境 ，代码打包后会压缩，默认项production
	```

## 4. 每次修改代码后，需要手动执行npm run build ，比较麻烦，优化！watch插件
## webpack-dev-server 热启动  ，自动执行打包命令，自动打开默认浏览器，自动刷新页面，（全页面刷新）
	--4.1 安装插件
	npm install --save-dev webpack-dev-server
	或
	cnpm install --save-dev webpack-dev-server
	
	--4.2 配置config/webpack.config.js
```
+	devServer:{//配置自动刷新页面
+		contentBase:'./dist'
+	},
	plugins:[
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title:'webpack dev',
			template:'./index.template.html'
		})
	]
	```
	
	--4.3 修改package.json文件
```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --config ./config/webpack.config.js",
+	"dev":"webpack-dev-server --config ./config/webpack.config.js --open"
  },
	```
	
	--4.4 在 cmd上运行 npm run dev
	
	--4.5 我们如果修改了代码，自动执行打包命令，自动打开默认浏览器，自动刷新页面，（全页面刷新）
	
	--4.6 不足：页面是整个刷新的，性能上会查一下，局部热更新，需要使用模块热替换
	
	
## 5.模块热替换
	--5.1 修改config/webpack.config.js
```
const path = require("path");
//引入html插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
+ const webpack = require('webpack');

module.exports = {
	//mode:'development',//开发环境
	mode:'production',//生产环境
	entry:{
+		app:'./src/index.js'
	},
	output:{
		filename:'[name].bundle.js',
		path:path.resolve(__dirname,'../dist')
	},
	devtool:'cheap-module-eval-source-map',//可以定位到错误的源文件的位置  inline-source-map
	//cheap-module-eval-source-map 优势比inline-source-map速度快
	devServer:{//配置自动刷新页面
		contentBase:'./dist',
+		hot:true // 启动模块热更新
	},
	plugins:[
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title:'webpack dev',
			template:'./index.template.html'
		}),
+		new webpack.HotModuleReplacementPlugin()//添加了热更新的插件
	]
}
	```
	
	--5.2 修改 src/index.js
```
if(module.hot){
	console.log('支持模块热更新');
}
	```
	--5.3 cmd上运行 npm run dev,查看结果  ，热更新的console内容已经打印
	
## 6.按钮热更新的实例
	--6.1 添加了 src/print.js
```
module.exports = {
	func:function(){
		console.log('print 模块，666,777');
	}
}
	```
	--6.2 更改 src/index.js
```
//引入print模块
+ import p from './print';
console.log('我是index文件');
var oBtn=document.createElement('button');
oBtn.innerHTML = "点击修改内容";
document.body.appendChild(oBtn);
console.error('I get called from print.js!');

console.log('测试浏览器是否自动刷新了');

console.log('今天天气很好啊!');

+if(module.hot){
+	console.log('支持模块热更新');
+	module.hot.accept('./print.js',function(){
+		console.log('print模块更新了');
+		oBtn.onclick = p.func;
+	})
+}

	```
	--6.3 运行 npm run dev,查看结果
	
	--6.4 修改 src/print.js ，查看 浏览器的打印结果，是否会显示  “console.log('print模块更新了');”
	点击 按钮是会输出：  console.log('print 模块，666,777');
	而且在热更新的时候，不会整页刷新
	
	
	
	 