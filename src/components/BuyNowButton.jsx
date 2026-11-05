import { FaWhatsapp } from 'react-icons/fa';
import { CONTACT } from '../utils/contactConfig';

export default function BuyNowButton() {
  const handleClick = () => {
    const text = encodeURIComponent(CONTACT.buyMessage);
    window.open(`https://wa.me/${CONTACT.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <button className="buy-now-btn" onClick={handleClick} aria-label="Buy now on WhatsApp">
      <FaWhatsapp size={20} />
      <span>BUY NOW</span>
    </button>
  );
}
