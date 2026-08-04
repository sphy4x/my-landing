import React from 'react';
import { Clock3, Handshake, ShieldCheck, Users } from 'lucide-react';

const values = [
  { Icon: ShieldCheck, title: 'Σωστή Προετοιμασία' },
  { Icon: Clock3, title: 'Συνέπεια στο Χρόνο' },
  { Icon: Users, title: '25+ Χρόνια Εμπειρίας' },
  { Icon: Handshake, title: 'Καθαρή Συνεννόηση' }
];

export default function About() {
  return (
    <section id="about" className="section about-section">
      <div className="container about-grid">
        <div className="about-copy" data-reveal>
          <p className="section-label">Η TechnoHome.gr</p>
          <h2 className="section-title">Αλλάζουμε τη δομή. <span>Αναβαθμίζουμε τον χώρο.</span></h2>
          <div className="about-text">
            <p>
              Η <strong>TechnoHome.gr</strong> ειδικεύεται στις καθαιρέσεις, τις κατασκευές γυψοσανίδας, τις τσιμεντοκονίες, την τοποθέτηση πλακιδίων και τις εργασίες ανακαίνισης μπάνιου.
            </p>
            <p>
              Με περισσότερα από <strong>25 χρόνια εμπειρίας</strong> και πάνω από <strong>1000 ολοκληρωμένα έργα</strong>, οργανώνουμε κάθε στάδιο με υπευθυνότητα, ακρίβεια και σταθερή επικοινωνία.
            </p>
          </div>

          <div className="values-grid">
            {values.map(({ Icon, title }) => (
              <div className="value-item" key={title}>
                <Icon size={20} aria-hidden="true" />
                <strong>{title}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="about-visual" data-reveal>
          <img
            src="/assets/images/about-renovation.webp"
            alt="Ολοκληρωμένη σύγχρονη διαμόρφωση εσωτερικού χώρου"
            width="1200"
            height="816"
            loading="lazy"
          />
          <div className="quality-card">
            <span className="quality-number">25+</span>
            <div><span>Χρόνια</span><strong>Εμπειρίας</strong></div>
          </div>
        </div>
      </div>
    </section>
  );
}
