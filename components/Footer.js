function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="site-footer" data-name="footer" data-file="components/Footer.js">
            <div className="container footer-grid">
                <div className="footer-brand">
                    <strong>Techno<span>Home.gr</span></strong>
                    <p>
                        Υψηλής ποιότητας ανακαινίσεις και τεχνικές υπηρεσίες στη Θεσσαλονίκη. Μεταμορφώνουμε τον χώρο σας με συνέπεια και επαγγελματισμό.
                    </p>
                </div>

                <div className="footer-column">
                    <h3>Σύνδεσμοι</h3>
                    <a href="#hero">Αρχική</a>
                    <a href="#about">Σχετικά με εμάς</a>
                    <a href="#services">Υπηρεσίες</a>
                    <a href="#gallery">Έργα</a>
                </div>

                <div className="footer-column">
                    <h3>Υπηρεσίες</h3>
                    <a href="#services">Πλακάκια</a>
                    <a href="#services">Ελαιοχρωματισμοί</a>
                    <a href="#services">Υδραυλικά</a>
                    <a href="#services">Αποξηλώσεις</a>
                </div>

                <div className="footer-column footer-contact">
                    <h3>Επικοινωνία</h3>
                    <span><i className="icon-map-pin" aria-hidden="true"></i> Θεσσαλονίκη</span>
                    <a href="tel:+306996832335"><i className="icon-phone" aria-hidden="true"></i> 699 683 2335</a>
                    <a href="tel:+306948308810"><i className="icon-phone" aria-hidden="true"></i> 694 830 8810</a>
                    <a href="mailto:technohome.gr@gmail.com"><i className="icon-mail" aria-hidden="true"></i> technohome.gr@gmail.com</a>
                </div>
            </div>

            <div className="container footer-bottom">
                <p>© {currentYear} TechnoHome.gr. Όλα τα δικαιώματα κατοχυρωμένα.</p>
                <div>
                    <a href="#">Όροι Χρήσης</a>
                    <a href="#">Πολιτική Απορρήτου</a>
                </div>
            </div>
        </footer>
    );
}
