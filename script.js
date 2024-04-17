
let timeLeft = 15; // 2 minutes in seconds
const timerText = document.getElementById('timer-text');
const timer1 = setInterval(() => {
  timeLeft--;
  const minutes = Math.floor(timeLeft / 60);
	const seconds = timeLeft % 60;
	timerText.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;


  if (timeLeft === 0) {
    
    clearInterval(timer1);
    alert('aplasta aqui para que vea tu regalo!'); // Mensaje al finalizar el cronómetro
    window.location.href = 'index.html';
  }
}, 1000);
let slideIndex = 0;
const slides = document.getElementsByClassName("slide");

function showSlides() {
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    slides[slideIndex-1].style.display = "block";
    setTimeout(showSlides, 4000); // Cambia la imagen cada 4 segundos
}

showSlides();
//particulas animaciones

function openInvitation() {
  const container = document.querySelector('.invitation-container');
  container.classList.add('open');
  setTimeout(() => {
      document.querySelector('.inside').style.display = 'block';
  }, 250);
}
 // ahorcado juego
 // // Abecedario
const espacioAbecedario=document.querySelector('.letras-abecedario');
const abc=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

// Palabra a averiguar
var palabra = "";
var guion;
//Imagen que va a cambiar
const divAhorcado = clase('.div-imagen-ahrcado');
const imagenAhorcado= clase('.imagen-ahorcado');
// Num aleatorio
var random;
// Elemento html de la palabra
var parrafoPalabra = clase("#palabra-a-adivinar");
// Contador de intentos
var intentos = clase('.intentos');
const intentosText=clase('.intentos-text');
var conteoAciertos=0;
var conteoVidas=5;
// Boton de reset
const nuevoAhorcado = clase('.nuevo-juego');
// Botones pista y volver
const btnPista = clase('.btn-pista');
const btnDesistir = clase('.volver-ahorcado');
var intentosFin = clase('.intentos-finjuego');
var spanPista = clase('.span-pista');
// Abecedario
var letrasAbecedario;
let botonLetra;
var botonLetraApretada;
var letra;


const palabras=[['Ramo','Accesorio de flores de la novia'],['Vestido','Prenda, normalmente blanca, que usa la novia'],['Invitados','Si la fiesta es grande, hay muchos'],['Musica','Nos hace bailar'],['Catering','Se encarga de preparar los alimentos'],['Zapatos','Nancy esta usando unos blancos y Kevin unos negros'],['Flores','Decoracion natural'],['Globos','Decoracion ovalada que se infla'],['Juez','Quien casa a los novios en el registro civil'],['Matrimonio','Los novios pasan a ser un...'],['Baliar','Hay música y nos ponemos a...'],['Maquillaje','Delineador, labial, base, sombras...'],['Peinado','Puede ser suelto, con trenzas, con rodete...'],['Velo','Accesorio para la cabeza de la novia'],['Anillos','Objeto simbolo de union y matrimonio'],['Recepcion','Primeros momentos de la fiesta'],['Bebidas','Gaseosas, vinos, cervezas'],['Esmoquin','Vestimenta del novio'],['Cuñados','Los hermanos de Kevin son los ... de Nancy'],['Propuesta','Cuando el novio ofrece el anillo a la novia'],['Ezequiel','Segundo nombre del novio'],['Arroz','Se le lanza a los novios en símbolo de abundancia'],['Moño','Accesorio bordó del novio'],['Souvenir','Al finalizar la fiesta, los invitados se llevan uno'],['Libreta','Los novios firman la ... de familia'],['Familia','Ahora los novios son una...'],['Tragos','Los adultos van a la barra a buscarlos toda la noche'],['Brindis','Tradición de chocar las copas'],['Vals','Primer baile tradicional del matrimonio'],['Katherine','Segundo nombre de la novia'],['Fotografo','Persona contratada para sacar fotos'],['Barman','Persona que prepara tragos en la barra'],['Enamorados','Los novios se casan porque están...']];

btnInicialJuegoAhorcado.onclick= function(){iniciarAhorcado(); sectionInicial.style.display='none'; sectionJuegoAhorcado.style.display='flex';}
nuevoAhorcado.onclick=function(){espacioAbecedario.innerHTML='',iniciarAhorcado()};


function generarAbecedario(){
    for(let i=0;i<abc.length;i++){
        botonLetra=document.createElement('button');
        botonLetra.setAttribute("id", "btn-letra");
        botonLetra.appendChild( document.createTextNode(abc[i]));
        espacioAbecedario.appendChild(botonLetra);
    }
}

function iniciarAhorcado(){
    generarAbecedario();
    parrafoPalabra.classList.remove('palabra-sola');
    letrasAbecedario = document.querySelectorAll('#btn-letra');
    conteoAciertos = 0;
    conteoVidas = 5;
    parrafoPalabra.innerHTML='';
    intentosText.textContent= ('Intentos restantes: ' + conteoVidas);
    imagenAhorcado.src='img/ahorcado5.png';
    for(i=0;i<letrasAbecedario.length;i++){
        letrasAbecedario[i].disabled=false;
    }
    
    // Para elegir un numero al azar segun la cantidad de palabras, redondeando hacia abajo para que no haya un numero de mas
    const numAzar= Math.floor(Math.random()*palabras.length);
    // La palabra ahora es un string del array, poniendo el indice segun el numero sorteado
    palabra=palabras[numAzar][0].toUpperCase();
    console.log(palabra);
    btnPista.disabled=true;
    spanPista.innerHTML = palabras[numAzar][1];
    console.log(palabras[numAzar][1]);
    spanPista.style.visibility='hidden';
    // Crear un guion por cada letra de la palabra
    for(let i = 0; i < palabra.length; i++){
        const espacioLetra = document.createElement('p');
        guion=document.createTextNode('_');
        espacioLetra.appendChild(guion);
        parrafoPalabra.appendChild(espacioLetra);
    }
    for (i=0; i<letrasAbecedario.length; i++){
        letrasAbecedario[i].onclick=letrasUsadas;
    }
}
//Dar pista y dehabilitar boton pista
btnPista.onclick=darPista;
function darPista(){
   spanPista.style.visibility='visible';
   btnPista.disabled=true;
}

// Funcion para saber que hacer cuando se toca un boton de letra
function letrasUsadas(event){
    
    botonLetraApretada=event.target;
    botonLetraApretada.disabled=true;
    letra=botonLetraApretada.innerHTML.toUpperCase();
    let acerto=false;
    for (i=0; i< palabra.length; i++){
        if (letra==palabra[i]){
            const guiones = document.querySelectorAll('#palabra-a-adivinar p');
            guiones[i].innerHTML=letra;
            conteoAciertos++;
            acerto=true;
        }
    }
    if (acerto==false){
        conteoVidas--;
        const source=`img/ahorcado${conteoVidas}.png`;
        imagenAhorcado.src=source;
        intentosText.textContent= ('Intentos restantes: ' + conteoVidas);
        if(conteoVidas==2){
            btnPista.disabled=false;
        }
    }
    if(conteoVidas==0){
        for (i=0; i< palabra.length; i++){
            const guiones = document.querySelectorAll('#palabra-a-adivinar p');
            guiones[i].innerHTML=palabra[i];
        }
        intentosText.textContent=('Fin del juego! La palabra era:');
        parrafoPalabra.classList.add('palabra-sola');
        gameOver();
    }else if(conteoAciertos==palabra.length){
        intentosText.textContent=('Felicitaciones, ganaste un punto!');
        imagenAhorcado.src='img/ahorcadoFin.png';
        gameOver();
        puntaje++;
    }
}
//Termino el juego, deshabilitar letras
function gameOver(){
    for(i=0;i<letrasAbecedario.length;i++){
        letrasAbecedario[i].disabled=true;
    }
    btnPista.disabled=true;
    spanPista.style.visibility='hidden';
}


// Desistir y volver al inicio
btnDesistir.onclick= desistir;
function desistir(){
    sectionInicial.style.display='flex';
    sectionMemo.style.display='none';
    sectionJuegoAhorcado.style.display='none';
    conteoErrores=6;
    pPuntaje.innerHTML=`Puntaje: ${puntaje}`;
    espacioAbecedario.innerHTML='';
}
// memo
const btnVolverMemo = clase('.volver-memo');
const tablaMemoria= clase('.tabla-memoria');
const pMovimientos= clase('.movimientos-memo');
const pAciertos= clase('.aciertos-memo');
const pTiempo = clase('.tiempo-memo');
const btnNuevoMemo= clase('.nuevo-memo');


var imgMostradas=0;
var imagenesMemo = ['<img src="img/Memo-1.png" width="80%">','<img src="img/Memo-2.png" width="80%">','<img src="img/Memo-3.png" width="80%">','<img src="img/Memo-4.png" width="80%">','<img src="img/Memo-5.png" width="80%">','<img src="img/Memo-6.png" width="80%">','<img src="img/Memo-7.png" width="80%">','<img src="img/Memo-8.png" width="80%">','<img src="img/Memo-9.png" width="70%">','<img src="img/Memo-10.png" width="80%">','<img src="img/Memo-1.png" width="80%">','<img src="img/Memo-2.png" width="80%">','<img src="img/Memo-3.png" width="80%">','<img src="img/Memo-4.png" width="80%">','<img src="img/Memo-5.png" width="80%">','<img src="img/Memo-6.png" width="80%">','<img src="img/Memo-7.png" width="80%">','<img src="img/Memo-8.png" width="80%">','<img src="img/Memo-9.png" width="70%">','<img src="img/Memo-10.png" width="80%">'];
var tarjeta1;
var tarjeta2;
var primerResultado;
var segundoResultado;
var movimientosMemo=0;
var aciertosMemo=0;
var tiempoMemo=false;
var timer=40;
var timerInicial=40;
var tiempoRegresivo;
var botones=[];

btnInicialJuegoMemoria.onclick= function(){sectionInicial.style.display='none'; sectionMemo.style.display='flex'; nuevoMemo(); imagenesMemo=imagenesMemo.sort(()=>{return Math.random()-0.5});}





function generarBotones(){
    for(let i=0;i<20;i++){
        botones.push(`
        <div class="div-btn-memo"><button class="btn-memo" id="${i}" onclick="mostrarImg(${i})"><img src="img/back-memo.png" width="80%" loading="lazy"></button></div class="div-btn-memo">
        `);
    }
    tablaMemoria.innerHTML = botones.join(" ")
}

function contarTiempo(){
    tiempoRegresivo = setInterval(()=>{
        timer--;
        pTiempo.innerHTML=`Tiempo: ${timer} segundos`;
        if(timer==0){
            clearInterval(tiempoRegresivo);
            bloquearTarjetas();
            pTiempo.innerHTML=`Te pasa andrea eres bot pvp o que miedoW! 😢`;
            btnNuevoMemo.style.visibility='visible';
        }
    },800);
}
function bloquearTarjetas(){
    for(let i=0;i<=19;i++){
        let tarjetaBloqueada=document.getElementById(i);
        tarjetaBloqueada.innerHTML = imagenesMemo[i];
        tarjetaBloqueada.disabled=true;
    }
}
function desbloquearTarjetas(){
    for(let i=0;i<=19;i++){
        let tarjetaDesbloqueada=document.getElementById(i);
        tarjetaDesbloqueada.innerHTML = '<img src="img/back-memo.png" width="80%">' ;
        tarjetaDesbloqueada.disabled=false;
    }
}

function mostrarImg(id){
    if(tiempoMemo == false){
        contarTiempo();
        tiempoMemo=true;
    }
    imgMostradas++;
    if(imgMostradas==1){
        tarjeta1 = document.getElementById(id);
        primerResultado = imagenesMemo[id]
        tarjeta1.innerHTML= primerResultado;
        tarjeta1.disabled=true;
    }else if (imgMostradas==2){
        
        tarjeta2 = document.getElementById(id);
        segundoResultado = imagenesMemo[id];
        tarjeta2.innerHTML=segundoResultado;
        tarjeta2.disabled=true; 
        movimientosMemo++;
        pMovimientos.innerHTML = `Movimientos: ${movimientosMemo}`;

        if(primerResultado==segundoResultado){
            imgMostradas=0;
            aciertosMemo++;
            pAciertos.innerHTML = `Aciertos: ${aciertosMemo}`;
            if(aciertosMemo==(imagenesMemo.length/2)){
                clearInterval(tiempoRegresivo);
                pAciertos.innerHTML='Ganaste esta ronda! Sumás 1 punto 🎉';
                pMovimientos.innerHTML=`Movimientos: ${movimientosMemo}.<br>Intentalo en ${movimientosMemo-1} 😉`;
                btnNuevoMemo.style.visibility='visible';
                pTiempo.innerHTML=`Tardaste ${timerInicial - timer} segundos`;
                puntaje++;
                tiempoMemo=false;
            }

        }else{
            setTimeout(()=>{
                tarjeta1.innerHTML='<img src="img/back-memo.png" width="80%">';
                tarjeta2.innerHTML='<img src="img/back-memo.png" width="80%">';
                tarjeta1.disabled=false;
                tarjeta2.disabled=false;
                imgMostradas =0;
            },800);
        }
    }
}


btnNuevoMemo.onclick= nuevoMemo;
function nuevoMemo(){
    for(let i=0;i<20;i++){
        botones.pop(`
        <div class="div-btn-memo"><button class="btn-memo" id="${i}" onclick="mostrarImg(${i})"><img src="img/back-memo.png" width="80%" loading="lazy"></button></div class="div-btn-memo">
        `);
    }
    generarBotones();
    imagenesMemo=imagenesMemo.sort(()=>{return Math.random()-0.5});
    console.log(imagenesMemo);
    imgMostradas=0;
    movimientosMemo=0;
    aciertosMemo=0;
    tiempoMemo=false;
    timer=40;
    pMovimientos.innerHTML = `Movimientos: ${movimientosMemo}`;
    pTiempo.innerHTML=`Tiempo: ${timer} segundos`;
    pAciertos.innerHTML='Aciertos: 0';
    btnNuevoMemo.style.visibility='hidden'
    desbloquearTarjetas();
}

btnVolverMemo.onclick= volverMemo;
function volverMemo(){
    sectionMemo.style.display='none';
    sectionJuegoAhorcado.style.display='none';
    sectionInicial.style.display='flex';
    pPuntaje.innerHTML=`Puntaje: ${puntaje}`;
    tiempoMemo=false;
    clearInterval(tiempoRegresivo);
    imgMostradas=0;
}
// inicio pantalla
function clase(str){
  return document.querySelector(str);
}
const sectionInicial= clase('.pantalla-inicial');
const btnInicialJuegoMemoria= clase('.btn-juego-memoria');
const btnInicialJuegoAhorcado= clase('.btn-juego-ahorcado');
const btnInicialJuegoQuiz= clase('.btn-juego-quiz');
const sectionJuegoAhorcado= clase('.section-juego-ahorcado');
const sectionMemo= clase('.section-juego-memoria');
const sectionJuegoQuiz= clase('.section-quiz-novios');
const sectionFinQuiz= clase('.fin-quiz');
const pPuntaje= clase('.puntaje-total');
const sectionSobre= clase('.section-sobre');
const pSobre= clase('.sobre-estos-juegos');
const btnVolverSobre= clase('.volver-sobre');
var puntaje=0;

pSobre.onclick= function(){
  sectionInicial.style.display='none';
  sectionSobre.style.display='flex';
};
btnVolverSobre.onclick= function(){    
  sectionInicial.style.display='flex';
  sectionSobre.style.display='none';
}


