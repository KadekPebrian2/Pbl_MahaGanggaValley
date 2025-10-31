import React from "react";

// Komponen Ikon SVG
const IconPhone = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.02.75-.25 1.02l-2.2 2.2z" /></svg>
);
const IconMail = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
);
const IconInstagram = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><rect x="4" y="4" width="16" height="16" rx="4"></rect><circle cx="12" cy="12" r="3"></circle><line x1="16.5" y1="7.5" x2="16.5" y2="7.501"></line></svg>
);
const IconFacebook = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3"></path></svg>
);
const IconYoutube = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><rect x="3" y="5" width="18" height="14" rx="4"></rect><path d="M10 9l5 3l-5 3z"></path></svg>
);

export default function Footer() {
  return (
    <footer id="footer" className="footer">
      <div className="container footer-grid">
        <div className="footer-col">
          <h4>Maha Gangga Valley</h4>
          <p>Explore • Respect • Preserve</p>
        </div>

        <div className="footer-col">
          <h5>Kontak</h5>
          <div className="contact-item">
            <IconPhone />
            <span>0812-3456-7890</span>
          </div>
          <div className="contact-item">
            <IconMail />
            <span>info@mahangangga.id</span>
          </div>
        </div>

        <div className="footer-col">
          <h5>Sosial</h5>
          <div className="socials">
            <a href="#" aria-label="Instagram"><IconInstagram /></a>
            <a href="#" aria-label="Facebook"><IconFacebook /></a>
            <a href="#" aria-label="YouTube"><IconYoutube /></a>
          </div>
        </div>
      </div>

      <div className="container">
        <hr className="footer-divider" />
        <div className="copy">© {new Date().getFullYear()} Maha Gangga Valley — All rights reserved</div>
      </div>
    </footer>
  );
}