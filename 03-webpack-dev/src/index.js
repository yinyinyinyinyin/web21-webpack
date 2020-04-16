//引入print模块
import p from './print';
console.log('我是index文件');
var oBtn=document.createElement('button');
oBtn.innerHTML = "点击修改内容";
document.body.appendChild(oBtn);
console.error('I get called from print.js!');

console.log('测试浏览器是否自动刷新了');

console.log('今天天气很好啊!');

if(module.hot){
	console.log('支持模块热更新');
	module.hot.accept('./print.js',function(){
		console.log('print模块更新了');
		oBtn.onclick = p.func;
	})
}
