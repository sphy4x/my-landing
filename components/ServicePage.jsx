import React from 'react';
import { ArrowLeft, Check, MessageCircle, Phone } from 'lucide-react';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import MobileContactBar from './MobileContactBar.jsx';
import { BUSINESS } from '../src/siteContent.js';

export default function ServicePage({ service }) {
  return (
    <div className="site-shell">
      <Navbar compact />
      <main id="main-content" className="service-page">
        <section className="service-page-hero">
          <div className="service-page-media" style={{ backgroundImage: `url(${service.image})` }} aria-hidden="true"></div>
          <div className="hero-overlay" aria-hidden="true"></div>
          <div className="container service-page-hero-content">
            <a className="back-link" href="/#services"><ArrowLeft size={18} /> Όλες οι υπηρεσίες</a>
            <p className="eyebrow"><span></span> TechnoHome.gr</p>
            <h1>{service.pageTitle}<span>.</span></h1>
            <p>{service.pageLead}</p>
            <div className="hero-actions">
              <a className="button button-primary" href={BUSINESS.phonePrimaryHref}><Phone size={18} /> Καλέστε μας</a>
              <a className="button button-ghost" href={BUSINESS.viberHref}><MessageCircle size={18} /> Viber</a>
            </div>
          </div>
        </section>

        <section className="section service-page-details">
          <div className="container service-page-grid">
            <div>
              <p className="section-label">Τι αναλαμβάνουμε</p>
              <h2 className="section-title">Οργανωμένη εργασία με <span>καθαρό αποτέλεσμα.</span></h2>
            </div>
            <div className="service-bullets">
              {service.bullets.map((item) => (
                <div key={item}><Check size={20} aria-hidden="true" /><span>{item}</span></div>
              ))}
            </div>
          </div>
        </section>

        <section className="section service-page-cta">
          <div className="container">
            <p className="section-label">Επικοινωνία</p>
            <h2>Πείτε μας τι χρειάζεται ο χώρος σας.</h2>
            <p>Εξυπηρετούμε τη Θεσσαλονίκη και τις γύρω περιοχές. Μιλήστε απευθείας με τον υπεύθυνο τεχνικό.</p>
            <div className="hero-actions">
              <a className="button button-primary" href={BUSINESS.phonePrimaryHref}>{BUSINESS.phonePrimaryDisplay}</a>
              <a className="button button-ghost" href="/#contact">Φόρμα επικοινωνίας</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobileContactBar />
    </div>
  );
}
