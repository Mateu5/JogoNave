var diryJ, dirxJ, jog, velj, psjx, psjy;
var jogo;
var contBombas, painelContbombas;
var velT;
var tamTelaW, tamTelaH;
var frames;
var bombasTotal, velbomba;
var vidaPlaneta, tmpCriaBomba;
var ie, isom, barraPlaneta; 

document.onkeydown = teclaDw;
function teclaDw(e) {
  

 if (e.keyCode == 38) {
    //cima
    diryJ = -1;
  }else if (e.keyCode == 40) {
    //baixo
    diryJ = 1;
  }
  if (e.keyCode == 37) {
    //esquerda
    dirxJ = -1;
  } 
  else if (e.keyCode == 39) {
    //direita
    dirxJ = 1;
  } 

  if (e.keyCode == 32) {
    //espaço
    atira(psjx+37, psjy);
  }
}
document.onkeyup = teclaUp;
function teclaUp(f) {
  
  if ((f.keyCode == 38)|| (f.keyCode== 40)) {
    //cima
    diryJ = 0;
  }
  if ((f.keyCode == 37) || (f.keyCode == 39)) {
    //esquerda
    dirxJ = 0;
  }
  
}

function criaBomba(){
  if(jogo){
    var y = 0;
    var x = Math.random()*tamTelaW;
    var bomba = document.createElement("div");
    var att1 = document.createAttribute("class");
    var att2 = document.createAttribute("style");
    att1.value = "bomba";
    att2.value = "top: " + y + "px; left:" + x + "px;";
    bomba.setAttributeNode(att1);
    bomba.setAttributeNode(att2);
    document.body.appendChild(bomba);
    contBombas--;

  }

}

function controlaBomba(){
  bombasTotal = document.getElementsByClassName("bomba");
  var tam= bombasTotal.length;
  for(var i = 0; i < tam; i++){ 
    if(bombasTotal[i]){
      var pi= bombasTotal[i].offsetTop;
      pi+=velbomba;
      bombasTotal[i].style.top = pi+"px";
      if(pi>tamTelaH){
        vidaPlaneta-=10;
        criaExplosao(2,bombasTotal[i].offsetLeft,null);
        bombasTotal[i].remove();
      }
    }

  }

}

function atira(x, y){
  var t = document.createElement("div");
  var att1 = document.createAttribute("class");
  var att2 = document.createAttribute("style");
  att1.value = "tiroJog";
  att2.value = "top:" + y + "px; left:" + x + "px";
  t.setAttributeNode(att1);
  t.setAttributeNode(att2);
  document.body.appendChild(t);
}

function controleTiros(){
  var tiros = document.getElementsByClassName("tiroJog");
  var tam = tiros.length;
  for(var i = 0; i < tam; i++){
    if(tiros[i]){
      var pt = tiros[i].offsetTop;
      pt -= velT
      tiros[i].style.top = pt + "px";
      colisaoTiroBomba(tiros[i]);
      if(pt<0){
        tiros[i].remove();
      }
    }
  }
}

function colisaoTiroBomba(tiro){
  var tam = bombasTotal.length;
  for(var i = 0; i < tam; i++){
    if(bombasTotal[i]){
      if(
        (
          (tiro.offsetTop<=(bombasTotal[i].offsetTop+40))&&((tiro.offsetTop+6)>=(bombasTotal[i].offsetTop))
        )
        &&
        (
          (tiro.offsetLeft<=(bombasTotal[i].offsetLeft+40))&&
          ((tiro.offsetLeft+6)>=(bombasTotal[i].offsetLeft))
        )
      ){
        criaExplosao(1,bombasTotal[i].offsetLeft-25,bombasTotal[i].offsetTop);
        bombasTotal[i].remove();
        tiro.remove();
      }
    }
  }

}

function criaExplosao(tipo,x,y){// tipo 1 explosao ar tipo 2 explosao chao
  if(document.getElementById("explosao" + (ie-2))){
    document.getElementById("explosao"+(ie-2)).remove();
  }

  var explosao = document.createElement("div");
  var img = document.createElement("img");
  var som = document.createElement("audio")
  var att1 = document.createAttribute("class");
  var att2 = document.createAttribute("style");
  var att3 = document.createAttribute("id");
  // atributo para imagem
  var att4 = document.createAttribute("src");
  // atributo para audio
  var att5 = document.createAttribute("src");
  var att6 = document.createAttribute("id");

  att3.value = "explosao" + ie;
  if(tipo==1){
    att1.value = "explosaoAr";
    att2.value = "top: " + y + "px; left:" + x + "px;"
    att4.value = "nova_exCerta.gif?"+ new Date();
  }else{
    att1.value = "explosaoChao";
    att2.value = "top: " + (tamTelaH-59) + "px; left:" + (x-17) + "px;";
    att4.value = "explosao_chao.gif?" + new Date();
  }
  att5.value = "0000559.mp3?" + new Date();
  att6.value = "som"+isom;

  
  explosao.setAttributeNode(att1);
  explosao.setAttributeNode(att2);
  explosao.setAttributeNode(att3);
  img.setAttributeNode(att4);
  som.setAttributeNode(att5);
  som.setAttributeNode(att6);
  explosao.appendChild(img);
  explosao.appendChild(som);
  document.body.appendChild(explosao);
  document.getElementById("som"+isom).play();
  ie++;
  isom++;
  


}

function controlaJogador() {
  psjy += diryJ * velj;
  psjx += dirxJ * velj;
  jog.style.top = psjy + "px";
  jog.style.left = psjx + "px";
}

function gerenciaGame(){

}

function gameLoop() {
  if (jogo) {
    //funções de controle
    controlaJogador();
    controleTiros();
    controlaBomba();
  }
  frames = requestAnimationFrame(gameLoop);
}

function inicia() {
  jogo = true;

  //ini tela
  tamTelaH = window.innerHeight;
  tamTelaW = window.innerWidth;

  //ini jogador
  dirxJ = diryJ = 0;

  psjx = tamTelaW / 2;
  psjy = tamTelaH / 2;
  velj = 8;
  velT = 8;
  jog = document.getElementById("naveJogar");
  jog.style.top = psjy + "px";
  jog.style.left = psjx + "px";
  // controle das bomba 
  clearInterval(tmpCriaBomba);
  contBombas = 150;
  
  velbomba = 3;
  tmpCriaBomba = setInterval(criaBomba, 1700);
  // controle explosao
  ie = 0;
  isom = 0;
  vidaPlaneta = 300;
  barraPlaneta = document.getElementById("barraPlaneta");
  barraPlaneta.style.width= vidaPlaneta+"px"
  gameLoop();
}

window.addEventListener("load", inicia);

document.addEventListener("keydown", teclaDw);
document.addEventListener("keyup", teclaUp);
