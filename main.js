class Button{
	constructor(element, color, lightColor, soundPath){
		this.el = element;
		this.lcolor = lightColor;
		this.color = color;
		this.soundPath = soundPath;
		this.launchListeners();
	}
	play(){
		var s = new Audio(this.soundPath);
		s.play();
	}
	changeImg(){
		this.el.setAttribute('src', this.lcolor );

	}
	timer(){
			this.el.setAttribute('src', this.color);
	}

	launchListeners(){
		var me = this;
		this.el.onclick = function (){
			me.play();
			me.changeImg();
			setTimeout(function(){
				me.timer();
			},500);
		}
	}
}



