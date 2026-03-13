/**
 * MAIN.JS — Lógica global del sitio
 * Navbar, scroll, animaciones, Google Ads
 */
document.addEventListener('DOMContentLoaded', () => {

  // ── NAVBAR SCROLL ─────────────────────────────────────────
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  // ── MENÚ HAMBURGUESA ──────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navMobile = document.getElementById('navMobile');
  if (hamburger && navMobile) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      navMobile.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    navMobile.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navMobile.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // ── LINK ACTIVO EN NAVBAR ─────────────────────────────────
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a[href]').forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // ── ANIMACIONES FADE-IN AL SCROLL ─────────────────────────
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(el => {
    observer.observe(el);
  });

  // ── AÑO EN FOOTER ─────────────────────────────────────────
  const yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ── TOPBAR PROMOCIONAL Y WHATSAPP FLOTANTE ────────────────
  if (CONFIG.TOPBAR_TEXT) {
    const topbar = document.createElement('div');
    topbar.className = 'topbar-promo';
    topbar.innerHTML = CONFIG.TOPBAR_TEXT;
    document.body.prepend(topbar);
  } else {
    const nav = document.getElementById('navbar');
    if(nav) nav.style.top = '0'; // Eliminar gap si no hay topbar
  }

  if (CONFIG.ENABLE_WA_FLOAT_BTN && CONFIG.WHATSAPP_NUMBER) {
    const waFloat = document.createElement('a');
    waFloat.className = 'wa-float-btn fade-in';
    const waPhone = CONFIG.WHATSAPP_NUMBER.replace(/[^0-9]/g, '');
    const waMsg = encodeURIComponent('¡Hola Grecia! Necesito asistencia desde tu tienda en línea 🏍️');
    waFloat.href = `https://wa.me/${waPhone}?text=${waMsg}`;
    waFloat.target = '_blank';
    waFloat.rel = 'noopener';
    waFloat.setAttribute('aria-label', 'Contactar por WhatsApp');
    waFloat.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413.074-.124-.272-.198-.57-.347z"/></svg>`;
    document.body.appendChild(waFloat);
    setTimeout(() => waFloat.classList.add('visible'), 500);
  }

  // ── GOOGLE ADS INIT ───────────────────────────────────────
  if (CONFIG.GOOGLE_ADS_ID) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${CONFIG.GOOGLE_ADS_ID}`;
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);
  } else {
    // Fallback visual para banners de ads
    document.querySelectorAll('.ads-banner').forEach(el => {
      el.innerHTML = '<span>📢 Espacio publicitario · Google Ads</span>';
    });
  }

  // ── COPY AL PORTAPAPELES ──────────────────────────────────
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.copy;
      if (!target) return;
      navigator.clipboard.writeText(target).then(() => {
        const original = btn.textContent;
        btn.textContent = '✓ Copiado';
        setTimeout(() => btn.textContent = original, 2000);
      });
    });
  });

  // ── LIGHTBOX ──────────────────────────────────────────────
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    const lbImg = document.getElementById('lightboxImg');
    const lbClose = document.getElementById('lightboxClose');

    document.querySelectorAll('[data-lightbox]').forEach(el => {
      el.addEventListener('click', () => {
        lbImg.src = el.dataset.lightbox || el.src || el.querySelector('img')?.src;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }
    lbClose?.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
  }

  // ── BACK TO TOP ───────────────────────────────────────────
  const btt = document.getElementById('backToTop');
  if (btt) {
    window.addEventListener('scroll', () => {
      btt.style.opacity = window.scrollY > 400 ? '1' : '0';
      btt.style.pointerEvents = window.scrollY > 400 ? 'all' : 'none';
    });
    btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    btt.style.opacity = '0';
    btt.style.transition = 'opacity 0.3s ease';
  }

});
