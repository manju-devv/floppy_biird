

$(function(){
var container = $(".container");
var bird = $(".bird");
var pole = $(".pole");
var pole1 = $("#pole1");
var pole2 = $("#pole2");
var score = $("#score");
var speedu =  $("#speed");
var restart = $(".restart");

var container_width = parseInt(container.width());
var container_height = parseInt(container.height());
var pol_pos = parseInt(pole.css("right"));
var pole_height = parseInt(pole.css("height"));
var bird_left = parseInt(bird.css("left"));
var bird_height = parseInt(bird.height());
var speed = 10;

var goup = false;
var score_update = false;
var game_over = false;


var the_game = setInterval(()=>{

    if(collision(bird,pole1) || collision(bird,pole2) || parseInt(bird.css('top'))<=0 || parseInt(bird.css('top'))> container_height-bird_height){
        stop_the_game();
    } else {
        
        var pole_cur_pos = parseInt(pole.css('right'));
        if(pole_cur_pos > (container_width - bird_left)){
            if(score_update === false){
            score.text(parseInt(score.text())+1);
            score_update = true;
            }
        }
        if(pole_cur_pos > container_width){
            var new_hei = parseInt(Math.random()*100);
            pole1.css("height",pole_height + new_hei);
            pole2.css("height",pole_height - new_hei);
            
            speed = speed + 1                                                                         ;
            speedu.text(speed);
            score_update = false;

            pole_cur_pos = pol_pos;
        }
        pole.css("right",pole_cur_pos + speed);

        if(goup === false){
            go_down()
        }
    }
},50);

$(document).on("keydown",function(e){
    var key = e.keyCode;
    if(key === 32 && goup === false && game_over === false){
        goup = setInterval(up,50);
    }
});

$(document).on("keyup",function(e){
    var key = e.keyCode;
    if(key === 32){
       clearInterval(goup);
       goup = false;
    }
});
$(document).on("click",function(e){
    if(e.button === 0 && goup === false && game_over === false){
        goup = setInterval(up,50);
        setTimeout(()=>{
            clearInterval(goup);
            goup = false;
        },200)
    } 
});
$(document).on("tap",function(e){
    if(goup === false && game_over === false){
        goup = setInterval(up,50);
        setTimeout(()=>{
            clearInterval(goup);
            goup = false;
        },200)
    } 
});


function go_down(){
    bird.css("top",parseInt(bird.css('top'))+5);
}
function up(){
    bird.css("top",parseInt(bird.css("top"))-10);
}
function stop_the_game(){
    clearInterval(the_game);
    game_over = true; 
    restart.slideDown();
}


function collision(lol1,lol2){
    var x1 = lol1.offset().left;
    var y1 = lol1.offset().top;
    var h1 = lol1.outerHeight(true);
    var w1 = lol1.outerWidth(true);
    var b1 = y1 + h1;
    var r1 = x1 + w1;
    var x2 = lol2.offset().left;
    var y2 = lol2.offset().top;
    var h2 = lol2.outerHeight(true);
    var w2 = lol2.outerWidth(true);
    var b2 = y2 + h2;
    var r2 = x2 + w2;

    if(b1<y2||y1>b2||r1<x2||x1>r2)return false;
    return true;
}
restart.click(function(){
    location.reload()
})
});