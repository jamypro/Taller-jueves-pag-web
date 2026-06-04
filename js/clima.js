const API_KEY = "be0234c2ad567051dc4dfb09c75f28c2";
const CIUDAD = "Mocoa";
const PAIS = "CO";

const URL_API = `https://api.openweathermap.org/data/2.5/weather?q=${CIUDAD},${PAIS}&appid=${API_KEY}&units=metric&lang=es`;

const INTERVALO_ACTUALIZACION = 10 * 60 * 1000;

async function obtenerClima() {
  const contenedor = document.getElementById("contenidoClima");
  if (!contenedor) return;
  mostrarCargando(contenedor);
  try {
    const respuesta = await fetch(URL_API);
    if (!respuesta.ok) {
      if (respuesta.status === 401) {
        throw new Error("API key inválida. Revisa tu clave de OpenWeatherMap.");
      }
      if (respuesta.status === 404) {
        throw new Error(`Ciudad "${CIUDAD}" no encontrada.`);
      }
      throw new Error(`Error del servidor: ${respuesta.status}`);
    }
    const datos = await respuesta.json();
    mostrarClima(contenedor, datos);
  } catch (error) {
    console.error("Error al obtener el clima:", error.message);
    mostrarError(contenedor);
  }
}

function mostrarCargando(contenedor) {
  contenedor.innerHTML = `
    <div class="text-center py-3">
      <div class="spinner-carga mb-3"></div>
      <p class="text-muted small mb-0">Obteniendo clima actual...</p>
    </div>
  `;
}

function mostrarClima(contenedor, datos) {
  const temperatura = Math.round(datos.main.temp);
  const tempMin = Math.round(datos.main.temp_min);
  const tempMax = Math.round(datos.main.temp_max);
  const humedad = datos.main.humidity;
  const sensacion = Math.round(datos.main.feels_like);
  const descripcion = datos.weather[0].description;
  const codigoIcono = datos.weather[0].icon;
  const viento = Math.round(datos.wind.speed * 3.6);
  const ciudad = datos.name;
  const urlIcono = `https://openweathermap.org/img/wn/${codigoIcono}@2x.png`;
  let colorTemperatura;
  if (temperatura >= 28) colorTemperatura = "#c0392b";
  else if (temperatura <= 15) colorTemperatura = "#2980b9";
  else colorTemperatura = "var(--color-primario)";
  const etiquetaHora = document.getElementById("horaActualizacion");
  if (etiquetaHora) {
    const ahora = new Date();
    const horaFormateada = ahora.toLocaleTimeString("es-CO", {
      hour: "2-digit",
      minute: "2-digit",
    });
    etiquetaHora.textContent = `Actualizado a las ${horaFormateada}`;
  }
  contenedor.innerHTML = `
    <div class="d-flex align-items-center gap-3 mb-3">

      <img src="${urlIcono}"
           alt="Ícono del clima: ${descripcion}"
           class="animar-pulso"
           style="width: 70px; height: 70px;"
           onerror="this.style.display='none'">

      <div>
        <div class="clima-temperatura" style="color: ${colorTemperatura};">
          ${temperatura}°C
        </div>
        <div class="clima-descripcion">
          ${capitalizarTexto(descripcion)}
        </div>
        <div class="clima-ciudad">
          <i class="bi bi-geo-alt-fill me-1"></i>${ciudad}, Putumayo
        </div>
      </div>
    </div>

    <hr style="margin: 0.5rem 0; border-color: var(--color-borde);">

    <div class="row g-2 text-center mt-1">

      <div class="col-3">
        <div style="font-size: 1.2rem;">🌡️</div>
        <div style="font-size: 0.7rem; color: var(--color-texto); font-weight: 600;">
          ${sensacion}°C
        </div>
        <div style="font-size: 0.65rem; color: #7f8c8d;">Sensación</div>
      </div>

      <div class="col-3">
        <div style="font-size: 1.2rem;">💧</div>
        <div style="font-size: 0.7rem; color: var(--color-texto); font-weight: 600;">
          ${humedad}%
        </div>
        <div style="font-size: 0.65rem; color: #7f8c8d;">Humedad</div>
      </div>

      <div class="col-3">
        <div style="font-size: 1.2rem;">🔽</div>
        <div style="font-size: 0.7rem; color: #2980b9; font-weight: 600;">
          ${tempMin}°C
        </div>
        <div style="font-size: 0.65rem; color: #7f8c8d;">Mín.</div>
      </div>

      <div class="col-3">
        <div style="font-size: 1.2rem;">🔼</div>
        <div style="font-size: 0.7rem; color: #c0392b; font-weight: 600;">
          ${tempMax}°C
        </div>
        <div style="font-size: 0.65rem; color: #7f8c8d;">Máx.</div>
      </div>

    </div>

    <div class="mt-2 pt-2" style="border-top: 1px solid var(--color-borde);">
      <small class="text-muted">
        <i class="bi bi-wind me-1"></i>
        Viento: <strong>${viento} km/h</strong>
        &nbsp;|&nbsp;
        <i class="bi bi-droplet-half me-1"></i>
        Humedad: <strong>${humedad}%</strong>
      </small>
    </div>
  `;
}

function mostrarError(contenedor) {
  contenedor.innerHTML = `
    <div class="text-center py-3">

      <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">⛅</div>

      <p class="mb-1 fw-semibold" style="color: var(--color-primario);">
        No se pudo cargar el clima.
      </p>

      <p class="text-muted small mb-2">
        Intente más tarde o verifique su conexión a internet.
      </p>

      <button
        onclick="obtenerClima()"
        class="btn btn-sm"
        style="background-color: var(--color-primario); color: white; border-radius: 20px;"
        aria-label="Reintentar carga del clima">
        <i class="bi bi-arrow-clockwise me-1"></i>
        Reintentar
      </button>

      <div class="mt-3 p-2 rounded" style="background-color: var(--color-acento);">
        <small class="text-muted">
          <i class="bi bi-info-circle me-1"></i>
          Clima típico en Mocoa: <strong>22°C</strong>, tropical lluvioso.
        </small>
      </div>

    </div>
  `;
  const etiquetaHora = document.getElementById("horaActualizacion");
  if (etiquetaHora) {
    etiquetaHora.textContent = "Error al actualizar — intente más tarde";
  }
}

function capitalizarTexto(texto) {
  if (!texto) return "";
  return texto[0].toUpperCase() + texto.slice(1);
}

if (document.getElementById("contenidoClima")) {
  obtenerClima();
  setInterval(obtenerClima, INTERVALO_ACTUALIZACION);
  console.log(`🌤️ Widget del clima iniciado. Ciudad: ${CIUDAD}, ${PAIS}`);
  console.log(
    `⏰ Se actualizará automáticamente cada ${INTERVALO_ACTUALIZACION / 60000} minutos.`,
  );
  console.log(
    "💡 Si ves errores de API, recuerda reemplazar TU_API_KEY en clima.js",
  );
}
