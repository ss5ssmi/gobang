/*状态事件*/
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
/* 悔棋 */
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

/* 更改下棋方 */
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
var iswin = false; // 有没有分出胜负

// 负责下棋
var xia = function () {
	if (curr == null) {
		alert('Game have not start!');
	}
	// 判断是否已分出胜负
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

		judge.call(this, color); // 下完棋后判断胜负
	} else {
		color = cnt();
	}
}

// 判断胜负
var judge = function (color) {
	var count = 0;
	var curr = {
		x: this.cellIndex,
		y: this.parentElement.rowIndex,
		color: color
	};
	var line = ['', '', '', '']; //分别放置横，竖，左右下斜上棋
	for (var i = 0, tmp = {}; i < 225; i++) {
		tmp = {	x: tds[i].cellIndex,y: tds[i].parentElement.rowIndex,color: '0'};
		if (tds[i].style.background.indexOf('black') >= 0) {
			tmp.color = 'b';
		} else if (tds[i].style.background.indexOf('white') >= 0) {
			tmp.color = 'w';
		}
		if (tmp.color != 'w' && tmp.color != 'b') {//剩余空点
			count++;
		}
		if (curr.y == tmp.y) {// 在一个横线上
			line[0] += tmp.color;
		}
		if (curr.x == tmp.x) {// 在一个竖线上
			line[1] += tmp.color;
		}
		if ((curr.x + curr.y) == (tmp.x + tmp.y)) {//在左斜线上
			line[2] += tmp.color;
		}
		if ((curr.x - tmp.x) == (curr.y - tmp.y)) {//在右斜线上
			line[3] += tmp.color;
		}
	}// 判断4条线上，有没有连续的4个w,或4个b
	color = color == 'black' ? 'bbbbb' : 'wwwww';
	for (var i = 0; i < 4; i++) {
		if (line[i].lastIndexOf(first) - line[i].indexOf(first) >= 1) { //长连
			var losser = first[0] == 'b' ? "Black" : "White";
			alert(losser + ' is Long Forbidden!');
			iswin = true; // 标志已经分出胜负
			document.getElementById("retract").disabled = true;
			break;
		}
		if (line[i].indexOf(color) >= 0) { //五子
			var winner = color[0] == 'b' ? "Black" : "White";
			alert(winner + ' is winner!');
			iswin = true; // 标志已经分出胜负
			document.getElementById("retract").disabled = true;
			break;
		}
	}
	if (count == 0) {//剩余点为0，则为平局
		alert("Draw!");
	}
}

window.onload = function () {
	document.getElementsByTagName('table')[0].onclick = function (ev) {
		// 1. 下棋
		// 2. 判断胜负
		if (url != null) xia.call(ev.srcElement);
		else alert("Game have not start,please select the color!");
	};
}
