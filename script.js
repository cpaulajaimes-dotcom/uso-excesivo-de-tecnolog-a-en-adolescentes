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

  porcentajeFinal = Math.round((puntos / 30) * 100);

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
    simbolo.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    simbolo.style.color = "#22c55e";
    detalle.innerHTML = "Buen manejo digital. Mantén tus hábitos.";
    resultadoFinal = "Riesgo Bajo";
  }
  else if(puntos <= 22){
    mensaje.innerHTML = "RIESGO MEDIO";
    mensaje.style.color = "#f59e0b";
    simbolo.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i>';
    simbolo.style.color = "#f59e0b";
    detalle.innerHTML = "La tecnología empieza a afectar tu enfoque.";
    resultadoFinal = "Riesgo Medio";
  }
  else{
    mensaje.innerHTML = "RIESGO ALTO";
    mensaje.style.color = "#ef4444";
    simbolo.innerHTML = '<i class="fa-solid fa-shield-halved"></i>';
    simbolo.style.color = "#ef4444";
    detalle.innerHTML = "Debes reducir distracciones cuanto antes.";
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
        porcentaje.innerHTML = "Nivel detectado: " + actual + "%";
      }
    }
  },10);

  localStorage.setItem(
    "ultimoResultado",
    resultadoFinal + " (" + porcentajeFinal + "%)"
  );
}

/* ===================== */
/* ESTADISTICAS AUTOMATICAS */
/* ===================== */

function calcularEstadisticas(valores, frecuencias) {
  let total = frecuencias.reduce((a, b) => a + b, 0);

  // Expandir datos según frecuencia
  let datosExpand = [];
  valores.forEach((v, i) => {
    for (let j = 0; j < frecuencias[i]; j++) {
      datosExpand.push(v);
    }
  });

  // Media
  let media = datosExpand.reduce((a, b) => a + b, 0) / total;

  // Mediana
  datosExpand.sort((a, b) => a - b);
  let mitad = Math.floor(total / 2);
  let mediana = total % 2 === 0 
    ? (datosExpand[mitad - 1] + datosExpand[mitad]) / 2 
    : datosExpand[mitad];

  // Moda (puede haber varias)
  let maxFrecuencia = Math.max(...frecuencias);
  let modaIndices = [];
  frecuencias.forEach((f, i) => {
    if (f === maxFrecuencia) modaIndices.push(valores[i]);
  });
  let moda = modaIndices.join(", ");

  // Varianza y desviación estándar
  let varianza = datosExpand.reduce((a, b) => a + Math.pow(b - media, 2), 0) / total;
  let desviacion = Math.sqrt(varianza);

  return { media, mediana, moda, desviacion };
}

/* ===================== */
/* FUNCION PARA AGREGAR RECUEADROS CON TOOLTIP */
/* ===================== */

function agregarRecuadrosEstadisticos(gridSelector, resultados) {
  const grid = document.querySelector(gridSelector);
  if(!grid) return;

  grid.innerHTML += `
    <div class="estadistica-box" data-tooltip="Promedio de horas de uso">
      <h4>Media</h4><p>${resultados.media.toFixed(2)}</p>
    </div>
    <div class="estadistica-box" data-tooltip="Valor central de los datos">
      <h4>Mediana</h4><p>${resultados.mediana}</p>
    </div>
    <div class="estadistica-box" data-tooltip="Valor más repetido en la muestra">
      <h4>Moda</h4><p>${resultados.moda}</p>
    </div>
    <div class="estadistica-box" data-tooltip="Variabilidad de los datos">
      <h4>Desviación estándar</h4><p>${resultados.desviacion.toFixed(2)}</p>
    </div>
  `;
}
