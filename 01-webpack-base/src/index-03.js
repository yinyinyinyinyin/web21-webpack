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