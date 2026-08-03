import React from 'react';
import { ArrowUpRight, Grid3X3, Hammer, PaintRoller, Wrench } from 'lucide-react';
import { SERVICES } from '../src/siteContent.js';

const icons = { tiles: Grid3X3, painting: PaintRoller, plumbing: Wrench, demolition: Hammer };

export default function Services() {
  return (
    <section id="services" className="section section-alt">
      <div className="container">
        <div className="section-head" data-reveal>
          <div>
            <p className="section-label">Οι Υπηρεσίες μας</p>
            <h2 className="section-title">Ολοκληρωμένες λύσεις για το <span>σπίτι.</span></h2>
          </div>
          <p className="section-intro">Αναλαμβάνουμε κάθε εργασία με επαγγελματισμό, σύγχρονο εξοπλισμό και προσεκτική επιλογή υλικών.</p>
        </div>

        <div className="services-grid">
          {SERVICES.map((service, index) => {
            const Icon = icons[service.id];
            return (
              <a
                className="service-card"
                key={service.id}
                href={`/services/${service.slug}/`}
                data-reveal
                style={{ transitionDelay: `${index * 70}ms` }}
              >
                <div className="service-image">
                  <img src={service.image} alt={service.title} width="900" height="650" loading="lazy" />
                  <span className="service-icon"><Icon size={21} aria-hidden="true" /></span>
                </div>
                <div className="service-content">
                  <span className="service-number">{service.number}</span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <span className="service-link">Περισσότερα <ArrowUpRight size={15} aria-hidden="true" /></span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
