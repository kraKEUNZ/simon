$(document).ready(function(){   // fonction qui permet de charger le totu au démarrage
class Key{ // creation d'une class de script, pas confondre avec class css
    constructor(element){ // fonction portant comme nom constructeur, et pour "arguments" les elements de notre jeu
        this.el = element;   // ciblage de l'element html pour le quel on crer la classe Key
        this.id = element.id; // appel de l'id pour notre element html
        this.color = "./images/"+this.id+".png"; // ciblage de l'image portant son id
        this.l_color = "./images/l_"+this.id+".png"; // même chose qu'au dessus mais avec l'image une fois le clic fait
        this.soundPath = element.getAttribute('data-sound'); // récupération du son
        element.src = this.color; // ? :/
        this.active=false; // ?
        this.createAudio(); // creation du son
        this.createListener(); // creation dun ecouteur sur nos images
    }
    createAudio(){ // fonction create audio
        this.audio = new Audio(this.soundPath); // lecture du son
    }
    setActive(bool){
        this.active=bool;
        if(this.active){
            this.el.style = 'cursor:pointer;' // on met le cursor pointer sur notre element html
        }else(this.el.style='cursor:not-allowed;') // un cursor non autorisé quand l'ordi joue
    }
    createListener(){ // creation de nos écouteurs pour les elements du simon
        var me = this; // grace au me, on agit seulement sur l'element sur le quel on clic
        this.el.onclick = function(){
            if(me.active) {
                me.play(); // on joue le son et la lumiere une fois qu'on a cliqué sur notre element
                memoPlayer.push(me); // on ajoute une nouvelle valeur, à comparer dans notre tableau
                compare(); // et on compare votre dites valeur au même index que celui du choix ordi
            }
        }
    }
    play(){ // fonction de la séquence de jeu
        var me = this; // on cible précisément avec le me, pour nos éléments ciblés avec this
        this.audio.play(); // on joue le son lié à notre element
        this.el.src = this.l_color; // on va chercher la couleur a affiché
        this.audio.onended = function() { // quand le son est fini
            me.el.src = me.color; // on revient a la couleur de base
        }
    }
}
// déclaration des variables
var memoPlayer=[]; // le tableau mémoire du joueur
var choixCPU=""; // le choix cpu en string vide, car il fait un choix random parmis les valeur qu'il connait
var keys = []; // les différentes touches
var memoCPU=[]; // le tableau de choix ordi pour comparer avec les choix du joueur
var index=0; // on commence l'index a  pour comparé des le debut
var i = 0; // ?
var tours=0; // compteur de tours


    $(".container div img").each(function(){ // ?
        var htmlEl = $(this)[0];
        keys.push(new Key(htmlEl));
    });
    $('#start').click(function(){ // une fois le clic fait
        $('#start').attr('style', 'background:red;'); // le bouton start passe en rouge
        randomCPU(); // et l'ordi démarre son premier choix
        $('#start').off(); // bouton start devient non cliquable
    });

    function activeKey(){ // activation des touches du simon
        keys.map(function(btn){ // ?
            btn.setActive(true); // ?
        });
    }

    function randomCPU(){ // fonction du choix du cpu
        keys.map(function(btn){ // récupération des valeurs de touches
            btn.setActive(false); // on desactive les boutons pour le joueur
        $('#listen').show(); // affiche un texte de conseil
        });
        choixCPU=keys[Math.floor(Math.random()*keys.length)]; // permet d'otbenir une valeur precise
        memoCPU.push(choixCPU); // en fonction du choix de l'ordi, on le push dans le tableau mémoire
        let time= setInterval(function() { // l'interval pour attendre que le son se finisse et joue le suivant
            let valeur= memoCPU[i]; // index 0 pour le tableau memoCPU
                valeur.play(); // on joue la séquence du cpu à partir de 0
                i++; // on incrémente
                if(i==memoCPU.length){ // condition que tant que i est identique à la longueur du tableau
                    clearInterval(time);
                    i=0;
                    activeKey();
                    $('#listen').hide();
                    $('#play').show();
                }
        }, 800);

    }
    function compare(){ // on compare les valeurx aux index indentiques
        if(memoCPU[index] == memoPlayer[index]){ // si le tablea du cpu est identique au tableau du player
            if(index === memoCPU.length-1){ // ?
                memoPlayer=[]; // pour mémo player
                setTimeout(function(){ // on arrete le tour
                    randomCPU();
                    index=0;
                    tours+=1; // on ajoute une valeur a la séquence
                    console.log(tours);
                    $('#score').html(tours); // le score augmente en fonction du tour qui est jouer
                    $('#listen').show(); //
                    $('#play').hide();
                },500);
            }else{
                index++; // sinon on continue
            }
        }else{  // sinon on arrete tout
            $('#perdu').show();
            $('#play').hide();
            keys.map(function(btn){
                btn.setActive(false);
            });
            $('#rejouer').show();
        }
    }
    $('#rejouer').click(function(){ // affichage du bouton rejouer
        init(); // le jeu redemarre sans rafraichir la page
    });
    function init(){  // on relance tout notre jeu
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
