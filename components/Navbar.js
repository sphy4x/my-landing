function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isScrolled, setIsScrolled] = React.useState(false);

    const scrollToSection = (id) => {
        setIsMenuOpen(false);
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    React.useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 24);
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    React.useEffect(() => {
        document.body.classList.toggle('menu-open', isMenuOpen);
        return () => document.body.classList.remove('menu-open');
    }, [isMenuOpen]);

    return (
        <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`} data-name="navbar" data-file="components/Navbar.js">
            <div className="container header-inner">
                <button className="brand" onClick={() => scrollToSection('hero')} aria-label="TechnoHome.gr — Αρχική">
                    <img
                        src="https://app.trickle.so/storage/public/images/usr_1b48c29310000001/c1d5e58f-903e-470b-bea9-673db71c30d0.123"
                        alt="TechnoHome.gr"
                    />
                </button>

                <nav className="desktop-nav" aria-label="Κύρια πλοήγηση">
                    <button onClick={() => scrollToSection('about')}>Σχετικά</button>
                    <button onClick={() => scrollToSection('services')}>Υπηρεσίες</button>
                    <button onClick={() => scrollToSection('process')}>Διαδικασία</button>
                    <button onClick={() => scrollToSection('gallery')}>Έργα</button>
                    <button onClick={() => scrollToSection('reviews')}>Αξιολογήσεις</button>
                </nav>

                <button className="header-cta" onClick={() => scrollToSection('contact')}>
                    Λάβετε Προσφορά
                </button>

                <button
                    className="menu-toggle"
                    onClick={() => setIsMenuOpen((open) => !open)}
                    aria-expanded={isMenuOpen}
                    aria-controls="mobile-menu"
                    aria-label={isMenuOpen ? 'Κλείσιμο μενού' : 'Άνοιγμα μενού'}
                >
                    <span className={isMenuOpen ? 'icon-x' : 'icon-menu'} aria-hidden="true"></span>
                </button>
            </div>

            <div id="mobile-menu" className={`mobile-nav ${isMenuOpen ? 'is-open' : ''}`}>
                <button onClick={() => scrollToSection('about')}>Σχετικά με εμάς</button>
                <button onClick={() => scrollToSection('services')}>Υπηρεσίες</button>
                <button onClick={() => scrollToSection('process')}>Διαδικασία</button>
                <button onClick={() => scrollToSection('gallery')}>Έργα</button>
                <button onClick={() => scrollToSection('reviews')}>Αξιολογήσεις</button>
                <button className="mobile-nav-cta" onClick={() => scrollToSection('contact')}>Λάβετε Προσφορά</button>
            </div>
        </header>
    );
}
