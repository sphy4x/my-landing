import React from 'react';
import { ExternalLink, Maximize2, X } from 'lucide-react';
import { BUSINESS, PROJECTS } from '../src/siteContent.js';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = React.useState(null);
  const closeButtonRef = React.useRef(null);

  const closeLightbox = React.useCallback(() => {
    setSelectedImage(null);
    document.body.style.overflow = '';
  }, []);

  const openLightbox = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  React.useEffect(() => {
    if (!selectedImage) return undefined;
    closeButtonRef.current?.focus();
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, closeLightbox]);

  React.useEffect(() => () => { document.body.style.overflow = ''; }, []);

  return (
    <section id="gallery" className="section gallery-section">
      <div className="container">
        <div className="section-head" data-reveal>
          <div>
            <p className="section-label">Τα Έργα μας</p>
            <h2 className="section-title">Πραγματικά δείγματα <span>δουλειάς.</span></h2>
          </div>
          <p className="section-intro">Φωτογραφίες από ανακαινίσεις, τεχνικές εργασίες και ειδικές κατασκευές που έχουμε ολοκληρώσει.</p>
        </div>

        <div className="gallery-grid gallery-grid-expanded">
          {PROJECTS.map((image, index) => (
            <button
              className={`gallery-item gallery-item-${index + 1}`}
              key={image.title}
              onClick={() => openLightbox(image)}
              aria-label={`Προβολή έργου: ${image.title}`}
              data-reveal
            >
              <img src={image.src} alt={image.title} loading="lazy" />
              <span className="gallery-shade" aria-hidden="true"></span>
              <span className="gallery-caption">
                <small>{image.category}</small>
                <strong>{image.title}</strong>
              </span>
              <Maximize2 size={18} aria-hidden="true" />
            </button>
          ))}
        </div>

        <div className="gallery-action" data-reveal>
          <a className="button button-primary" href={BUSINESS.facebook} target="_blank" rel="noopener noreferrer">
            Περισσότερα στο Facebook <ExternalLink size={17} aria-hidden="true" />
          </a>
        </div>
      </div>

      {selectedImage && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={selectedImage.title} onClick={closeLightbox}>
          <button ref={closeButtonRef} className="lightbox-close" onClick={closeLightbox} aria-label="Κλείσιμο">
            <X aria-hidden="true" />
          </button>
          <div className="lightbox-content" onClick={(event) => event.stopPropagation()}>
            <img src={selectedImage.src} alt={selectedImage.title} />
            <p><strong>{selectedImage.title}</strong><span>{selectedImage.category}</span></p>
          </div>
        </div>
      )}
    </section>
  );
}
