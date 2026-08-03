import React from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  ['about', 'Σχετικά'],
  ['services', 'Υπηρεσίες'],
  ['process', 'Διαδικασία'],
  ['gallery', 'Έργα'],
  ['reviews', 'Αξιολογήσεις']
];

export default function Navbar({ compact = false }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(compact);
  const isHome = window.location.pathname === '/';

  const goToSection = (id) => {
    setIsMenuOpen(false);
    if (!isHome) {
      window.location.href = `/#${id}`;
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(compact || window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [compact]);

  React.useEffect(() => {
    document.body.classList.toggle('menu-open', isMenuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [isMenuOpen]);

  return (
    <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="container header-inner">
        <a className="brand" href="/" aria-label="TechnoHome.gr — Αρχική">
          <img src="/assets/images/logo.webp" alt="TechnoHome.gr" width="200" height="49" />
        </a>

        <nav className="desktop-nav" aria-label="Κύρια πλοήγηση">
          {links.map(([id, label]) => <button key={id} onClick={() => goToSection(id)}>{label}</button>)}
        </nav>

        <button className="header-cta" onClick={() => goToSection('contact')}>Λάβετε Προσφορά</button>

        <button
          className="menu-toggle"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? 'Κλείσιμο μενού' : 'Άνοιγμα μενού'}
        >
          {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      <nav id="mobile-menu" className={`mobile-nav ${isMenuOpen ? 'is-open' : ''}`} aria-label="Πλοήγηση κινητού">
        {links.map(([id, label]) => <button key={id} onClick={() => goToSection(id)}>{label}</button>)}
        <button className="mobile-nav-cta" onClick={() => goToSection('contact')}>Λάβετε Προσφορά</button>
      </nav>
    </header>
  );
}
