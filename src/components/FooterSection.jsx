import React from 'react';

export default function FooterSection() {
  return (
    <footer id="footer-section">
      <div className="footer-msg">
        <div style={{ marginBottom: '1.5rem', fontFamily: 'var(--font-marathi)', fontSize: '1.1rem' }}>
          * आपले स्नेहांकित *<br />
          श्रीमती किसनाबाई राजाराम मारणे | श्री. तानाजी राजाराम मारणे<br />
          श्री. शिवाजी राजाराम मारणे | सौ. मालन शिवाजी मारणे
        </div>
      </div>

      <span className="footer-name" style={{ fontFamily: 'var(--font-marathi)' }}>
        निलेश आणि पुजा
      </span>

      <div className="footer-msg" style={{ marginTop: '2rem', fontFamily: 'var(--font-marathi)', fontSize: '1.3rem', fontWeight: 600 }}>
        ।। समस्त मारणे परिवार ।।
      </div>

      <div className="footer-credit">
        CRAFTED WITH ❤️ BY DEVANSHU JOSHI
      </div>
    </footer>
  );
}
