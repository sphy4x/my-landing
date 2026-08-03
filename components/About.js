function About() {
    const values = [
        { icon: 'icon-shield-check', title: 'Πιστοποιημένα Υλικά' },
        { icon: 'icon-clock', title: 'Συνέπεια στο Χρόνο' },
        { icon: 'icon-users', title: 'Έμπειρο Προσωπικό' },
        { icon: 'icon-piggy-bank', title: 'Ανταγωνιστικές Τιμές' }
    ];

    return (
        <section id="about" className="section about-section" data-name="about" data-file="components/About.js">
            <div className="container about-grid">
                <div className="about-copy" data-reveal>
                    <p className="section-label">Σχετικά με εμάς</p>
                    <h2 className="section-title">Δημιουργούμε τον χώρο που <span>ονειρεύεστε.</span></h2>
                    <div className="about-text">
                        <p>
                            Η <strong>TechnoHome.gr</strong> ειδικεύεται στις ανακαινίσεις και τις τεχνικές εργασίες, προσφέροντας λύσεις που συνδυάζουν αισθητική και λειτουργικότητα.
                        </p>
                        <p>
                            Η φιλοσοφία μας βασίζεται στην ποιότητα, την αξιοπιστία και την τήρηση των χρονοδιαγραμμάτων. Η εμπειρία μας σε κάθε έργο, μικρό ή μεγάλο, εξασφαλίζει την πλήρη ικανοποίηση των πελατών μας.
                        </p>
                    </div>

                    <div className="values-grid">
                        {values.map((value) => (
                            <div className="value-item" key={value.title}>
                                <span className={value.icon} aria-hidden="true"></span>
                                <strong>{value.title}</strong>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="about-visual" data-reveal>
                    <img
                        src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop"
                        alt="Ολοκληρωμένη σύγχρονη ανακαίνιση εσωτερικού χώρου"
                        loading="lazy"
                    />
                    <div className="quality-card">
                        <span className="quality-number">100%</span>
                        <div>
                            <span>Εγγύηση Ποιότητας</span>
                            <strong>Ικανοποίηση</strong>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
