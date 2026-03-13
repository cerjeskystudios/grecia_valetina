/**
 * ============================================================
 *  GRECIA VALENTINA — CONFIGURACIÓN CENTRAL DEL SITIO
 * ============================================================
 */
const CONFIG = {

  // ----------------------------------------------------------
  //  DATOS DE CONTACTO DEL NEGOCIO
  // ----------------------------------------------------------
  WHATSAPP_NUMBER: '+58XXXXXXXXXX',       // ← Ej: '+584141234567'
  EMAIL_OWNER:     'correo@ejemplo.com',  // ← Correo que recibirá los pedidos

  // ----------------------------------------------------------
  //  PAGO MÓVIL (se muestra en la página de checkout)
  // ----------------------------------------------------------
  PAGO_MOVIL: {
    banco:    'Banco XYZ',
    cedula:   'V-XXXXXXXX',
    telefono: '04XX-XXXXXXX',
    titular:  'Nombre Apellido',
  },

  // ----------------------------------------------------------
  //  GOOGLE ADS — Publisher ID de AdSense
  //  Dejar vacío ('') para deshabilitar. Ej: 'ca-pub-1234567890'
  // ----------------------------------------------------------
  GOOGLE_ADS_ID: '',

  // ----------------------------------------------------------
  //  POP-UP PUBLICITARIO
  // ----------------------------------------------------------
  ENABLE_POPUP_AD: true,                        // ← false para apagarlo por completo
  POPUP_AD_IMAGE:  'assets/img/ads/testpublicidad.webp',  // ← Ruta de tu imagen
  POPUP_AD_LINK:   'tienda.html',               // ← URL al hacer clic
  POPUP_AD_ALT:    'Promoción especial',        // ← Texto alternativo de la imagen
  POPUP_DELAY_MS:  1800,                        // ← Tiempo antes de aparecer (ms)

  // ----------------------------------------------------------
  //  MEJORAS UX: Topbar y WhatsApp Flotante
  // ----------------------------------------------------------
  TOPBAR_TEXT: '🚚 ENVÍO GRATIS A NIVEL NACIONAL POR COMPRAS MAYORES A $100', // ← Dejar en blanco '' para ocultar
  ENABLE_WA_FLOAT_BTN: true,                    // ← false para apagar la burbuja flotante

  // ----------------------------------------------------------
  //  REDES SOCIALES DE GRECIA VALENTINA
  // ----------------------------------------------------------
  REDES: {
    instagram: 'https://www.instagram.com/tu_usuario',  // ← tu usuario
    tiktok:    'https://www.tiktok.com/@tu_usuario',    // ← tu usuario
    youtube:   '',                                       // ← dejar vacío si no aplica
    facebook:  '',
  },

  // ----------------------------------------------------------
  //  NOMBRE DEL SITIO
  // ----------------------------------------------------------
  SITE_NAME:    'Grecia Valentina',
  SITE_TAGLINE: 'Accesorios para moto • Estilo de vida sobre ruedas',
};
