
const {Engine,Bodies,World,Constraint}=Matter;
var engine,world;

var grd,std1,std2,ply;
var blk1=[];
var blk2=[];
var z,q,a;
var shot;
var sc=0;
var dfbk,bki;

function preload(){
    dfbk = loadImage("NGT-bk.jpg");
    gbki();
}

function setup(){
    createCanvas(1200,500);

    engine = Engine.create();
    world = engine.world;

    grd = new Grd(width/2,height-10,width,20,255,255,255);
    std1 = new Grd(700,330,210,10,255,0,0);
    std2 = new Grd(1000,200,180,10,255,0,0);

    ply = new Poly(325,265,30);

    q=319;
    z=7;
    a=-1;
    for(var i=0;i<7;i++){
        var r=random(100,255);
        var g=random(100,255);
        var b=random(100,255);
        for(var j=i;j<z;j++){
            a+=1;
            blk1[a]=new Box(635+j*20,q,20,30,r,g,b);
        }
        q-=30;
        z-=1;
    }

    q=189;
    z=5;
    a=-1;
    for(var i=0;i<5;i++){
        var r=random(100,255);
        var g=random(100,255);
        var b=random(100,255);
        for(var j=i;j<z;j++){
            a+=1;
            blk2[a]=new Box(950+j*20,q,20,30,r,g,b);
        }
        q-=30;
        z-=1;
    }   
    shot = new Sling(ply.body,325,265);
}

function draw(){
    if(bki){
        background(bki);
    }else{
        background(dfbk);
    }
    fill(255);
    text("SCORE : "+sc,50,50);
    
    Engine.update(engine);
    //background(0);
    grd.show();
    std1.show();
    std2.show();
    
    ply.show();
    shot.display();
    
    for (var b of blk1){
        b.show();
        b.score();
    }
    for (var b of blk2){
        b.show();
        b.score();
    }
    
}

function mouseDragged(){
    Matter.Body.setPosition(ply.body,{x: mouseX, y: mouseY});
}

function mouseReleased(){
    setTimeout(()=>{
  shot.fly();
    },100);
}

function keyPressed(){
    if(keyCode==32){
        World.remove(world,ply.body);
        ply = new Poly(325,265,30); 
        shot.attach(ply.body);
    }
}

async function gbki(){
    var bg;
    var response = await fetch ("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    
    var responseJSON =  await response.json();
    
    var datetime=responseJSON.datetime;
    
    var hour = datetime.slice(11,13);
    
    if(hour>=06&&hour<=18){
        bg="MRN-bk.jpg";
    }
    else{
        bg="NGT-bk.jpg";
    }
    bki=loadImage(bg);
    }