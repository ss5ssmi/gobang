/*״̬�¼�*/
var url = null;
var curr = null;
var first = null;

function blackfirst() {
	document.getElementById('qizi').src = "img/black.png";
	url = document.getElementById('bf').value.substring(0, 5);
	alert(url + " fist !");
	curr = 'black';
	first = 'bbbbb';
	document.getElementById('bf').disabled = true;
	document.getElementById('wf').disabled = true;
}

function whitefirst() {
	document.getElementById('qizi').src = "img/white.png";
	url = document.getElementById('wf').value.substring(0, 5);
	alert(url + " fitst !");
	curr = 'white';
	first = 'wwwww';
	document.getElementById('bf').disabled = true;
	document.getElementById('wf').disabled = true;
}

var feedtd=null;
var black=false;
var white=false;
/* ���� */
function retract() {
	feedtd.style.background = null;
	var tmp;
	if(curr == 'black'){
		tmp = 'white';
		cnt();
		document.getElementById("qizi").src="img/"+ tmp +".png";
		if(!white){
			white=!white;
			document.getElementById("retract").disabled = white;
		}
	}else{
		tmp = 'black';
		cnt();
		document.getElementById("qizi").src="img/"+ tmp +".png";
		if(!black){
			black=!black;
			document.getElementById("retract").disabled = black;
		}
	}

}

/* �������巽 */
var cnt = (function () {
	return function () {
		var tmp = curr;
		if (curr == 'black') {
			curr = 'white';
		} else {
			curr = 'black';
		}
		return tmp;
	}
})();

var tds = document.getElementsByTagName('td');
var iswin = false; // ��û�зֳ�ʤ��

// ��������
var xia = function () {
	if (curr == null) {
		alert('Game have not start!');
	}
	// �ж��Ƿ��ѷֳ�ʤ��
	var color = cnt();
	if (iswin) {
		alert('Game Over!');
		return;
	}
	if (this.style.background.indexOf('.png') >= 0) {
		alert('You can not put it here!');
		color = cnt();
		return;
	}
	feedtd=this;
	if(curr == "black") document.getElementById("retract").disabled = white;
	if(curr == "white") document.getElementById("retract").disabled = black;

	if (this.tagName == 'TD') {
		var tmp;
		if (color == 'black') {
			tmp = 'white';
		} else {
			tmp = 'black';
		}
		this.style.background = 'url(img/' + color + '.png)';
		document.getElementById('qizi').src = 'img/' + tmp + '.png';

		judge.call(this, color); // ��������ж�ʤ��
	} else {
		color = cnt();
	}
}

// �ж�ʤ��
var judge = function (color) {
	var count = 0;
	var curr = {
		x: this.cellIndex,
		y: this.parentElement.rowIndex,
		color: color
	};
	var line = ['', '', '', '']; //�ֱ���úᣬ����������б����
	for (var i = 0, tmp = {}; i < 225; i++) {
		tmp = {	x: tds[i].cellIndex,y: tds[i].parentElement.rowIndex,color: '0'};
		if (tds[i].style.background.indexOf('black') >= 0) {
			tmp.color = 'b';
		} else if (tds[i].style.background.indexOf('white') >= 0) {
			tmp.color = 'w';
		}
		if (tmp.color != 'w' && tmp.color != 'b') {//ʣ��յ�
			count++;
		}
		if (curr.y == tmp.y) {// ��һ��������
			line[0] += tmp.color;
		}
		if (curr.x == tmp.x) {// ��һ��������
			line[1] += tmp.color;
		}
		if ((curr.x + curr.y) == (tmp.x + tmp.y)) {//����б����
			line[2] += tmp.color;
		}
		if ((curr.x - tmp.x) == (curr.y - tmp.y)) {//����б����
			line[3] += tmp.color;
		}
	}// �ж�4�����ϣ���û��������4��w,��4��b
	color = color == 'black' ? 'bbbbb' : 'wwwww';
	for (var i = 0; i < 4; i++) {
		if (line[i].lastIndexOf(first) - line[i].indexOf(first) >= 1) { //����
			var losser = first[0] == 'b' ? "Black" : "White";
			alert(losser + ' is Long Forbidden!');
			iswin = true; // ��־�Ѿ��ֳ�ʤ��
			document.getElementById("retract").disabled = true;
			break;
		}
		if (line[i].indexOf(color) >= 0) { //����
			var winner = color[0] == 'b' ? "Black" : "White";
			alert(winner + ' is winner!');
			iswin = true; // ��־�Ѿ��ֳ�ʤ��
			document.getElementById("retract").disabled = true;
			break;
		}
	}
	if (count == 0) {//ʣ���Ϊ0����Ϊƽ��
		alert("Draw!");
	}
}

window.onload = function () {
	document.getElementsByTagName('table')[0].onclick = function (ev) {
		// 1. ����
		// 2. �ж�ʤ��
		if (url != null) xia.call(ev.srcElement);
		else alert("Game have not start,please select the color!");
	};
}
