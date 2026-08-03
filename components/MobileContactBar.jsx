import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { BUSINESS } from '../src/siteContent.js';

export default function MobileContactBar() {
  return (
    <aside className="mobile-contact-bar" aria-label="Γρήγορη επικοινωνία">
      <a href={BUSINESS.phonePrimaryHref}>
        <Phone size={18} aria-hidden="true" />
        Κλήση
      </a>
      <a className="mobile-viber" href={BUSINESS.viberHref}>
        <MessageCircle size={18} aria-hidden="true" />
        Viber
      </a>
    </aside>
  );
}
