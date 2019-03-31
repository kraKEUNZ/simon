$(document).ready(function(){
class Key{
    constructor(element){
        this.el = element;
        this.id = element.id;
        this.color = "./images/"+this.id+".png";
        this.l_color = "./images/l_"+this.id+".png";
        this.soundPath = element.getAttribute('data-sound');
        element.src = this.color;
        this.active=false;
        this.createAudio();
        this.createListener();
    }
    createAudio(){
        this.audio = new Audio(this.soundPath);
    }
    setActive(bool){
        this.active=bool;
    }
    createListener(){
        var me = this;
        this.el.onclick = function(){
            if(me.active) {
                me.play();
                memoPlayer.push(me);
                compare();
            }
        }
    }
    play(){
        var me = this;
        this.audio.play();
        this.el.src = this.l_color;
        this.audio.onended = function() {
            me.el.src = me.color;
        };
        this.getDuration();
    }
    getDuration(){
        var duree=this.audio.duration;
        return duree;
    }
}

var memoPlayer=[];
var choixCPU="";
var keys = [];
var memoCPU=[];
var index=0;
var i = 0;


    $(".container div img").each(function(){
        var htmlEl = $(this)[0];
        keys.push(new Key(htmlEl));
    });

    $('#start').click(function(){
        $('#start').attr('style', 'background:red;');
        keys.map(function(btn){
            btn.setActive(true);
        });
        randomCPU();
    });
    function randomCPU(duree){
        choixCPU=keys[Math.floor(Math.random()*keys.length)];
        console.log(choixCPU);
        memoCPU.push(choixCPU);
        console.log(memoCPU);
        let time= setInterval(function() {
            let valeur= memoCPU[i];
                valeur.play();
                i++;
                if(i==memoCPU.length){
                clearInterval(time);
                i=0;
                }
        }, 2000);
    }

    function compare(){
        if(memoCPU[index]==memoPlayer[index]){
            if(index === memoCPU.length-1){
                memoPlayer=[];
                randomCPU();
                index=0;
            }else{
                console.log ("gagné");
                index++;
            }
        }else{
            console.log('perdu');
        }
    }
});
