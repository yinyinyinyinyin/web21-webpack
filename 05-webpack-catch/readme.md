## 部署服务器时，希望能够配置缓存。缓存文件的好处是：
## 如果文件没变，name我们只要获取缓存的数据就好了，不需要每次都访问服务器信息


## 1.创建项目，初始化项目
05-webpack-catch 
npm init 

## 2.安装依赖
npm install --save-dev webpack webpack-cli html-webpack-plugin clean-webpack-plugin webpack-merge uglifyjs-webpack-plugin webpack-dev-server


## 3.创建项目中的文件
	-- src/index.js
```
console.log('webpack catch运行了');
	```
	
	--webpack.config.js
```
const path=require('path');
const HtmlWebpackPlugin = reqquire('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
module.exports = {
	entry:{
		index:'./src/index.js'
	},
	plugins:{
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin(
			title:'webpack catch',
			tempalte:'./index.template.html'
		)
	},
	output:{
		filename:'[name].bundle.js',
		path:path.resolve(__dirname,'dist')
	}
}
	```
	--index.template.html
	
	
	
## 4.修改 package.json
```
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
+	"build":"webpack --config ./webpack.config.js"
  },
	```

## 5.运行  npm run build 	查看结果  ，生成 有hash的打包文件

index.9e7400c9efe9052c1fb9.js

## 6.修改 src/index.js
```
console.log('webpack catch运行了');
console.log('我更改了');
console.log('我第二次更改代码');
```
## 7.再次打包，查看结果，会发现，打包后的文件名发生了变化
index.826160ab2a350d6f02c2.js


## 8.提取引导模板
	--8.1 安装 lodash
	npm install --save lodash
	--8.2 修改webpack.config.js
```
	optimization:{//代码分离
		splitChunks:{
			"chunks":"all"
		}
	},
```
	--8.3 修改了src/index.js
```
//引入 lodash
import _ from 'lodash';

let re = _.join([1,2,3,4,5],' ');
console.log(re);
	```
	--8.4 执行 npm run build ，查看，lodash已经代码分离了
	
	
## 如果，src/index.js 中的代码发生变化时，  dist里面的lodash压缩文件的hash值是否发生变化

