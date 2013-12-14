var strings=[
	"Louisiana, Baton Rouge",
	"Georgia, Atlanta",
	"Florida, Tallahassee"
];
(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();


var ctx,canvas;
var y=0;
var s1="", s2="Louisiana,Baton Rouge"

function drawStrings(ctx,x,y, s1, s2)
{
    ctx.fillStyle="Green";
    ctx.fillText(s1,x,y);
    ctx.fillStyle="Red";
    ctx.fillText(s2,x+20+ctx.measureText(s1).width,y);

}

function randomInt(n)
{
    return Math.floor(Math.random()*n);
}




function init() {
    canvas=document.getElementById('canvas');
    ctx=canvas.getContext('2d');
    ctx.font="bold 20pt Arial"
    window.setInterval(draw,80);
}

function timerHandler()
{
}


function draw()
{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ++y;
    drawStrings(ctx,10,y,s1,s2);
}

function keyPressed(event)
{
    c=String.fromCharCode(event.keyCode);
    console.log(c+" " +event.keyCode +"  "+event.charCode + " .. "+event.which);
   
    if(c==s2[0].toUpperCase() || (event.keyCode==188 && s2[0]==',')) {
        s1+=s2[0];
        s2=s2.substr(1);
        draw();
    }
        
}
