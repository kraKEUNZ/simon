
var bouton = document.getElementById("start");

var lgreen = './images/l_green.png';
var lblue = './images/l_blue.png';
var lred = './images/l_red.png';
var lyellow = './images/l_yellow.png';

var light = [lgreen, lblue, lred, lyellow];

var green = './images/green.png';
var blue = './images/blue.png';
var red = './images/red.png';
var yellow = './images/yellow.png';
//test
var imgRed = document.getElementById("red");
var imgBlue = document.getElementById("blue");
var imgYellow = document.getElementById("yellow");
var imgGreen = document.getElementById("green");

var choixCPU = light[ Math.floor(Math.random()*light.length)];


function seqOrdi(){
	if (choixCPU == lgreen){
		imgGreen.setAttribute("src", choixCPU);
	}else if (choixCPU == lblue){
		imgBlue.setAttribute("src", choixCPU);
	}else if (choixCPU == lred){
		imgRed.setAttribute("src", choixCPU);
	}else {
		imgYellow.setAttribute("src", choixCPU);
	}
	setTimeout(function(){
		if (choixCPU == lgreen){
			imgGreen.setAttribute("src", green);
		}else if (choixCPU == lblue){
			imgBlue.setAttribute("src", blue);
		}else if (choixCPU == lred){
			imgRed.setAttribute("src", red);
		}else {
			imgYellow.setAttribute("src", yellow);
		}
	},2000);
}

function jouer(){
	seqOrdi();

}

bouton.addEventListener("click", function start(){
	bouton.setAttribute("style","background-color: red;");
	bouton.removeEventListener("click", start);
	jouer();
});

