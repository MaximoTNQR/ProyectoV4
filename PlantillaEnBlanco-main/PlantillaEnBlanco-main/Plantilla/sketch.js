var Personaje,PersonajeIMG;
var coin , Plataforma, PlataformaIMG,Plataforma2,Plataforma2IMG;
var ground,Fondo,fondoIMG,obstaculo,obstaculoIMG,obstaculoGroup;
var coinGroup, plataformasGroup;
var score=0;
var play=1;
var end=0;
var altura=0;
var gameState=play;
var restart,restartIma;
var GameOver,GameOverIma;

function preload()
{
    PlataformaIMG = loadImage("./Imagenes/Plataforma 1.png");
    Plataforma2IMG = loadImage("./Imagenes/Plataforma 2.png");
    FondoIMG = loadImage("./Imagenes/Cielo.png");
    PersonajeIMG = loadAnimation("./Imagenes/Quieto.png","./Imagenes/Saltando.png");
    MonedaIMG = loadImage("./Imagenes/Moneda.png");
    GameOverIma = loadImage("./Imagenes/Game Over.png");
}

function setup(){

  createCanvas(600, 650);

  Fondo = createSprite(350,450);
  Fondo.addImage("Fondo",FondoIMG);
  Fondo.scale = 10;
  Fondo.velocityY = 1.7; 
  
  Personaje=createSprite(50,10);
  Personaje.addAnimation("Quieto",PersonajeIMG);
  Personaje.scale = 2;
  Personaje.debug = true;
  Personaje.setCollider("rectangle",0,0,20,28)

  Ground = createSprite(5,637,1250,20);
  Ground.debug = true;
  Ground.shapeColor = rgb(0,229,255);

  plataformasGroup = new Group();
  coinGroup = new Group();
  obstaculoGroup= new Group();
  
  //gameover=createSprite(300,200);
  //gameover.addImage("gameover",gameoverImg);
  //gameover.visible=false;
  //gameover.scale = 0.8;
  
  //restart=createSprite(300,300);
  //restart.addImage("restart",restartImg);
  //restart.scale=0.8;
  //restart.visible=false;
}


function draw() {
  background(255);

  if(gameState===play){
    
    if (Fondo.y > 450){
      Fondo.y = 100;
    }
    
    if (keyDown("LEFT_ARROW")){
      Personaje.x -= 5;
    }
    
    if (keyDown("RIGHT_ARROW")){
      Personaje.x += 5;
    }
    
    if (keyDown("SPACE")){
      Personaje.velocityY=-15;
    }
    
    Personaje.velocityY=Personaje.velocityY+0.8;       
  
    spawnPlataformas();
    spawnCoins();
    spawnObstaculos();
  
    if(Personaje.isTouching(coinGroup)){
      for (var i = 0; i < coinGroup.length; i++) {
        if (coinGroup.get(i).isTouching(Personaje)) {
          coinGroup.get(i).destroy();
          score = score + 1;
        }
      }
    }
    
    if(Personaje.isTouching(obstaculoGroup)){
      gameState=end;
      Fondo.velocityY=0;
    }
  }
  if(Personaje.y>=500){
    altura=altura+1;
    console.log(altura);
  }
  
  if (altura===3){
    console.log("Fin del juego");
    gameState=end;  
  }

  
  else if(gameState===end){
    plataformasGroup.setVelocityYEach(0);
    coinGroup.destroyEach();      
    obstaculoGroup.setLifetimeEach(-1);
      //parar las velocidades de todos
    //gameover.visible=true;
    //restart.visible=true;
   
  }

  Personaje.collide(plataformasGroup);
  Personaje.collide(Ground); 
  Personaje.collide(obstaculoGroup);
  
  drawSprites();

  stroke="white";
  textSize(20);
  fill("Red");
  text("Puntuación : "+score,10,25);
}


function spawnPlataformas(){
  if(frameCount%80===0){
    Plataforma = createSprite(50,20,100,20);
    Plataforma.addImage("Plataforma",PlataformaIMG);
    Plataforma.scale = 2;
    Plataforma.debug = true;
    Plataforma.setCollider("rectangle",0,0,100,20)
    Plataforma.velocityY = 2.3;
    Plataforma.x = Math.round(random(20,580));
    //Plataforma.y = Math.round(random(20,400));
    Plataforma.lifetime = 800;
    plataformasGroup.add(Plataforma);
    //Plataforma2 = createSprite(200,20);
    //Plataforma2.addImage("Plataforma2",Plataforma2IMG);
  }
}

function spawnCoins(){
  if (frameCount % 150 === 0) {
    coin = createSprite(50,20,10,10);
    coin.addImage("Moneda",MonedaIMG);
    coin.scale = 2;
    coin.debug = true;
    coin.setCollider("rectangle",0,0,10,10)
    coin.velocityY = 2.3;
    coin.x = Math.round(random(20,580));
    //Plataforma.y = Math.round(random(20,400));
    coin.lifetime = 800
    coinGroup.add(coin);//Falta agregar al grupo correcto
  }
}

function spawnObstaculos(){
  if (frameCount % 150 === 0) {
    obstaculo = createSprite(50,20,10,10);
    //obstaculo.addImage("Moneda",MonedaIMG);
    obstaculo.scale = 2;
    obstaculo.debug = true;
    obstaculo.setCollider("rectangle",0,0,10,10)
    obstaculo.velocityY = 2.3;
    obstaculo.x = Math.round(random(20,580));
    //Plataforma.y = Math.round(random(20,400));
    obstaculo.lifetime = 800
    obstaculoGroup.add(obstaculo);//Falta agregar al grupo correcto
  }
}



