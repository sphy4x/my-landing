import React from 'react';
import { ArrowDown, ArrowUpRight, MessageCircle, Phone } from 'lucide-react';
import { BUSINESS, METRICS } from '../src/siteContent.js';

export default function Hero() {
  const heroRef = React.useRef(null);
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  React.useEffect(() => {
    const hero = heroRef.current;
    if (!hero || window.matchMedia('(pointer: coarse)').matches) return undefined;

    const handlePointerMove = (event) => {
      const rect = hero.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      hero.style.setProperty('--hero-pointer-x', x.toFixed(3));
      hero.style.setProperty('--hero-pointer-y', y.toFixed(3));
    };

    const resetPointer = () => {
      hero.style.setProperty('--hero-pointer-x', '0');
      hero.style.setProperty('--hero-pointer-y', '0');
    };

    hero.addEventListener('pointermove', handlePointerMove);
    hero.addEventListener('pointerleave', resetPointer);
    return () => {
      hero.removeEventListener('pointermove', handlePointerMove);
      hero.removeEventListener('pointerleave', resetPointer);
    };
  }, []);

  return (
    <section id="hero" className="hero hero-blueprint-experience" ref={heroRef}>
      <div className="hero-media" aria-hidden="true"></div>
      <div className="hero-overlay" aria-hidden="true"></div>

      <div className="hero-blueprint" aria-hidden="true">
        <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          <g className="blueprint-grid-lines">
            {Array.from({ length: 13 }, (_, index) => <path key={`v-${index}`} d={`M ${index * 100} 0 V 800`} />)}
            {Array.from({ length: 9 }, (_, index) => <path key={`h-${index}`} d={`M 0 ${index * 100} H 1200`} />)}
          </g>
          <g className="blueprint-structure">
            <path d="M705 132 H1084 V654 H705 Z" />
            <path d="M705 326 H930 V654" />
            <path d="M930 132 V468 H1084" />
            <path d="M755 178 H882 V278 H755 Z" />
            <path d="M971 514 H1042 V607 H971 Z" />
            <path d="M676 105 H1112" />
            <path d="M676 681 H1112" />
            <path d="M678 93 V117 M1110 93 V117 M678 669 V693 M1110 669 V693" />
          </g>
          <g className="blueprint-accent-lines">
            <path d="M705 326 H930" />
            <circle cx="930" cy="326" r="8" />
            <circle cx="705" cy="654" r="8" />
          </g>
        </svg>
        <span className="blueprint-note blueprint-note-top">25+ YEARS / 1000+ PROJECTS</span>
        <span className="blueprint-note blueprint-note-side">STRUCTURE → SPACE</span>
        <span className="blueprint-coordinate">40.6401° N · 22.9444° E</span>
      </div>

      <div className="container hero-content">
        <div className="hero-copy" data-reveal>
          <p className="eyebrow"><span></span> Καθαιρέσεις · Υδραυλικά · Γυψοσανίδες · Πλακάκια</p>
          <h1>Από τη δομή.<br /><strong>Στον χώρο που θέλετε<span>.</span></strong></h1>
          <p className="hero-lead">
            25+ χρόνια εμπειρίας στη Θεσσαλονίκη. Καθαιρέσεις, υδραυλικά, γυψοσανίδες, τσιμεντοκονίες, πλακίδια, ελαιοχρωματισμοί και ανακαινίσεις μπάνιου με ακρίβεια σε κάθε στάδιο.
          </p>
          <div className="hero-actions">
            <button className="button button-primary" onClick={() => scrollTo('contact')}>
              Ζητήστε Προσφορά <ArrowUpRight size={18} aria-hidden="true" />
            </button>
            <a className="button button-ghost" href={BUSINESS.phonePrimaryHref}>
              <Phone size={18} aria-hidden="true" /> {BUSINESS.phonePrimaryDisplay}
            </a>
          </div>
          <a className="hero-viber-link" href={BUSINESS.viberHref}>
            <MessageCircle size={17} aria-hidden="true" /> Επικοινωνία μέσω Viber
          </a>
          <div className="hero-signature" aria-hidden="true">
            <span>BLUEPRINT</span><i></i><strong>REALITY</strong>
          </div>
        </div>
      </div>

      <button className="hero-scroll-cue" onClick={() => scrollTo('about')} aria-label="Μετάβαση στην επόμενη ενότητα">
        <span>Explore</span><ArrowDown size={16} aria-hidden="true" />
      </button>

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
