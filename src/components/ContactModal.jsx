import { useState } from 'react';
import { FaWhatsapp, FaEnvelope, FaTimes } from 'react-icons/fa';
import { CONTACT } from '../utils/contactConfig';

export default function ContactModal({ onClose }) {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });

  const buildMessage = () =>
    `Hello! 🙏\n\n*Name:* ${form.name}\n*My Number:* ${form.phone}\n*Message:* ${form.message}`;

  const handleWhatsApp = (e) => {
    e.preventDefault();
    const text = encodeURIComponent(buildMessage());
    window.open(`https://wa.me/${CONTACT.whatsapp}?text=${text}`, '_blank');
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(
      `Wedding Invitation — Message from ${form.name || 'Guest'}`
    );
    const body = encodeURIComponent(buildMessage());
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="contact-overlay" onClick={onClose}>
      <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
        <button className="contact-close" onClick={onClose} aria-label="Close">
          <FaTimes />
        </button>

        <h3 className="contact-title">Contact Us</h3>
        <p className="contact-sub">Have a question? Send us a message.</p>

        <form className="contact-form" onSubmit={handleWhatsApp}>
          <label className="contact-label">Your Name</label>
          <input
            type="text"
            required
            className="contact-input"
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <label className="contact-label">Your Mobile Number</label>
          <input
            type="tel"
            required
            className="contact-input"
            placeholder="Your mobile number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <label className="contact-label">Message</label>
          <textarea
            required
            rows={4}
            className="contact-input contact-textarea"
            placeholder="Write your message..."
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />

          <div className="contact-actions">
            <button type="submit" className="contact-btn contact-btn-wa">
              <FaWhatsapp size={18} /> Send on WhatsApp
            </button>
            <button
              type="button"
              className="contact-btn contact-btn-mail"
              onClick={handleEmail}
            >
              <FaEnvelope size={16} /> Email Instead
            </button>
          </div>
        </form>

        <div className="contact-direct">
          <a href={`tel:${CONTACT.phoneDial}`}>{CONTACT.phoneDisplay}</a>
          <span className="contact-dot">•</span>
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
        </div>
      </div>
    </div>
  );
}
