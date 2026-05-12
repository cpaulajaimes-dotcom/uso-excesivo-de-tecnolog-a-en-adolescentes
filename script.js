let porcentajeFinal = 0;
let resultadoFinal = "";
let pomodoroInterval = null;

/* ===================== */
/* FRASES */
/* ===================== */

const frases = [
"El enfoque se construye cada día.",
"Tu meta vale más que una notificación.",
"Cada minuto concentrado suma.",
"La disciplina vence la distracción.",
"Pequeños hábitos crean grandes resultados.",
"Hoy enfócate más que ayer."
];

/* ===================== */
/* INICIO */
/* ===================== */

document.addEventListener("DOMContentLoaded", function(){

let frase = document.getElementById("frase");

if(frase){
frase.innerHTML =
frases[Math.floor(Math.random()*frases.length)];
}

/* ===================== */
/* HISTORIAL */
/* ===================== */

let historial = document.getElementById("historial");

if(historial){
historial.innerHTML =
localStorage.getItem("ultimoResultado") ||
"Aún no hay resultados guardados.";
}

cargarPlan();
actualizarPlan();
actualizarPomodoro();

});

/* ===================== */
/* ENCUESTA */
/* ===================== */

function analizar(){

let puntos = 0;

for(let i=1;i<=10;i++){

let p = document.getElementById("p"+i);

if(p){

if(p.selectedIndex === 0) puntos += 1;
if(p.selectedIndex === 1) puntos += 2;
if(p.selectedIndex === 2) puntos += 3;

}

}

porcentajeFinal =
Math.round((puntos / 30) * 100);

let barra = document.getElementById("nivel");
let mensaje = document.getElementById("mensaje");
let simbolo = document.getElementById("simbolo");
let detalle = document.getElementById("detalle");
let porcentaje = document.getElementById("porcentaje");

if(barra){

barra.style.width = "0%";

setTimeout(()=>{

barra.style.width = porcentajeFinal + "%";

if(puntos <= 15){
barra.style.background = "#22c55e";
}
else if(puntos <= 22){
barra.style.background = "#f59e0b";
}
else{
barra.style.background = "#ef4444";
}

},80);

}

if(puntos <= 15){

mensaje.innerHTML = "RIESGO BAJO";
mensaje.style.color = "#22c55e";

simbolo.innerHTML =
'<i class="fa-solid fa-circle-check"></i>';

simbolo.style.color = "#22c55e";

detalle.innerHTML =
"Buen manejo digital. Mantén tus hábitos.";

resultadoFinal = "Riesgo Bajo";

}

else if(puntos <= 22){

mensaje.innerHTML = "RIESGO MEDIO";
mensaje.style.color = "#f59e0b";

simbolo.innerHTML =
'<i class="fa-solid fa-triangle-exclamation"></i>';

simbolo.style.color = "#f59e0b";

detalle.innerHTML =
"La tecnología empieza a afectar tu enfoque.";

resultadoFinal = "Riesgo Medio";

}

else{

mensaje.innerHTML = "RIESGO ALTO";
mensaje.style.color = "#ef4444";

simbolo.innerHTML =
'<i class="fa-solid fa-shield-halved"></i>';

simbolo.style.color = "#ef4444";

detalle.innerHTML =
"Debes reducir distracciones cuanto antes.";

resultadoFinal = "Riesgo Alto";

}

let actual = 0;

clearInterval(window.contadorResultado);

window.contadorResultado = setInterval(()=>{

if(actual >= porcentajeFinal){

clearInterval(window.contadorResultado);

}
else{

actual++;

if(porcentaje){

porcentaje.innerHTML =
"Nivel detectado: " + actual + "%";

}

}

},10);

localStorage.setItem(
"ultimoResultado",
resultadoFinal + " (" + porcentajeFinal + "%)"
);

}

/* ===================== */
/* PLAN 7 DÍAS */
/* ===================== */

function guardarPlan(){

let checks =
document.querySelectorAll(".check-plan");

let datos = [];

checks.forEach(c=>{
datos.push(c.checked);
});

localStorage.setItem(
"plan",
JSON.stringify(datos)
);

actualizarPlan();

}

function cargarPlan(){

let checks =
document.querySelectorAll(".check-plan");

let guardado =
JSON.parse(localStorage.getItem("plan")) || [];

checks.forEach((c,i)=>{
c.checked = guardado[i] || false;
});

}

function actualizarPlan(){

let checks =
document.querySelectorAll(".check-plan");

if(!checks.length) return;

let marcados = 0;

checks.forEach(c=>{
if(c.checked) marcados++;
});

let progreso =
Math.round((marcados / checks.length) * 100);

let barraPlan =
document.getElementById("nivelPlan");

let texto =
document.getElementById("textoPlan");

let mensaje = "";

if(barraPlan){

barraPlan.style.width = progreso + "%";

if(progreso <= 40){
barraPlan.style.background = "#ef4444";
}
else if(progreso <= 70){
barraPlan.style.background = "#f59e0b";
}
else{
barraPlan.style.background = "#22c55e";
}

}

if(progreso === 0){
mensaje = "Empieza hoy 🚀";
}
else if(progreso < 30){
mensaje = "Buen inicio 💪";
}
else if(progreso < 60){
mensaje = "Vas progresando 🔥";
}
else if(progreso < 90){
mensaje = "Casi lo logras ⚡";
}
else if(progreso < 100){
mensaje = "Último paso 🎯";
}
else{
mensaje = "¡LO LOGRASTE! 🏆";
}

if(texto){

texto.innerHTML =
progreso === 100
? mensaje
: progreso + "% completado - " + mensaje;

}

if(progreso === 100){

if(document.querySelector(".popup-final")) return;

let fondo = document.createElement("div");
fondo.className = "fondo-popup";

let popup = document.createElement("div");
popup.className = "popup-final";

popup.innerHTML = `

<i class="fa-solid fa-trophy"></i>

<h2>¡Felicidades!</h2>

<p>
Completaste exitosamente los 7 días del plan.
<br><br>
Demostraste disciplina, enfoque y compromiso con tus hábitos digitales.
<br><br>
Sigue así 🚀
</p>

<button onclick="cerrarPopup()">
Cerrar
</button>

`;

document.body.appendChild(fondo);
document.body.appendChild(popup);

}

}

function cerrarPopup(){

let popup =
document.querySelector(".popup-final");

let fondo =
document.querySelector(".fondo-popup");

if(popup){
popup.remove();
}

if(fondo){
fondo.remove();
}

}
