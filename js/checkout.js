/**
 * CHECKOUT — checkout.js
 * Lógica de envío de pedido por WhatsApp y correo
 */

function buildOrderMessage(cartItems, subtotal, customerData, referencia = '') {
  const lines = cartItems.map(item =>
    `• ${item.name} x${item.qty} — $${(item.price * item.qty).toFixed(2)}`
  ).join('\n');

  const total = subtotal.toFixed(2);
  const date = new Date().toLocaleDateString('es-VE', { day:'2-digit', month:'2-digit', year:'numeric' });
  const time = new Date().toLocaleTimeString('es-VE', { hour:'2-digit', minute:'2-digit' });

  let msg = `🏍️ *NUEVO PEDIDO — Grecia Valentina*\n`;
  msg += `📅 ${date} ${time}\n\n`;
  msg += `👤 *Cliente:* ${customerData.nombre} ${customerData.apellido}\n`;
  msg += `📞 *Teléfono:* ${customerData.telefono}\n`;
  msg += `📍 *Ciudad/Dirección:* ${customerData.ciudad}\n\n`;
  msg += `🛒 *Productos:*\n${lines}\n\n`;
  msg += `💰 *Total: $${total}*\n`;
  if (referencia) {
    msg += `\n🏦 *Referencia de pago:* ${referencia}\n`;
  }
  msg += `\n---\nEnviado desde graciavalentina.com`;
  return msg;
}

function sendOrderViaWhatsApp(message) {
  const phone = CONFIG.WHATSAPP_NUMBER.replace(/[^0-9]/g, '');
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

function sendOrderViaEmail(message, subtotal) {
  const subject = encodeURIComponent(`Nuevo Pedido — Grecia Valentina — $${subtotal.toFixed(2)}`);
  const body = encodeURIComponent(message);
  window.open(`mailto:${CONFIG.EMAIL_OWNER}?subject=${subject}&body=${body}`, '_blank');
}

function sendOrder(cartItems, subtotal, customerData, referencia = '') {
  const message = buildOrderMessage(cartItems, subtotal, customerData, referencia);
  sendOrderViaWhatsApp(message);
  setTimeout(() => sendOrderViaEmail(message, subtotal), 600);
  Cart.clear();
}
