function About() {
    return (
        <section id="about" className="section-padding bg-white" data-name="about" data-file="components/About.js">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Image/Visual Side */}
                    <div className="relative">
                        <div className="absolute -top-4 -left-4 w-72 h-72 bg-sky-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
                        <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
                        
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                            <img 
                                src="https://images.unsplash.com/photo-1581094794329-cd119277f838?q=80&w=2668&auto=format&fit=crop" 
                                alt="Renovation Professional" 
                                className="w-full h-auto object-cover"
                            />
                        </div>
                        
                        {/* Stats Card */}
                        <div className="absolute -bottom-6 -right-6 md:right-10 bg-white p-6 rounded-xl shadow-xl border border-slate-100 max-w-xs">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center text-[var(--accent-color)]">
                                    <span className="icon-check-check text-xl"></span>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500">Εγγύηση Ποιότητας</p>
                                    <p className="font-bold text-slate-900">100% Ικανοποίηση</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Side */}
                    <div>
                        <h2 className="text-sm font-bold text-[var(--accent-color)] tracking-wider uppercase mb-2">ΣΧΕΤΙΚΑ ΜΕ ΕΜΑΣ</h2>
                        <h3 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">Δημιουργούμε τον χώρο που ονειρεύεστε</h3>
                        
                        <div className="space-y-6 text-lg text-slate-600">
                            <p>
                                Η <span className="font-bold text-slate-900">TechnoHome</span> ειδικεύεται στις ανακαινίσεις και τις τεχνικές εργασίες, 
                                προσφέροντας λύσεις που συνδυάζουν αισθητική και λειτουργικότητα.
                            </p>
                            <p>
                                Η φιλοσοφία μας βασίζεται στην ποιότητα, την αξιοπιστία και την τήρηση των χρονοδιαγραμμάτων. 
                                Η εμπειρία μας σε κάθε έργο, μικρό ή μεγάλο, εξασφαλίζει την πλήρη ικανοποίηση των πελατών μας.
                            </p>
                        </div>

                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3">
                                <div className="icon-shield-check text-[var(--accent-color)]"></div>
                                <span className="font-medium text-slate-700">Πιστοποιημένα Υλικά</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="icon-clock text-[var(--accent-color)]"></div>
                                <span className="font-medium text-slate-700">Συνέπεια στο Χρόνο</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="icon-users text-[var(--accent-color)]"></div>
                                <span className="font-medium text-slate-700">Έμπειρο Προσωπικό</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="icon-piggy-bank text-[var(--accent-color)]"></div>
                                <span className="font-medium text-slate-700">Ανταγωνιστικές Τιμές</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}