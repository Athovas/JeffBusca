var caminho,menino,dinheiro,diamantes,joias,espada, die;
var imgCaminho,imgMenino,imgDinheiro,imgDiamantes,imgJoias,imgEspada;
var colecaoTesouros = 0;
var dinheiroG,diamantesG,joiasG,grupoEspada;

//Estados de jogo
var JOGAR=1;
var ENCERRAR=0;
var estadoJogo=1;

function preload(){
  imgCaminho = loadImage("Road.png");
  imgMenino = loadAnimation("eye tras (1).png","eye tras (2).png");
  imgDinheiro = loadImage("SilverJeff.png");
  imgDiamantes = loadImage("DiamondJeff.png");
  imgJoias = loadImage("JeffDourado.png");
  imgEspada = loadImage("EvilJeff.png");
  imgFim =loadImage("gameOver.png");
  
}

function setup(){
  
  createCanvas(400,600);
// movendo o plano de fundo
caminho=createSprite(200,200);
caminho.addImage(imgCaminho);
caminho.velocityY = 4;
  
fim = createSprite(200,300, 30,30)
fim.addImage(imgFim)
fim.visible=false

//criando o menino correndo
menino = createSprite(70,580,20,20);
menino.addAnimation("SahilRunning",imgMenino);
menino.scale=0.35
  

  
  
dinheiroG=new Group();
diamantesG=new Group();
joiasG=new Group();
grupoEspada=new Group();

}

function draw() {

  if(estadoJogo===JOGAR){
  background(0);
  menino.x = World.mouseX;
  
  edges= createEdgeSprites();
  menino.collide(edges);
  
  //código para resetar o plano de fundo
  if(caminho.y > 400 ){
    caminho.y = height/3;
  }
  
    criarDinheiro();
    criarDiamantes();
    criarJoias();
    criarEspadas();

    if (dinheiroG.isTouching(menino)) {
      dinheiroG.destroyEach();
      colecaoTesouros=colecaoTesouros+50;
    }
    else if (diamantesG.isTouching(menino)) {
      diamantesG.destroyEach();
     colecaoTesouros=colecaoTesouros+200
      
    }else if(joiasG.isTouching(menino)) {
      joiasG.destroyEach();
     colecaoTesouros=colecaoTesouros+100
      
    }else{
      if(grupoEspada.isTouching(menino)) {
      estadoJogo=ENCERRAR;
        
        menino.addAnimation("SahilRunning",imgFim);
        menino.x=200;
        menino.y=300;
        menino.scale=0.6;
        
        dinheiroG.destroyEach();
        diamantesG.destroyEach();
        joiasG.destroyEach();
        grupoEspada.destroyEach();
        
        dinheiroG.setVelocityYEach(0);
        diamantesG.setVelocityYEach(0);
        joiasG.setVelocityYEach(0);
        grupoEspada.setVelocityYEach(0)
    }
  }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Tesouros: "+ colecaoTesouros,150,30);
  }

}




function criarDinheiro() {
  if (World.frameCount % 100 == 0) {
  var dinheiro = createSprite(Math.round(random(50, 350),0, 10, 10));
  dinheiro.addImage(imgDinheiro);
  dinheiro.scale=0.4;
  dinheiro.velocityY = 4;
  dinheiro.lifetime = 150;
  dinheiroG.add(dinheiro);
  }
}

function criarDiamantes() {
  if (World.frameCount % 150 == 0) {
  var diamantes = createSprite(Math.round(random(50, 350),0, 10, 10));
  diamantes.addImage(imgDiamantes);
  diamantes.scale=0.4;
  diamantes.velocityY = 4;
  diamantes.lifetime = 150;
  diamantesG.add(diamantes);
}
}

function criarJoias() {
  if (World.frameCount % 200 == 0) {
  var joias = createSprite(Math.round(random(50, 350),0, 10, 10));
  joias.addImage(imgJoias);
  estadodeJogo=0
  joias.scale=0.4;
  joias.velocityY = 4;
  joias.lifetime = 150;
  joiasG.add(joias);
  }
}

function criarEspadas(){
  if (World.frameCount % 250 == 0) {
  var espada = createSprite(Math.round(random(50, 350),0, 10, 10));
  espada.addImage(imgEspada);
  espada.scale=0.4;
  espada.velocityY = 4;
  espada.lifetime = 150;
  grupoEspada.add(espada);
  }
}