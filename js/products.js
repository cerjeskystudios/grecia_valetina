/**
 * CATÁLOGO DE PRODUCTOS — products.js
 * Todos los productos del sitio y renderizado dinámico de tarjetas
 */

const PRODUCTS = [
  {
    id: 'casco-001',
    category: 'cascos',
    name: 'Casco Sport Black',
    desc: 'Casco integral con visor ahumado, ventilación superior y cierre de trinquete.',
    price: 85,
    currency: 'USD',
    badge: 'Nuevo',
    img: 'assets/img/products/test6.webp',
    images: ['assets/img/products/test1.webp', 'assets/img/products/test2.webp', 'assets/img/products/test3.webp', 'assets/img/products/test4.webp', 'assets/img/products/test5.webp', 'assets/img/products/test6.webp','assets/img/products/test7.webp'],
    tags: ['casco', 'integral', 'negro'],
  },
  {
    id: 'casco-002',
    category: 'cascos',
    name: 'Casco Modular GV Edition',
    desc: 'Casco modular abatible con pantalla solar interna. Edición especial Grecia Valentina.',
    price: 120,
    currency: 'USD',
    badge: 'Edición especial',
    img: 'assets/img/products/casco-modular.jpg',
    images: ['assets/img/products/casco-modular.jpg'],
    tags: ['casco', 'modular'],
  },
  {
    id: 'guante-001',
    category: 'guantes',
    name: 'Guantes Moto Pro',
    desc: 'Guantes de cuero con protecciones en nudillos y palma reforzada antideslizante.',
    price: 35,
    currency: 'USD',
    badge: null,
    img: 'assets/img/products/guantes-pro.jpg',
    images: ['assets/img/products/guantes-pro.jpg'],
    tags: ['guantes', 'cuero'],
  },
  {
    id: 'guante-002',
    category: 'guantes',
    name: 'Guantes Verano Mesh',
    desc: 'Guantes de malla transpirable para clima cálido con protección de nudillos.',
    price: 25,
    currency: 'USD',
    badge: 'Popular',
    img: 'assets/img/products/guantes-mesh.jpg',
    images: ['assets/img/products/guantes-mesh.jpg'],
    tags: ['guantes', 'verano'],
  },
  {
    id: 'forro-001',
    category: 'forros',
    name: 'Forro Impermeable Asiento',
    desc: 'Forro universal impermeable para asiento de moto. Resistente al agua y al sol.',
    price: 18,
    currency: 'USD',
    badge: null,
    img: 'assets/img/products/forro-asiento.jpg',
    images: ['assets/img/products/forro-asiento.jpg'],
    tags: ['forro', 'impermeable'],
  },
  {
    id: 'forro-002',
    category: 'forros',
    name: 'Forro Funda Moto Completo',
    desc: 'Funda completa para moto con protección UV, resistente a lluvia y polvo.',
    price: 28,
    currency: 'USD',
    badge: 'Oferta',
    img: 'assets/img/products/forro-completo.jpg',
    images: ['assets/img/products/forro-completo.jpg'],
    tags: ['forro', 'funda', 'uv'],
  },
  {
    id: 'chaqueta-001',
    category: 'chaquetas',
    name: 'Chaqueta Moto Textil',
    desc: 'Chaqueta con protecciones CE nivel 2 en codos, hombros y espalda. Multipockets.',
    price: 95,
    currency: 'USD',
    badge: null,
    img: 'assets/img/products/chaqueta-textil.jpg',
    images: ['assets/img/products/chaqueta-textil.jpg'],
    tags: ['chaqueta', 'protecciones'],
  },
  {
    id: 'accesorio-001',
    category: 'accesorios',
    name: 'Candado Disco Moto',
    desc: 'Candado de disco con alarma. Aviso sonoro de 110dB al detectar movimiento.',
    price: 22,
    currency: 'USD',
    badge: 'Recomendado',
    img: 'assets/img/products/candado-disco.jpg',
    images: ['assets/img/products/candado-disco.jpg'],
    tags: ['seguridad', 'candado'],
  },
  {
    id: 'accesorio-002',
    category: 'accesorios',
    name: 'Intercom Bluetooth BT-S3',
    desc: 'Intercomunicador Bluetooth para casco. Alcance 900m, música, GPS y llamadas.',
    price: 55,
    currency: 'USD',
    badge: 'Top ventas',
    img: 'assets/img/products/intercom-bt.jpg',
    images: ['assets/img/products/intercom-bt.jpg'],
    tags: ['bluetooth', 'intercom', 'tecnología'],
  },
];

const CATEGORIES = [
  { id: 'todos', label: 'Todos' },
  { id: 'cascos', label: '🪖 Cascos' },
  { id: 'guantes', label: '🧤 Guantes' },
  { id: 'forros', label: '🛡️ Forros' },
  { id: 'chaquetas', label: '🧥 Chaquetas' },
  { id: 'accesorios', label: '⚙️ Accesorios' },
];


/** Genera el HTML placeholder (SVG) cuando no hay imagen real */
function imgWithFallback(src, alt) {
  return `<img 
    src="${src}" 
    alt="${alt}" 
    loading="lazy"
    onerror="this.style.display='none';this.nextElementSibling.style.display='flex';"
  >
  <div style="display:none;align-items:center;justify-content:center;height:100%;background:var(--color-surface);color:var(--color-white-dim);font-size:3rem;">🏍️</div>`;
}

/** Renderiza tarjetas de producto en un contenedor */
function renderProducts(containerSelector, filterCategory = 'todos', limit = null) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  let filtered = filterCategory === 'todos'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === filterCategory);

  if (limit) filtered = filtered.slice(0, limit);

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1;">
        <div class="empty-state-icon">🏍️</div>
        <h3>No hay productos en esta categoría</h3>
        <p>Pronto tendremos novedades</p>
      </div>`;
    return;
  }

  container.innerHTML = filtered.map(p => `
    <div class="product-card fade-in" data-product-id="${p.id}">
      <div class="product-card-img-wrapper" onclick="openProductModal('${p.id}')" style="cursor:pointer;" title="Ver detalles">
        ${imgWithFallback(p.img, p.name)}
        ${p.badge ? `<span class="product-card-badge">${p.badge}</span>` : ''}
      </div>
      <div class="product-card-body">
        <div class="product-card-category">${p.category}</div>
        <div class="product-card-name">${p.name}</div>
        <div class="product-card-desc">${p.desc}</div>
        <div class="product-card-footer">
          <div class="product-card-price">$${p.price}</div>
          <div class="product-card-actions">
            <button 
              class="btn-icon btn-ghost"
              onclick="openProductModal('${p.id}')"
              aria-label="Ver detalles de ${p.name}"
              title="Ver detalles"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </button>
            <button 
              class="btn-icon btn-primary"
              onclick="addProductToCart('${p.id}'); event.stopPropagation();"
              aria-label="Agregar ${p.name} al carrito"
              title="Agregar al Carrito"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                <line x1="12" y1="10" x2="12" y2="16"/>
                <line x1="9" y1="13" x2="15" y2="13"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  // Activar animaciones
  requestAnimationFrame(() => {
    container.querySelectorAll('.fade-in').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 80);
    });
  });
}

/** Función global para agregar al carrito desde cualquier tarjeta */
function addProductToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  Cart.add(product);
  showToast(`✅ "${product.name}" agregado al carrito`);
}

/** Obtener producto por ID */
function getProductById(id) {
  return PRODUCTS.find(p => p.id === id) || null;
}

/** TOAST */
function showToast(message, duration = 3000) {
  let toast = document.getElementById('globalToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'globalToast';
    toast.className = 'toast';
    toast.innerHTML = `<span class="toast-icon">🛒</span><span class="toast-msg"></span>`;
    document.body.appendChild(toast);
  }
  toast.querySelector('.toast-msg').textContent = message;
  toast.classList.add('show');
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => toast.classList.remove('show'), duration);
}

/** MODAL DE PRODUCTO (QUICK VIEW) */
let productModalInitialized = false;

function initProductModal() {
  if (productModalInitialized) return;
  const modalHTML = `
  <div class="product-modal-overlay" id="pmOverlay" role="dialog" aria-modal="true">
    <div class="product-modal-box">
      <button class="product-modal-close" id="pmClose" aria-label="Cerrar">✕</button>
      <div class="product-modal-content" id="pmContent"></div>
    </div>
  </div>`;
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  productModalInitialized = true;

  document.getElementById('pmClose').addEventListener('click', closeProductModal);
  document.getElementById('pmOverlay').addEventListener('click', (e) => {
    if (e.target.id === 'pmOverlay') closeProductModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProductModal();
  });
}

function closeProductModal() {
  const overlay = document.getElementById('pmOverlay');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
}

function openProductModal(productId) {
  initProductModal();
  const product = getProductById(productId);
  if (!product) return;

  const content = document.getElementById('pmContent');

  // Galería de imágenes (si product.images está definido y es array)
  const images = (product.images && product.images.length > 0) ? product.images : [product.img];
  const thumbsHTML = images.length > 1 ? `
    <div class="pm-thumbnails">
      ${images.map((img, idx) => `
        <img src="${img}" class="pm-thumb ${idx === 0 ? 'active' : ''}" onclick="changePmImg(this, '${img}')" alt="Miniatura">
      `).join('')}
    </div>
  ` : '';

  // Tags HTML
  const tagsHTML = product.tags ? `
    <div class="pm-tags">
      ${product.tags.map(t => `<span class="pm-tag">#${t}</span>`).join('')}
    </div>
  ` : '';

  content.innerHTML = `
    <div class="pm-gallery">
      <div class="pm-main-img-wrapper" id="pmZoomWrapper" onmousemove="zoomPmImg(event)" onmouseleave="resetPmZoom()">
        <img id="pmMainImg" src="${images[0]}" alt="${product.name}" 
          onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
        <div style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;background:var(--color-surface);color:var(--color-white-dim);font-size:4rem;">🏍️</div>
        ${product.badge ? `<span class="pm-badge">${product.badge}</span>` : ''}
      </div>
      ${thumbsHTML}
    </div>
    <div class="pm-info">
      <div class="pm-category">${product.category}</div>
      <h2 class="pm-title">${product.name}</h2>
      <div class="pm-price">$${product.price.toFixed(2)}</div>
      <p class="pm-desc">${product.desc}</p>
      ${tagsHTML}
      <hr style="border:none;border-top:1px solid var(--color-border);margin:1.5rem 0;">
      
      <div class="pm-actions">
        <button class="btn btn-primary pm-add-btn" onclick="addModalProductToCart('${product.id}')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          Agregar al Carrito
        </button>
      </div>

      <div class="pm-trust-badges">
        <div class="trust-badge"><span class="icon">🛡️</span> Garantía de calidad</div>
        <div class="trust-badge"><span class="icon">🚚</span> Envíos a todo el país</div>
        <div class="trust-badge"><span class="icon">🔒</span> Compra 100% Segura</div>
      </div>
    </div>
  `;

  document.getElementById('pmOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

window.changePmImg = function (thumbEl, src) {
  document.getElementById('pmMainImg').src = src;
  document.querySelectorAll('.pm-thumb').forEach(el => el.classList.remove('active'));
  thumbEl.classList.add('active');
};

window.addModalProductToCart = function (productId) {
  addProductToCart(productId);
  closeProductModal();
};

window.zoomPmImg = function(e) {
  const wrapper = document.getElementById('pmZoomWrapper');
  const img = document.getElementById('pmMainImg');
  if(!wrapper || !img) return;
  const rect = wrapper.getBoundingClientRect();
  const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
  const yPercent = ((e.clientY - rect.top) / rect.height) * 100;
  img.style.transformOrigin = `${xPercent}% ${yPercent}%`;
  img.style.transform = 'scale(2)';
};

window.resetPmZoom = function() {
  const img = document.getElementById('pmMainImg');
  if(img) {
    img.style.transform = 'scale(1)';
    setTimeout(() => { img.style.transformOrigin = 'center center'; }, 150);
  }
};
