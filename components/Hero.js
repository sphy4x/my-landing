function Hero() {
    const scrollTo = (id) => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const metrics = [
        { value: '4', label: 'Βασικές Υπηρεσίες' },
        { value: '100%', label: 'Έμφαση στην Ποιότητα' },
        { value: 'ΘΕΣ/ΝΙΚΗ', label: 'Περιοχή Εξυπηρέτησης' },
        { value: '2', label: 'Γραμμές Επικοινωνίας' }
    ];

    return (
        <section id="hero" className="hero" data-name="hero" data-file="components/Hero.js">
            <div className="hero-media" aria-hidden="true"></div>
            <div className="hero-overlay" aria-hidden="true"></div>

            <div className="container hero-content">
                <div className="hero-copy" data-reveal>
                    <p className="eyebrow"><span></span> Ανακαινίσεις & Τεχνικές Εργασίες</p>
                    <h1>
                        Χτίζουμε το<br />
                        <strong>Μέλλον του Σπιτιού<span>.</span></strong>
                    </h1>
                    <p className="hero-lead">
                        Από την μελέτη μέχρι την υλοποίηση, η TechnoHome.gr προσφέρει ολοκληρωμένες λύσεις ανακαίνισης με σύγχρονη αισθητική.
                    </p>
                    <div className="hero-actions">
                        <button className="button button-primary" onClick={() => scrollTo('contact')}>
                            Ζήτα Προσφορά <span className="icon-arrow-up-right" aria-hidden="true"></span>
                        </button>
                        <button className="button button-ghost" onClick={() => scrollTo('services')}>
                            Οι Υπηρεσίες μας
                        </button>
                    </div>
                </div>
            </div>

            <div className="hero-metrics" aria-label="Στοιχεία TechnoHome.gr">
                <div className="container metrics-grid">
                    {metrics.map((metric) => (
                        <div className="metric" key={metric.label}>
                            <strong>{metric.value}</strong>
                            <span>{metric.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
