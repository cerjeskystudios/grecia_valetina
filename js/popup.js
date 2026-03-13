/**
 * POP-UP PUBLICITARIO — popup.js
 * Muestra un pop-up personalizable 1 vez por sesión
 */

(function initPopup() {
  const SESSION_KEY = 'gv_popup_shown';

  window.addEventListener('DOMContentLoaded', () => {
    if (typeof CONFIG !== 'undefined' && !CONFIG.ENABLE_POPUP_AD) return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const overlay = document.getElementById('popupOverlay');
    const closeBtn = document.getElementById('popupClose');
    const imgEl    = document.getElementById('popupImg');
    const linkEl   = document.getElementById('popupLink');

    if (!overlay || !imgEl || !linkEl) return;

    // Configurar desde CONFIG
    imgEl.src  = CONFIG.POPUP_AD_IMAGE;
    imgEl.alt  = CONFIG.POPUP_AD_ALT || 'Publicidad';
    linkEl.href = CONFIG.POPUP_AD_LINK || '#';

    setTimeout(() => {
      overlay.classList.add('open');
      sessionStorage.setItem(SESSION_KEY, '1');
    }, CONFIG.POPUP_DELAY_MS || 1800);

    // Cerrar con botón X
    closeBtn?.addEventListener('click', closePopup);

    // Cerrar al hacer clic en el overlay (fuera del box)
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closePopup();
    });

    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closePopup();
    });

    function closePopup() {
      overlay.classList.remove('open');
    }
  });
})();
