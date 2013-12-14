function makeRGB(r,g,b)
{
    return 'rgb('+r+','+g+','+b+')';
}
function makeRGBA(r,g,b,a)
{
    return 'rgba('+r+','+g+','+b+','+a+')';
}

function drawRectangles(ctx)
{
    var size=100;
    var alpha=0.15;
    for(var i=0; i<6; ++i) {
        ctx.fillStyle=makeRGBA(150,150,250,alpha);
        ctx.fillRect(0,40,size,size);
        size+=20;
//        alpha+=0.2;
       // console.log("size="+size+" alpha="+alpha);
    }

}
(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();


function makeSprite(x,y,img)
{
    var spr=new Object();
    spr.x=x;
    spr.y=y;
    spr.img=img;
    return spr; 
    
}



var player=makeSprite(0,440,new Image());
player.img.src="owl.png";

var ctx,canvas;
var sprites=[];
var changed=false;
var images=[new Image(), new Image(), new Image(), new Image()];
images[0].src="broccoli.png";
images[1].src="zanahoriascolor.png";
images[2].src="chips.png";
images[3].src="fries.png";


var points=0, bads=0;
var pointsSpan, badsSpan;

function showPoints()
{
    pointsSpan.textContent=points;
}

function showBads()
{
    badsSpan.textContent=bads;
}
function randomInt(n)
{
    return Math.floor(Math.random()*n);
}

function drawSprite(ctx, sprt)
{
    ctx.drawImage(sprt.img,sprt.x,sprt.y);
}

function point_overlap(x1, x2,min,max)
{
    return x2>=min && x1<=max;
}

function overlap(spr1, spr2)
{
    return point_overlap(spr1.x, spr1.x+spr1.img.width,spr2.x,spr2.x+spr1.img.width) && 
            point_overlap(spr1.y, spr1.y+spr1.img.height, spr2.y, spr2.y+spr2.img.height)  
}

var dyFactor=5;
var dyConstant=3;


var timeout,incDiff;

function incDifficulty()
{
    dyFactor+=2;
    dyConstant+=1;
    sprites.push(restartSprite(new Object()));
    timeout=timeout*2;
    incDiff=window.setTimeout(incDifficulty,timeout);
}

function init() {
    canvas=document.getElementById('canvas');
    ctx=canvas.getContext('2d');
    pointsSpan=document.getElementById('points');
    badsSpan=document.getElementById('bads');

    sprites=[];
    timeout=5000;
    dyFactor=5;
    dyConstant=3;
    points=0;
    bads=0;
    showPoints();
    showBads();
    window.clearTimeout(incDiff);
    draw();
    window.setInterval(timerHandler,100);
    incDiff=window.setTimeout(incDifficulty,timeout);

    sprites.push(restartSprite(new Object()));
    sprites.push(restartSprite(new Object()));
    sprites.push(restartSprite(new Object()));
    sprites.push(restartSprite(new Object()));
    requestAnimationFrame(draw2);
}

function restartSprite(spr)
{
    idx=randomInt(4);
    if(idx<2)
        spr.good=true;
    else 
        spr.good=false;
    
    spr.y=0;
    spr.dy=randomInt(dyFactor)+dyConstant;
    spr.img=images[idx];
    spr.x=randomInt(canvas.width-spr.img.width);
    return spr;
}

function timerHandler()
{
    changed=true;
    for(idx in sprites) {
        sprites[idx].y+=sprites[idx].dy;
        if(overlap(player,sprites[idx])) {
            if(sprites[idx].good) {
                points=points+1;
                showPoints();
            }
            else {
                bads=bads+1;
                showBads();
                if(bads>=3) {
                    alert("You got " + points +" points");
                    init();
                }
            }
            console.log("points="+points+"   bads="+bads);
            restartSprite(sprites[idx]);
        }
        if(sprites[idx].y+sprites[idx].img.height>=canvas.height+20) {
            restartSprite(sprites[idx]);
        }
    }
//    draw();
}

function draw2() {
    console.log("raf");
    if(changed)
        draw();
    changed=false;
    requestAnimationFrame(draw2);
}
function draw()
{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawSprite(ctx,player);
    for(var idx in sprites) {
        //console.log("spriting spr"+sprites[idx]);
        drawSprite(ctx,sprites[idx]);
    }
//    requestAnimationFrame(draw);


}

function keyPressed(event)
{
    if(event.keyCode==37 && player.x>0) // <-
            player.x-=20;
    else if (event.keyCode==39 && player.x+player.img.width<canvas.width) // ->
        player.x+=20;
}