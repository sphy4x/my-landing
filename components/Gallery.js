function Gallery() {
    const [selectedImage, setSelectedImage] = React.useState(null);

    const images = [
        {
            url: 'https://app.trickle.so/storage/public/images/usr_1b48c29310000001/59bfef91-0fb8-44ce-bc4e-2c55f6b2cebb.jpeg',
            title: 'Σαλόνι & Δάπεδο'
        },
        {
            url: 'https://app.trickle.so/storage/public/images/usr_1b48c29310000001/a5e5b453-44bb-498d-a974-0efcd703eec4.jpeg',
            title: 'Ανακαίνιση Κουζίνας'
        },
        {
            url: 'https://app.trickle.so/storage/public/images/usr_1b48c29310000001/a118368f-17ee-405d-bcb9-ea9e65a32abd.jpeg',
            title: 'Σαλόνι & Δάπεδο'
        }
    ];

    const openLightbox = (image) => {
        setSelectedImage(image);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setSelectedImage(null);
        document.body.style.overflow = '';
    };

    React.useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') closeLightbox();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <section id="gallery" className="section gallery-section" data-name="gallery" data-file="components/Gallery.js">
            <div className="container">
                <div className="section-head" data-reveal>
                    <div>
                        <p className="section-label">Τα Έργα μας</p>
                        <h2 className="section-title">Δείγματα <span>δουλειάς.</span></h2>
                    </div>
                    <p className="section-intro">
                        Φωτογραφίες από πρόσφατες ανακαινίσεις και τεχνικές εργασίες που έχουμε ολοκληρώσει.
                    </p>
                </div>

                <div className="gallery-grid">
                    {images.map((image, index) => (
                        <button
                            className={`gallery-item gallery-item-${index + 1}`}
                            key={`${image.title}-${index}`}
                            onClick={() => openLightbox(image)}
                            aria-label={`Προβολή έργου: ${image.title}`}
                            data-reveal
                        >
                            <img src={image.url} alt={image.title} loading="lazy" />
                            <span className="gallery-shade" aria-hidden="true"></span>
                            <span className="gallery-caption">
                                <small>Έργο {String(index + 1).padStart(2, '0')}</small>
                                <strong>{image.title}</strong>
                            </span>
                            <i className="icon-maximize-2" aria-hidden="true"></i>
                        </button>
                    ))}
                </div>

                <div className="gallery-action" data-reveal>
                    <a
                        className="button button-primary"
                        href="https://www.facebook.com/profile.php?id=100063673203867"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Περισσότερα στο Facebook <span className="icon-facebook" aria-hidden="true"></span>
                    </a>
                </div>
            </div>

            {selectedImage && (
                <div className="lightbox" role="dialog" aria-modal="true" aria-label={selectedImage.title} onClick={closeLightbox}>
                    <button className="lightbox-close" onClick={closeLightbox} aria-label="Κλείσιμο">
                        <span className="icon-x" aria-hidden="true"></span>
                    </button>
                    <div className="lightbox-content" onClick={(event) => event.stopPropagation()}>
                        <img src={selectedImage.url} alt={selectedImage.title} />
                        <p>{selectedImage.title}</p>
                    </div>
                </div>
            )}
        </section>
    );
}
