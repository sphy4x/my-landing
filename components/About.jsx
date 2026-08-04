import React from 'react';
import { Clock3, Handshake, ShieldCheck, Users } from 'lucide-react';

const values = [
  { Icon: ShieldCheck, title: 'Ποιοτικά Υλικά' },
  { Icon: Clock3, title: 'Συνέπεια στο Χρόνο' },
  { Icon: Users, title: 'Έμπειρο Προσωπικό' },
  { Icon: Handshake, title: 'Καθαρή Συνεννόηση' }
];

export default function About() {
  return (
    <section id="about" className="section about-section">
      <div className="container about-grid">
        <div className="about-copy" data-reveal>
          <p className="section-label">Σχετικά με εμάς</p>
          <h2 className="section-title">Δημιουργούμε τον χώρο που <span>ονειρεύεστε.</span></h2>
          <div className="about-text">
            <p>
              Η <strong>TechnoHome.gr</strong> ειδικεύεται στις ανακαινίσεις και τις τεχνικές εργασίες, προσφέροντας λύσεις που συνδυάζουν αισθητική και λειτουργικότητα.
            </p>
            <p>
              Με περισσότερα από <strong>15 χρόνια εμπειρίας</strong> και πάνω από <strong>1000 ολοκληρωμένα έργα</strong>, οργανώνουμε κάθε εργασία με υπευθυνότητα, προσοχή στη λεπτομέρεια και σταθερή επικοινωνία.
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
            alt="Ολοκληρωμένη σύγχρονη ανακαίνιση εσωτερικού χώρου"
            width="1200"
            height="816"
            loading="lazy"
          />
          <div className="quality-card">
            <span className="quality-number">15+</span>
            <div><span>Χρόνια</span><strong>Εμπειρίας</strong></div>
          </div>
        </div>
      </div>
    </section>
  );
}
