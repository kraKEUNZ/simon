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
        if(this.active){
            this.el.style = 'cursor:pointer;'
        }else(this.el.style='cursor:not-allowed;')
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
        }
    }
}

var memoPlayer=[];
var choixCPU="";
var keys = [];
var memoCPU=[];
var index=0;
var i = 0;
var tours=0;


    $(".container div img").each(function(){
        var htmlEl = $(this)[0];
        keys.push(new Key(htmlEl));
    });
    $('#start').click(function(){
        $('#start').attr('style', 'background:red;');
        randomCPU();
        $('#start').off();
    });

    function activeKey(){
        keys.map(function(btn){
            btn.setActive(true);
        });
    }

    function randomCPU(){
        keys.map(function(btn){
            btn.setActive(false);
        $('#listen').show();
        });
        choixCPU=keys[Math.floor(Math.random()*keys.length)];
        memoCPU.push(choixCPU);
        let time= setInterval(function() {
            let valeur= memoCPU[i];
                valeur.play();
                i++;
                if(i==memoCPU.length){
                    clearInterval(time);
                    i=0;
                    activeKey();
                    $('#listen').hide();
                    $('#play').show();
                }
        }, 800);

    }
    function compare(){
        if(memoCPU[index] == memoPlayer[index]){
            if(index === memoCPU.length-1){
                memoPlayer=[];
                setTimeout(function(){
                    randomCPU();
                    index=0;
                    tours+=1;
                    console.log(tours);
                    $('#score').html(tours);
                    $('#listen').show();
                    $('#play').hide();
                },500);
            }else{
                index++;
            }
        }else{
            $('#perdu').show();
            $('#play').hide();
            keys.map(function(btn){
                btn.setActive(false);
            });
            $('#rejouer').show();
        }
    }
    $('#rejouer').click(function(){
        init();
    });
    function init(){
        memoPlayer=[];
        choixCPU="";
        memoCPU=[];
        index=0;
        i = 0;
        tours=0;
        $('#score').html(tours);
        $('#listen').show();
        $('#play').hide();
        $('#perdu').hide();
        $('#rejouer').hide();
        randomCPU();
    }
});
