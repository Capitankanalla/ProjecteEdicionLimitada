// js/main.js

document.addEventListener('DOMContentLoaded', () => {
  // Configuración de idioma por defecto para el MVP
  const userLang = 'ca'; 
  initApp(userLang);
});

/**
 * Orquestrador principal de la SPA.
 * Se encarga de realizar las peticiones asíncronas para alimentar la interfaz.
 */
async function initApp(lang) {
  try {
    // 1. Petición asíncrona para obtener los TEXTOS del diccionario (Evita textos duros)
    const langResponse = await fetch('./json/lang.json');
    const translations = await langResponse.json();
    const texts = translations[lang];

    // 2. Petición asíncrona para obtener el MAPA DE FOTOS del JSON (Simula la API S3/R2)
    const photosResponse = await fetch('./json/photos.json');
    const photosMockArray = await photosResponse.json();

    // 3. Hidratación/Inyección de textos en los nodos semánticos del HTML
    document.getElementById('webTitle').textContent = texts.title;
    document.getElementById('heroImg').setAttribute('alt', texts.heroAlt);
    document.getElementById('uploadBtn').textContent = texts.uploadBtn;
    document.getElementById('uploadStatusMsg').textContent = texts.uploadStatusMsgReady;
    document.getElementById('mainFooter').textContent = texts.footerText;

    // 4. Hidratación dinámica de la cuadrícula y generación de modales nativos
    hydrateGallery(photosMockArray, texts.downloadText);
    
    // 5. Activación de la simulación del flujo de subida para el test con el usuario
    setupUploadSimulation(texts.uploadStatusMsgUploading, texts.uploadStatusMsgSuccess);

  } catch (error) {
    console.error("Error crític inicialitzant l'aplicació:", error);
  }
}

/**
 * Recorre el listado de imágenes, inyecta las celdas en el CSS Grid
 * y genera los contenedores flotantes usando la Popover API.
 */
function hydrateGallery(photos, downloadLabel) {
  const galleryGrid = document.getElementById('galleryGrid');
  if (!galleryGrid) return;
  galleryGrid.innerHTML = ''; // Limpieza de seguridad contra renderizados duplicados

  photos.forEach(photo => {
    // A) Celda de la galería: Botón semántico que actúa como disparador del popover
    const photoBtn = document.createElement('button');
    photoBtn.className = 'photo-item';
    photoBtn.setAttribute('popovertarget', `popover-${photo.id}`);

    const img = document.createElement('img');
    img.src = photo.url;
    img.alt = "Foto galeria";
    img.loading = 'lazy'; // Lazy loading nativo para optimizar el rendimiento móvil

    photoBtn.appendChild(img);
    galleryGrid.appendChild(photoBtn);

    // B) Lightbox flotante: Contenedor gestionado de forma nativa por la Popover API del navegador
    const lightbox = document.createElement('div');
    lightbox.id = `popover-${photo.id}`;
    lightbox.setAttribute('popover', '');
    lightbox.className = 'lightbox';

    lightbox.innerHTML = `
      <div class="lightbox-content">
        <button class="close-lightbox" popovertarget="popover-${photo.id}" popovertargetaction="hide">✕</button>
        <img src="${photo.url}" alt="Foto gran">
        <div class="lightbox-actions">
          <a href="${photo.url}" download="edicion-limitada-${photo.id}.webp" class="download-btn">
            📥 ${downloadLabel}
          </a>
        </div>
      </div>
    `;

    // Inyección al final del body para aislar por completo el z-index del modal del flujo de la página
    document.body.appendChild(lightbox);
  });
}

/**
 * Captura la interacción sobre el botón de control y simula los estados
 * de red (loading y success) para la fase de validación UX.
 */
function setupUploadSimulation(msgUploading, msgSuccess) {
  const uploadBtn = document.getElementById('uploadBtn');
  const statusMsg = document.getElementById('uploadStatusMsg');
  
  if (!uploadBtn || !statusMsg) return;

  uploadBtn.addEventListener('click', () => {
    // Modificación de estados en la interfaz para simular latencia de subida
    statusMsg.textContent = msgUploading;
    uploadBtn.disabled = true;
    uploadBtn.style.opacity = '0.5';

    setTimeout(() => {
      statusMsg.textContent = msgSuccess;
      uploadBtn.disabled = false;
      uploadBtn.style.opacity = '1';
    }, 2500); // Demora simulada de 2.5 segundos
  });
}
