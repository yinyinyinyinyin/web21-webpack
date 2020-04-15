##1. webpack概念
本质上,webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时,它会递归地构建
一个依赖关系图(dependency graph),其中包含应用程序需要的每个模块,然后将所有这些模块打包成一个或多个 bundle。
webpack 就像一条生产线,要经过一系列处理流程后才能将源文件转换成输出结果。 这条生产线上的每个处理流程的职责都是单一的,
多个流程之间有存在依赖关系,只有完成当前处理后才能交给下一个流程去处理。 插件就像是一个插入到生产线中的一个功能,
在特定的时机对生产线上的资源做处理。
webpack 通过 Tapable 来组织这条复杂的生产线。 webpack 在运行过程中会广播事件,插件只需要监听它所关心的事件,
就能加入到这条生产线中,去改变生产线的运作。 webpack 的事件流机制保证了插件的有序性,使得整个系统扩展性很好。 

	-- 安装依赖时--save  和--save-dev的区别：
	--save：这样子安装的依赖在开发环境和生产环境中都需要
	--save-dev: 这样子安装的依赖只在开发环境中起作用

##2. webpack和grunt gulp的区别：
	--1.gulp/grunt是一种能够优化前端的开发的流程的工具，而webpack是一种模块化的解决方案，
	不过webpack的优点是在很多场景下可以代替gulp或grunt类的工具。
	--2.工作方式也有较大区别：
　　Grunt和Gulp的工作方式是：在一个配置文件中，指明对某些文件进行类似编译，组合，压缩等任务的具体步骤，
	工具之后可以自动替你完成这些任务。
　　Webpack的工作方式是：把你的项目当做一个整体，通过一个给定的主文件（如：index.js），
	Webpack将从这个文件开始找到你的项目的所有依赖文件，使用loaders处理它们，最后打包为一个（或多个）
	浏览器可识别的JavaScript文件。
	
##3. webpack官方文档的地址  [](https://www.webpackjs.com)

##4. webpack的安装

本地安装：推荐使用 npm install --save-dev webpack webpack-cli
全局安装：不推荐使用，全局安装后，所有的项目使用的都是一个webpack的版本


##5. 起步
	--5.1 创建项目，并且初始化项目
	在项目中创建了文件夹 01-webpack-base,然后再文件夹上右键，选择“使用命令行窗口打开所在目录”
	在打开的cmd窗口中输入   npm init   (初始化项目，一路按enter就可以创建成功了！)
	初始化项目后，在根目录下生成  package.json的文件
	
	--5.2 安装 webpack的依赖
	npm install --save-dev webpack webpack-cli
	或
	cnpm install --save-dev webpack webpack-cli
	--5.3创建相应的文件
	根目录下创建 index.html
```
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<script src="./dist/main.js"></script>
	</head>
	<body>
		webpack的第一次旅行
	</body>
</html>
	```
	创建  src/index.js
```
console.log("hello webpack");

	```
	
	--5.4 在cmd窗口执行 npx webpack  
	执行完，会在 根目录下生成打包好的文件  dist/main.js
	
	--5.5 在编辑器下直接运行 index.html  就可以看到效果了
	
##6. 使用第三方实用工具库  lodash [](https://www.lodashjs.com)	
	--6.1 安装lodash 
	npm install --save lodash
	
	--6.2在 src/index.js 中添加相应的使用lodash的代码
```
//引入lodash
import _ from 'lodash';
//使用 里面的函数
var arr = _.chunk(['a','b','c','d'],2);
console.log(arr);
	```
	--6.3 在 cmd中运行 npx webpack ,重新打包
	--6.4 在编辑器下直接运行index.html 查看效果
	
##7. 使用 webpack.config.js 这个配置文件
	--7.1 在01-webpack-base目录下创建webpack.config.js
```
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
	```
	--7.2 配置 package.json
```
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
+	"start":"webpack --config webpack.config.js"
  },
	```
	--7.3 修改 index.html
```
<script src="./dist/bundle.js"></script>
```
	--7.4 在cmd中运行 npm start
	--7.5  在编辑器下直接运行index.html 查看效果
	
##8.加载器  loader  作用，可以将 scss、less、css、img、json 打包处理，添加到 dist的文件夹下面     ,加载css文件
	--8.1 安装 loader
	npm install --save-dev style-loader css-loader
	或
	cnpm install --save-dev style-loader css-loader
	
	--8.2 修改 webpack.config.js
```
//配置解析css文件
	module:{
		rules:[
			{
				test:/\.css/,//匹配所有的css扩展名的文件
				use:['style-loader','css-loader']//使用的插件
			}
		]
	}
	```
	--8.3 创建  src/style.css
```
.hello{color:blue;}
	```
	--8.4 添加了新的 src/index.js  ;将原来的index.js 重命名为index-01.js
```
//引入lodash
import _ from 'lodash';
import './style.css';

function com(){
	var oDiv = document.createElement('div');
	oDiv.innerHTML = _.join(['hello','webpack'] , ' ' );//将数组中的value值进行连接
	oDiv.classList.add('hello');//给div添加样式
	return oDiv;
}

document.body.appendChild(com());
	```
	--8.5 修改 index.html
```
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		
	</head>
	<body>
		webpack的第一次旅行
		<script src="./dist/bundle.js"></script>
	</body>
</html>
	```
	
	--8.6 在 cmd上运行 npm  start ,打包
	
	--8.7 在编辑器下直接运行index.html 查看效果
	
##9.使用 loader 加载img图片
	--9.1 安装加载图片的包
	npm install --save-dev file-loader
	或
	cnpm install --save-dev file-loader
	
	--9.2 修改 webpack.config.js
```
{
	test:/\.(png|svg|jpg|gif)/,//匹配图片
	use:['file-loader']
}
	```
	--9.3 将 timg.jpg  拷贝到项目中  src/img/timg.jpg
	
	--9.4 新建一个 src/index.js 文件，将原来的index.js 文件更改为 src/index-02.js
```
//引入图片
import meinv from './img/timg.jpg';

//创建图片对象
var oImg = new Image();
oImg.src = meinv;
var oDiv = document.createElement('div');
oImg.onload = function(){
	oDiv.appendChild(oImg);
	document.body.appendChild(oDiv);
}
	```
	--9.5 在dist目录下创建 index.html
```
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		
	</head>
	<body>
		webpack的第一次旅行
		<script src="./bundle.js"></script>
	</body>
</html>
	```
	
	--9.6 在 cmd上运行 npm  start ,打包
	
	--9.7 在编辑器下直接运行dist/index.html 查看效果
	
##10. 使用loader加载字体图标库
	--10.1 修改  webpack.config.js
```
{
				test: /\.(woff|woff2|eot|ttf|otf)$/,//匹配所有的字体图标后缀名文件
				use: ['file-loader']
			}
	```
	--10.2 修改 src/index.js
```
//引入图片
import meinv from './img/timg.jpg';
import './style.css';

//创建图片对象
var oImg = new Image();
oImg.src = meinv;
var oDiv = document.createElement('div');
var oDiv2 = document.createElement('div');
oImg.onload = function(){
	oDiv.appendChild(oImg);
	oDiv2.innerHTML = 'hello';
	oDiv2.classList.add('hello');
	document.body.appendChild(oDiv);
	document.body.appendChild(oDiv2);
}
	```
	--10.3 修改 src/style.css
```
/*添加字体*/
@font-face{
	font-family: "mtfont";
	src:url("./font/mtfont.ttf");
	font-weight: bold;
	font-size:20px;
	color:green;
}

.hello{
	color:blue;
	font-family: "mtfont";
	
	}
	```
	--10.4  在 cmd上运行 npm  start ,打包
	
	--10.5 在编辑器下直接运行dist/index.html 查看效果