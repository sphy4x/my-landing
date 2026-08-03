function Contact() {
    const contacts = [
        {
            icon: 'icon-phone',
            label: 'Τηλέφωνο',
            helper: 'Δευτέρα - Παρασκευή, 9πμ - 6μμ',
            content: (
                <div className="contact-links">
                    <a href="tel:+306996832335">699 683 2335</a>
                    <a href="tel:+306948308810">694 830 8810</a>
                </div>
            )
        },
        {
            icon: 'icon-mail',
            label: 'Email',
            helper: 'Στείλτε μας μήνυμα',
            content: <a href="mailto:technohome.gr@gmail.com">technohome.gr@gmail.com</a>
        },
        {
            icon: 'icon-map-pin',
            label: 'Διεύθυνση',
            helper: 'Περιοχή εξυπηρέτησης',
            content: <span>Θεσσαλονίκη, Ελλάδα</span>
        }
    ];

    return (
        <section id="contact" className="section contact-section" data-name="contact" data-file="components/Contact.js">
            <div className="container">
                <div className="contact-hero" data-reveal>
                    <div>
                        <p className="section-label">Επικοινωνία</p>
                        <h2>Ας ανανεώσουμε τον <span>χώρο σας.</span></h2>
                        <p>Είμαστε εδώ για να απαντήσουμε σε κάθε σας ερώτηση και να συζητήσουμε τις ανάγκες του χώρου σας.</p>
                    </div>
                    <a className="contact-mail-link" href="mailto:technohome.gr@gmail.com">
                        Email <span className="icon-arrow-right" aria-hidden="true"></span>
                    </a>
                </div>

                <div className="technician-card" data-reveal>
                    <span className="icon-user-round" aria-hidden="true"></span>
                    <div>
                        <small>Υπεύθυνος Τεχνικός</small>
                        <strong>Κώστας Τζέζαρ</strong>
                    </div>
                </div>

                <div className="contact-grid">
                    {contacts.map((contact, index) => (
                        <article className="contact-card" key={contact.label} data-reveal style={{ transitionDelay: `${index * 70}ms` }}>
                            <span className={contact.icon} aria-hidden="true"></span>
                            <small>{contact.label}</small>
                            <div className="contact-value">{contact.content}</div>
                            <p>{contact.helper}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
