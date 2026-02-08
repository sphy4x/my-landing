function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-900 text-slate-300 pt-16 pb-8" data-name="footer" data-file="components/Footer.js">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <span className="text-2xl font-extrabold text-white mb-6 block">
                            Techno<span className="text-[var(--accent-color)]">Home.gr</span>
                        </span>
                        <p className="text-slate-400 mb-6 leading-relaxed">
                            Υψηλής ποιότητας ανακαινίσεις και τεχνικές υπηρεσίες στη Θεσσαλονίκη. 
                            Μεταμορφώνουμε τον χώρο σας με συνέπεια και επαγγελματισμό.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[var(--accent-color)] transition-colors text-white">
                                <div className="icon-facebook text-lg"></div>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[var(--accent-color)] transition-colors text-white">
                                <div className="icon-instagram text-lg"></div>
                            </a>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6">Σύνδεσμοι</h4>
                        <ul className="space-y-3">
                            <li><a href="#hero" className="hover:text-[var(--accent-color)] transition-colors">Αρχική</a></li>
                            <li><a href="#about" className="hover:text-[var(--accent-color)] transition-colors">Σχετικά με εμάς</a></li>
                            <li><a href="#services" className="hover:text-[var(--accent-color)] transition-colors">Υπηρεσίες</a></li>
                            <li><a href="#contact" className="hover:text-[var(--accent-color)] transition-colors">Επικοινωνία</a></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6">Υπηρεσίες</h4>
                        <ul className="space-y-3">
                            <li><a href="#services" className="hover:text-[var(--accent-color)] transition-colors">Ανακαινίσεις</a></li>
                            <li><a href="#services" className="hover:text-[var(--accent-color)] transition-colors">Τοποθέτηση Πλακιδίων</a></li>
                            <li><a href="#services" className="hover:text-[var(--accent-color)] transition-colors">Ελαιοχρωματισμοί</a></li>
                            <li><a href="#services" className="hover:text-[var(--accent-color)] transition-colors">Υδραυλικά</a></li>
                            <li><a href="#services" className="hover:text-[var(--accent-color)] transition-colors">Ηλεκτρολογικά</a></li>
                        </ul>
                    </div>

                    {/* Contact - Short */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6">Επικοινωνία</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <div className="icon-map-pin mt-1 mr-3 text-[var(--accent-color)]"></div>
                                <span>Αγνώστου Στρατιώτη 23,<br/>Θεσσαλονίκη</span>
                            </li>
                            <li className="flex items-center">
                                <div className="icon-phone mr-3 text-[var(--accent-color)]"></div>
                                <a href="tel:+306996832335" className="hover:text-white">699 683 2335</a>
                            </li>
                            <li className="flex items-center">
                                <div className="icon-mail mr-3 text-[var(--accent-color)]"></div>
                                <a href="mailto:technohome.gr@gmail.com" className="hover:text-white">technohome.gr@gmail.com</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
                    <p>© {currentYear} TechnoHome. Όλα τα δικαιώματα κατοχυρωμένα.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-slate-300">Όροι Χρήσης</a>
                        <a href="#" className="hover:text-slate-300">Πολιτική Απορρήτου</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}