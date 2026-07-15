const phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "919999999999";

export function whatsappProductLink(product) {
  const message = `Hi Bitto, I am interested in ${product.name}. Please share more details.`;
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}
