function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isVisible, setIsVisible] = React.useState(true);
    const [lastScrollY, setLastScrollY] = React.useState(0);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const scrollToSection = (id) => {
        setIsMenuOpen(false);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    React.useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            // Show navbar if at the very top or scrolling up
            // Hide if scrolling down and not at the top
            if (currentScrollY < 10) {
                setIsVisible(true);
            } else if (currentScrollY > lastScrollY) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <nav 
            className={`fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`} 
            data-name="navbar" 
            data-file="components/Navbar.js"
        >
            <div className="container-custom">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => scrollToSection('hero')}>
                        <span className="text-2xl font-extrabold text-[var(--primary-color)]">
                            Techno<span className="text-[var(--accent-color)]">Home</span>
                        </span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <button onClick={() => scrollToSection('about')} className="text-slate-600 hover:text-[var(--accent-color)] font-medium transition-colors">
                            Σχετικά
                        </button>
                        <button onClick={() => scrollToSection('services')} className="text-slate-600 hover:text-[var(--accent-color)] font-medium transition-colors">
                            Υπηρεσίες
                        </button>
                        <button onClick={() => scrollToSection('contact')} className="btn btn-primary shadow-lg shadow-sky-500/20">
                            Επικοινωνία
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={toggleMenu} className="text-slate-700 hover:text-[var(--accent-color)] p-2">
                            <div className={isMenuOpen ? "icon-x text-2xl" : "icon-menu text-2xl"}></div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-b border-slate-200 absolute w-full shadow-xl">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        <button 
                            onClick={() => scrollToSection('about')} 
                            className="block w-full text-left px-3 py-3 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-md"
                        >
                            Σχετικά με εμάς
                        </button>
                        <button 
                            onClick={() => scrollToSection('services')} 
                            className="block w-full text-left px-3 py-3 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-md"
                        >
                            Υπηρεσίες
                        </button>
                        <button 
                            onClick={() => scrollToSection('contact')} 
                            className="block w-full text-left px-3 py-3 text-base font-medium text-[var(--accent-color)] font-bold bg-slate-50 rounded-md"
                        >
                            Επικοινωνία
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}