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