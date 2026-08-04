import React from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Services from './components/Services.jsx';
import Process from './components/Process.jsx';
import Gallery from './components/Gallery.jsx';
import Reviews from './components/Reviews.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import MobileContactBar from './components/MobileContactBar.jsx';
import ServicePage from './components/ServicePage.jsx';
import LegalPage from './components/LegalPage.jsx';
import { SERVICE_PATHS } from './src/siteContent.js';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="error-screen">
          <p className="eyebrow">TECHNOHOME.GR</p>
          <h1>Κάτι πήγε στραβά.</h1>
          <p>Παρακαλώ ανανεώστε τη σελίδα και δοκιμάστε ξανά.</p>
          <button className="button button-primary" onClick={() => window.location.reload()}>
            Ανανέωση Σελίδας
          </button>
        </main>
      );
    }

    return this.props.children;
  }
}

function useRevealAnimations() {
  React.useEffect(() => {
    const root = document.documentElement;
    root.classList.add('motion-ready');
    const revealItems = Array.from(document.querySelectorAll('[data-reveal]'));

    if (!('IntersectionObserver' in window)) {
      revealItems.forEach((item) => item.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -24px' });

    revealItems.forEach((item) => observer.observe(item));
    const fallbackTimer = window.setTimeout(() => {
      revealItems.forEach((item) => item.classList.add('is-visible'));
    }, 3500);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallbackTimer);
    };
  }, []);
}

function usePageProgress() {
  React.useEffect(() => {
    const root = document.documentElement;
    let frame = 0;

    const updateProgress = () => {
      const scrollable = root.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(Math.max(window.scrollY / scrollable, 0), 1) : 0;
      root.style.setProperty('--page-progress', progress.toFixed(4));
      frame = 0;
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
}

function HomePage() {
  useRevealAnimations();

  return (
    <div className="site-shell">
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Services />
        <Process />
        <Gallery />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <MobileContactBar />
    </div>
  );
}

function RoutedPage() {
  const normalizedPath = window.location.pathname.endsWith('/')
    ? window.location.pathname
    : `${window.location.pathname}/`;
  const service = SERVICE_PATHS[normalizedPath];

  if (service) return <ServicePage service={service} />;
  if (normalizedPath === '/privacy/') return <LegalPage type="privacy" />;
  if (normalizedPath === '/terms/') return <LegalPage type="terms" />;
  return <HomePage />;
}

export default function App() {
  usePageProgress();

  return (
    <ErrorBoundary>
      <div className="site-progress" aria-hidden="true"></div>
      <RoutedPage />
    </ErrorBoundary>
  );
}
