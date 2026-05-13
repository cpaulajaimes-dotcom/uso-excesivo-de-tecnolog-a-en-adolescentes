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

  /* HISTORIAL */

  let historial =
  document.getElementById("historial");

  if(historial){

    historial.innerHTML =
    localStorage.getItem("ultimoResultado") ||
    "Aún no hay resultados guardados.";

  }

  /* BOTON ANALIZAR */

  const btn =
  document.getElementById("btnAnalizar");

  if(btn){

    btn.addEventListener("click", analizar);

  }

});

/* ===================== */
/* FUNCION ANALIZAR */
/* ===================== */

function analizar(){

  let puntos = 0;

  /* PREGUNTA 1 */

  let p1 =
  document.getElementById("p1");

  if(p1){

    if(p1.selectedIndex === 0) puntos += 1;
    if(p1.selectedIndex === 1) puntos += 2;
    if(p1.selectedIndex === 2) puntos += 3;
    if(p1.selectedIndex === 3) puntos += 4;
    if(p1.selectedIndex === 4) puntos += 5;

  }

  /* PREGUNTA 2 */

  let p2 =
  document.getElementById("p2");

  if(p2){

    if(p2.selectedIndex === 0) puntos += 1;
    if(p2.selectedIndex === 1) puntos += 5;
    if(p2.selectedIndex === 2) puntos += 3;

  }

  /* PORCENTAJE */

  porcentajeFinal =
  Math.round((puntos / 10) * 100);

  /* ELEMENTOS */

  let barra =
  document.getElementById("nivel");

  let mensaje =
  document.getElementById("mensaje");

  let simbolo =
  document.getElementById("simbolo");

  let detalle =
  document.getElementById("detalle");

  let porcentaje =
  document.getElementById("porcentaje");

  let tiempoPerdido =
  document.getElementById("tiempoPerdido");

  let recomendacion =
  document.getElementById("recomendacion");

  /* ANIMACION CELULAR */

  simbolo.style.transform = "scale(0.7)";
  simbolo.style.opacity = "0.4";

  setTimeout(()=>{

    simbolo.style.transition = "0.5s";
    simbolo.style.transform = "scale(1)";
    simbolo.style.opacity = "1";

  },100);

  /* BARRA */

  if(barra){

    barra.style.width = "0%";

    setTimeout(()=>{

      barra.style.width =
      porcentajeFinal + "%";

      /* BAJO */

      if(porcentajeFinal <= 35){

        barra.style.background =
        "linear-gradient(90deg,#22c55e,#4ade80)";

      }

      /* MEDIO */

      else if(porcentajeFinal <= 70){

        barra.style.background =
        "linear-gradient(90deg,#f59e0b,#facc15)";

      }

      /* ALTO */

      else{

        barra.style.background =
        "linear-gradient(90deg,#ef4444,#f87171)";

      }

    },120);

  }

  /* RESULTADOS */

  if(porcentajeFinal <= 35){

    mensaje.innerHTML =
    "RIESGO BAJO";

    mensaje.style.color =
    "#22c55e";

    simbolo.innerHTML =
    '<i class="fa-solid fa-face-smile"></i>';

    simbolo.style.color =
    "#22c55e";

    detalle.innerHTML =
    "Tu uso de tecnología parece equilibrado y saludable.";

    tiempoPerdido.innerHTML =
    "Tu nivel de distracción digital es bajo.";

    recomendacion.innerHTML =
    "Continúa manteniendo buenos hábitos digitales.";

    resultadoFinal =
    "Riesgo Bajo";

  }

  else if(porcentajeFinal <= 70){

    mensaje.innerHTML =
    "RIESGO MEDIO";

    mensaje.style.color =
    "#f59e0b";

    simbolo.innerHTML =
    '<i class="fa-solid fa-mobile-screen"></i>';

    simbolo.style.color =
    "#f59e0b";

    detalle.innerHTML =
    "La tecnología comienza a afectar tu concentración.";

    tiempoPerdido.innerHTML =
    "Existe una distracción moderada causada por el celular.";

    recomendacion.innerHTML =
    "Intenta reducir el tiempo en redes sociales.";

    resultadoFinal =
    "Riesgo Medio";

  }

  else{

    mensaje.innerHTML =
    "RIESGO ALTO";

    mensaje.style.color =
    "#ef4444";

    simbolo.innerHTML =
    '<i class="fa-solid fa-triangle-exclamation"></i>';

    simbolo.style.color =
    "#ef4444";

    detalle.innerHTML =
    "El uso excesivo de tecnología afecta tu atención.";

    tiempoPerdido.innerHTML =
    "Tu nivel de distracción digital es elevado.";

    recomendacion.innerHTML =
    "Se recomienda establecer límites de uso.";

    resultadoFinal =
    "Riesgo Alto";

  }

  /* CONTADOR */

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
        "Nivel detectado: " +
        actual + "%";

      }

    }

  },15);

  /* GUARDAR */

  localStorage.setItem(
    "ultimoResultado",
    resultadoFinal +
    " (" +
    porcentajeFinal +
    "%)"
  );

}

/* ===================== */
/* ESTADISTICAS */
/* ===================== */

function calcularEstadisticas(
  valores,
  frecuencias
){

  let total =
  frecuencias.reduce((a,b)=>a+b,0);

  let datosExpand = [];

  valores.forEach((v,i)=>{

    for(let j=0;j<frecuencias[i];j++){

      datosExpand.push(v);

    }

  });

  let media =
  datosExpand.reduce((a,b)=>a+b,0)/total;

  datosExpand.sort((a,b)=>a-b);

  let mitad =
  Math.floor(total/2);

  let mediana =
  total % 2 === 0
  ? (datosExpand[mitad-1] + datosExpand[mitad]) / 2
  : datosExpand[mitad];

  let maxFrecuencia =
  Math.max(...frecuencias);

  let modaIndices = [];

  frecuencias.forEach((f,i)=>{

    if(f === maxFrecuencia){

      modaIndices.push(valores[i]);

    }

  });

  let moda =
  modaIndices.join(", ");

  let varianza =
  datosExpand.reduce((a,b)=>
  a + Math.pow(b-media,2),0)/total;

  let desviacion =
  Math.sqrt(varianza);

  return{

    media,
    mediana,
    moda,
    desviacion

  };

}

/* ===================== */
/* RECUADROS */
/* ===================== */

function agregarRecuadrosEstadisticos(
  gridSelector,
  resultados
){

  const grid =
  document.querySelector(gridSelector);

  if(!grid) return;

  grid.innerHTML += `

  <div class="estadistica-box"
  data-tooltip="Promedio de horas de uso">

    <h4>Media</h4>
    <p>${resultados.media.toFixed(2)}</p>

  </div>

  <div class="estadistica-box"
  data-tooltip="Valor central de los datos">

    <h4>Mediana</h4>
    <p>${resultados.mediana}</p>

  </div>

  <div class="estadistica-box"
  data-tooltip="Valor más repetido">

    <h4>Moda</h4>
    <p>${resultados.moda}</p>

  </div>

  <div class="estadistica-box"
  data-tooltip="Variabilidad">

    <h4>Desviación estándar</h4>
    <p>${resultados.desviacion.toFixed(2)}</p>

  </div>

  `;

}