function Services() {
    const services = [
        {
            id: 'tiles',
            number: '01',
            title: 'Πλακάκια',
            description: 'Τοποθέτηση πλακιδίων μπάνιου, κουζίνας και δαπέδου με απόλυτη ακρίβεια και υψηλή αισθητική.',
            icon: 'icon-layout-grid',
            image: 'https://app.trickle.so/storage/public/images/usr_1b48c29310000001/ec2e658d-da9b-4bab-8dc5-27323809a336.jpeg'
        },
        {
            id: 'painting',
            number: '02',
            title: 'Βάψιμο',
            description: 'Ελαιοχρωματισμοί εσωτερικών και εξωτερικών χώρων, τεχνοτροπίες και φρεσκαρίσματα.',
            icon: 'icon-paint-roller',
            image: 'https://app.trickle.so/storage/public/images/usr_1b48c29310000001/bf917846-3e1c-4a4f-9a77-1ee080c5a8fe.jpeg'
        },
        {
            id: 'plumbing',
            number: '03',
            title: 'Υδραυλικά',
            description: 'Εγκατάσταση και συντήρηση υδραυλικών συστημάτων, ανακαίνιση μπάνιου και κουζίνας.',
            icon: 'icon-wrench',
            image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=2670&auto=format&fit=crop'
        },
        {
            id: 'demolition',
            number: '04',
            title: 'Αποξηλώσεις & Γκρεμίσματα',
            description: 'Αποξηλώσεις και γκρεμίσματα χώρων με ασφάλεια και συνέπεια. Καθαρίζουμε και προετοιμάζουμε τον χώρο για την ανακαίνιση.',
            icon: 'icon-hammer',
            image: 'https://app.trickle.so/storage/public/images/usr_1b48c29310000001/0f98445a-4156-430d-8f93-0ab586e94c8c.jpeg'
        }
    ];

    const handleServiceClick = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <section id="services" className="section section-alt" data-name="services" data-file="components/Services.js">
            <div className="container">
                <div className="section-head" data-reveal>
                    <div>
                        <p className="section-label">Οι Υπηρεσίες μας</p>
                        <h2 className="section-title">Ολοκληρωμένες λύσεις για το <span>σπίτι.</span></h2>
                    </div>
                    <p className="section-intro">
                        Αναλαμβάνουμε κάθε εργασία με επαγγελματισμό, χρησιμοποιώντας σύγχρονο εξοπλισμό και ποιοτικά υλικά.
                    </p>
                </div>

                <div className="services-grid">
                    {services.map((service, index) => (
                        <article
                            className="service-card"
                            key={service.id}
                            onClick={handleServiceClick}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter' || event.key === ' ') handleServiceClick();
                            }}
                            role="button"
                            tabIndex="0"
                            data-reveal
                            style={{ transitionDelay: `${index * 70}ms` }}
                        >
                            <div className="service-image">
                                <img src={service.image} alt={service.title} loading="lazy" />
                                <span className={service.icon} aria-hidden="true"></span>
                            </div>
                            <div className="service-content">
                                <span className="service-number">{service.number}</span>
                                <h3>{service.title}</h3>
                                <p>{service.description}</p>
                                <span className="service-link">Ζητήστε προσφορά <i className="icon-arrow-up-right" aria-hidden="true"></i></span>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
