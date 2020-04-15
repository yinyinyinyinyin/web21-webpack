console.log('webpack-index  ');
//引入 print中的函数
import printMe from './test.js';
//创建一个按钮
var oBtn = document.createElement('button');
oBtn.innerHTML = '点击调用函数';
oBtn.onclick = printMe;
document.body.appendChild(oBtn);