console.log('webpack config js 文件运行了！');

//import _ from 'lodash'; 静态引入
import (/*webpackChunkName:"lodash"*/ 'lodash').then(({default:_})=>{//动态引入插件
	var re = _.chunk ([1,2,3,4,5],2);
	console.log(re);
})

