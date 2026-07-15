import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "919999999999";

export default function Contact() {
  return (
    <section className="section page-section">
      <div className="section-heading">
        <span className="eyebrow">Contact</span>
        <h1>Talk to Bitto</h1>
      </div>
      <div className="contact-grid">
        <a className="contact-item" href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer">
          <MessageCircle size={24} />
          <span>WhatsApp</span>
          <strong>Send enquiry</strong>
        </a>
        <a className="contact-item" href="tel:+919999999999">
          <Phone size={24} />
          <span>Phone</span>
          <strong>+91 99999 99999</strong>
        </a>
        <a className="contact-item" href="mailto:hello@bitto.local">
          <Mail size={24} />
          <span>Email</span>
          <strong>hello@bitto.local</strong>
        </a>
        <div className="contact-item">
          <MapPin size={24} />
          <span>Location</span>
          <strong>Update business address</strong>
        </div>
      </div>
    </section>
  );
}
