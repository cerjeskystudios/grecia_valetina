/**
 * CARRITO DE COMPRAS — cart.js
 * Gestión completa del carrito con persistencia en localStorage
 */

const Cart = (() => {
  const STORAGE_KEY = 'gv_cart';

  function getItems() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch { return []; }
  }

  function saveItems(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    dispatchUpdate();
  }

  function dispatchUpdate() {
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { count: getCount() } }));
  }

  function add(product) {
    const items = getItems();
    const existing = items.find(i => i.id === product.id);
    if (existing) {
      existing.qty += 1;
    } else {
      items.push({ ...product, qty: 1 });
    }
    saveItems(items);
  }

  function remove(id) {
    saveItems(getItems().filter(i => i.id !== id));
  }

  function updateQty(id, qty) {
    const items = getItems();
    const item = items.find(i => i.id === id);
    if (!item) return;
    if (qty <= 0) { remove(id); return; }
    item.qty = qty;
    saveItems(items);
  }

  function getCount() {
    return getItems().reduce((acc, i) => acc + i.qty, 0);
  }

  function getSubtotal() {
    return getItems().reduce((acc, i) => acc + i.price * i.qty, 0);
  }

  function clear() {
    localStorage.removeItem(STORAGE_KEY);
    dispatchUpdate();
  }

  return { add, remove, updateQty, getItems, getCount, getSubtotal, clear };
})();


// ── ACTUALIZAR BADGE DEL NAVBAR ────────────────────────────────
function updateCartBadge() {
  const badge = document.getElementById('cartBadge');
  if (!badge) return;
  const count = Cart.getCount();
  badge.textContent = count;
  badge.classList.toggle('visible', count > 0);
}

window.addEventListener('cartUpdated', updateCartBadge);
document.addEventListener('DOMContentLoaded', updateCartBadge);
