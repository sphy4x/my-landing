import React from 'react';
import { ArrowUpRight, MessageCircle, Phone } from 'lucide-react';
import { BUSINESS, METRICS } from '../src/siteContent.js';

export default function Hero() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <section id="hero" className="hero">
      <div className="hero-media" aria-hidden="true"></div>
      <div className="hero-overlay" aria-hidden="true"></div>

      <div className="container hero-content">
        <div className="hero-copy" data-reveal>
          <p className="eyebrow"><span></span> Ανακαινίσεις & Τεχνικές Εργασίες</p>
          <h1>Χτίζουμε το<br /><strong>Μέλλον του Σπιτιού<span>.</span></strong></h1>
          <p className="hero-lead">
            Περισσότερα από 25 χρόνια εμπειρίας και 1000 ολοκληρωμένα έργα στη Θεσσαλονίκη — από τη μελέτη μέχρι την παράδοση.
          </p>
          <div className="hero-actions">
            <button className="button button-primary" onClick={() => scrollTo('contact')}>
              Ζήτα Προσφορά <ArrowUpRight size={18} aria-hidden="true" />
            </button>
            <a className="button button-ghost" href={BUSINESS.phonePrimaryHref}>
              <Phone size={18} aria-hidden="true" /> {BUSINESS.phonePrimaryDisplay}
            </a>
          </div>
          <a className="hero-viber-link" href={BUSINESS.viberHref}>
            <MessageCircle size={17} aria-hidden="true" /> Επικοινωνία μέσω Viber
          </a>
        </div>
      </div>

      <div className="hero-metrics" aria-label="Στοιχεία TechnoHome.gr">
        <div className="container metrics-grid">
          {METRICS.map((metric) => (
            <div className="metric" key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
