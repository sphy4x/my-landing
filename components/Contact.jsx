import React from 'react';
import { ArrowRight, Mail, MapPin, MessageCircle, Phone, UserRound } from 'lucide-react';
import { BUSINESS, SERVICES } from '../src/siteContent.js';

const initialInquiry = { name: '', phone: '', service: '', area: '', details: '' };

export default function Contact() {
  const [formData, setFormData] = React.useState(initialInquiry);
  const [status, setStatus] = React.useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const serviceTitle = SERVICES.find((service) => service.id === formData.service)?.title || 'Δεν επιλέχθηκε';
    const message = [
      'Νέο αίτημα από το TechnoHome.gr',
      `Όνομα: ${formData.name}`,
      `Τηλέφωνο: ${formData.phone}`,
      `Υπηρεσία: ${serviceTitle}`,
      `Περιοχή: ${formData.area || 'Δεν συμπληρώθηκε'}`,
      `Περιγραφή: ${formData.details || 'Δεν συμπληρώθηκε'}`
    ].join('\n');

    try {
      await navigator.clipboard.writeText(message);
      setStatus('Το μήνυμα αντιγράφηκε. Επικολλήστε το στη συνομιλία Viber που ανοίγει.');
    } catch {
      setStatus('Ανοίγει το Viber. Μπορείτε να στείλετε τα στοιχεία σας στη συνομιλία.');
    }

    window.location.href = BUSINESS.viberHref;
  };

  const contacts = [
    {
      Icon: Phone,
      label: 'Τηλέφωνο',
      helper: 'Άμεση επικοινωνία',
      content: (
        <div className="contact-links">
          <a href={BUSINESS.phonePrimaryHref}>{BUSINESS.phonePrimaryDisplay}</a>
          <a href={BUSINESS.phoneSecondaryHref}>{BUSINESS.phoneSecondaryDisplay}</a>
        </div>
      )
    },
    {
      Icon: MessageCircle,
      label: 'Viber',
      helper: 'Στείλτε φωτογραφίες και πληροφορίες',
      content: <a href={BUSINESS.viberHref}>{BUSINESS.phonePrimaryDisplay}</a>
    },
    {
      Icon: MapPin,
      label: 'Περιοχή εξυπηρέτησης',
      helper: 'Κατοικίες και επαγγελματικοί χώροι',
      content: <span>{BUSINESS.serviceArea}</span>
    }
  ];

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <div className="contact-hero" data-reveal>
          <div>
            <p className="section-label">Επικοινωνία</p>
            <h2>Ας ανανεώσουμε τον <span>χώρο σας.</span></h2>
            <p>Περιγράψτε την εργασία που χρειάζεστε και επικοινωνήστε απευθείας με τον υπεύθυνο τεχνικό.</p>
          </div>
          <a className="contact-mail-link" href={`mailto:${BUSINESS.email}`}>
            Email <ArrowRight aria-hidden="true" />
          </a>
        </div>

        <div className="contact-layout">
          <div className="contact-info-column">
            <div className="technician-card" data-reveal>
              <span><UserRound size={20} aria-hidden="true" /></span>
              <div><small>Υπεύθυνος Τεχνικός</small><strong>{BUSINESS.technician}</strong></div>
            </div>

            <div className="contact-grid">
              {contacts.map(({ Icon, label, helper, content }, index) => (
                <article className="contact-card" key={label} data-reveal style={{ transitionDelay: `${index * 70}ms` }}>
                  <Icon size={23} aria-hidden="true" />
                  <small>{label}</small>
                  <div className="contact-value">{content}</div>
                  <p>{helper}</p>
                </article>
              ))}
            </div>
          </div>

          <form className="inquiry-form" onSubmit={handleSubmit} data-reveal>
            <div className="inquiry-form-head">
              <span><MessageCircle size={22} aria-hidden="true" /></span>
              <div><small>Γρήγορο αίτημα</small><h3>Στείλτε τα στοιχεία μέσω Viber</h3></div>
            </div>

            <div className="inquiry-fields">
              <label>
                <span>Όνομα</span>
                <input name="name" value={formData.name} onChange={handleChange} minLength="2" maxLength="80" required placeholder="Το όνομά σας" />
              </label>
              <label>
                <span>Τηλέφωνο</span>
                <input name="phone" type="tel" value={formData.phone} onChange={handleChange} minLength="8" maxLength="20" required placeholder="69XXXXXXXX" />
              </label>
              <label>
                <span>Υπηρεσία</span>
                <select name="service" value={formData.service} onChange={handleChange} required>
                  <option value="">Επιλέξτε υπηρεσία</option>
                  {SERVICES.map((service) => <option key={service.id} value={service.id}>{service.title}</option>)}
                </select>
              </label>
              <label>
                <span>Περιοχή</span>
                <input name="area" value={formData.area} onChange={handleChange} maxLength="100" placeholder="Π.χ. Καλαμαριά" />
              </label>
              <label className="inquiry-wide">
                <span>Σύντομη περιγραφή</span>
                <textarea name="details" value={formData.details} onChange={handleChange} maxLength="700" rows="4" placeholder="Τι εργασία χρειάζεστε;"></textarea>
              </label>
            </div>

            <p className="inquiry-note">Τα στοιχεία δεν αποθηκεύονται στον ιστότοπο. Αντιγράφονται στη συσκευή σας και ανοίγει το Viber.</p>
            <button className="button inquiry-submit" type="submit">
              Άνοιγμα στο Viber <ArrowRight size={18} aria-hidden="true" />
            </button>
            {status && <p className="inquiry-status" role="status">{status}</p>}
          </form>
        </div>

        <a className="contact-email-row" href={`mailto:${BUSINESS.email}`}>
          <Mail size={18} aria-hidden="true" /> {BUSINESS.email}
        </a>
      </div>
    </section>
  );
}
