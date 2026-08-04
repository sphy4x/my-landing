import React from 'react';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { BUSINESS, SERVICES } from '../src/siteContent.js';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <strong>Techno<span>Home.gr</span></strong>
          <p>Εξειδικευμένες εργασίες διαμόρφωσης στη Θεσσαλονίκη με 25+ χρόνια εμπειρίας: καθαιρέσεις, υδραυλικά, γυψοσανίδες, τσιμεντοκονίες, πλακίδια, ελαιοχρωματισμοί και μπάνια.</p>
        </div>

        <div className="footer-column">
          <h3>Σύνδεσμοι</h3>
          <a href="/#about">Σχετικά με εμάς</a>
          <a href="/#services">Υπηρεσίες</a>
          <a href="/#gallery">Έργα</a>
          <a href="/#reviews">Αξιολογήσεις</a>
        </div>

        <div className="footer-column">
          <h3>Υπηρεσίες</h3>
          {SERVICES.map((service) => <a key={service.id} href={`/services/${service.slug}/`}>{service.menuTitle}</a>)}
        </div>

        <div className="footer-column footer-contact">
          <h3>Επικοινωνία</h3>
          <span><MapPin size={15} aria-hidden="true" /> Θεσσαλονίκη</span>
          <a href={BUSINESS.phonePrimaryHref}><Phone size={15} aria-hidden="true" /> {BUSINESS.phonePrimaryDisplay}</a>
          <a href={BUSINESS.phoneSecondaryHref}><Phone size={15} aria-hidden="true" /> {BUSINESS.phoneSecondaryDisplay}</a>
          <a href={BUSINESS.viberHref}><MessageCircle size={15} aria-hidden="true" /> Viber</a>
          <a href={`mailto:${BUSINESS.email}`}><Mail size={15} aria-hidden="true" /> {BUSINESS.email}</a>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} TechnoHome.gr. Όλα τα δικαιώματα κατοχυρωμένα.</p>
        <div><a href="/terms/">Όροι Χρήσης</a><a href="/privacy/">Πολιτική Απορρήτου</a></div>
      </div>
    </footer>
  );
}
