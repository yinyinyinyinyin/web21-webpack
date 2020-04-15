### 输出管理

##1. 创建02-webpack-output的文件夹

##2. 初始化项目，在cmd中输入
	npm init
	会在根目录下行成package.json的文件
	
##3.安装依赖
	npm install --save-dev webpack webpack-cli
	或
	cnpm install --save-dev webpack webpack-cli

##4. 创建src/index.js文件,创建 src/print.js
	

	--4.1创建src/index.js文件  ,
```
console.log('webpack-index  ');
//引入 print中的函数
import printMe from './print.js';
//创建一个按钮
var oBtn = document.createElement('button');
oBtn.innerHTML = '点击调用函数';
oBtn.onclick = printMe;
document.body.appendChild(oBtn);
	```
	--4.2 创建 src/print.js
```
console.log('print文件');

export default function printMe(){
	console.log('print中的函数');
}

	```
##5. 创建 webpack.config.js
```
const path = require("path");
module.exports = {
	//入口有两个以上文件，需要的配置
	entry:{
		index:'./src/index.js',
		print:'./src/print.js'
	},
	//出口
	output:{
		filename:'[name].bundle.js',
		path:path.resolve(__dirname,'dist')
	}
}
	```
	
##6. 配置 package.json
```
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
+	"start":"webpack --config webpack.config.js"
  },
```
##7.运行  npm start， 生成 dist文件夹  

##8. 在 dist文件夹中创建 index.html文件
```
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
	</head>
	<body>
		webpack    --- output
		<script type="text/javascript" src="index.bundle.js"></script>
		<script src="print.bundle.js"></script>
	</body>
</html>
```

##9. 在编辑器中运行 dist/index.html ,查看结果
	
	
##10. 如果	将print.js更改为 test.js ，然后打包，会发现两个问题，一个：dist/index.js 是手动生成的，所以里面的script
引入不会发生变化，另一个：在重新打包时，dist文件夹不会清空



##11.配置 dist/index.html文件，不再需要手动生成

	--11.1 安装插件
	npm install --save-dev html-webpack-plugin
	或
	cnpm install --save-dev html-webpack-plugin
	
	--11.2 修改 webpack.config.js
```
const path = require("path");
//引入修改index.html的插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
	//入口有两个以上文件，需要的配置
	entry:{
		index:'./src/index.js',
		test:'./src/test.js'
	},
	//出口
	output:{
		filename:'[name].bundle.js',
		path:path.resolve(__dirname,'dist')
	},
	//plugin配置
	plugins:[
		new HtmlWebpackPlugin({
			title:'output',
			template:'./index.template.html'
		})
	]
}
	```
	--11.3 创建模板文件 在根目录下创建 index.template.html
```
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>webpack</title>
	</head>
	<body>
		我是webpack模板
	</body>
</html>

	```
	--11.4 删除 dist文件夹，运行 npm start 命令,  会生成dist文件夹，而文件夹中默认就生成了index.html,不需要手动生成
	
##12.配置每次打包前，先清除 dist文件夹
	--12.1 安装插件
	npm install clean-webpack-plugin --save-dev
	或
	cnpm install clean-webpack-plugin --save-dev
	
	--12.2 修改webpack.config.js
```
const path = require("path");
//引入修改index.html的插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
//引入自动清除的插件
+ const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	//入口有两个以上文件，需要的配置
	entry:{
		index:'./src/index.js',
		test:'./src/test.js',
		yin:'./src/yyy.js'
	},
	//出口
	output:{
		filename:'[name].bundle.js',
		path:path.resolve(__dirname,'dist')
	},
	//plugin配置
	plugins:[
+		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title:'output',
			template:'./index.template.html'
		})
	]
}
	```
	
	--12.3 修改生成的js文件的名称 webpack.config.js 
将 12行的 yin:'./src/yyy.js'	 更改为
yinruifang:'./src/yyy.js'
	
	--12.4 在cmd窗口 运行 npm start ,
	看一下文件夹中的yin.bundle.js 和 yyy.bundle.js还存在么？
	 