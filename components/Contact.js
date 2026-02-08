function Contact() {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Ευχαριστούμε για το μήνυμα! Θα επικοινωνήσουμε σύντομα μαζί σας.');
    };

    return (
        <section id="contact" className="section-padding bg-white" data-name="contact" data-file="components/Contact.js">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Info */}
                    <div>
                        <h2 className="text-sm font-bold text-[var(--accent-color)] tracking-wider uppercase mb-2">ΕΠΙΚΟΙΝΩΝΙΑ</h2>
                        <h3 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">Ζητήστε Προσφορά</h3>
                        <p className="text-lg text-slate-600 mb-10">
                            Είμαστε εδώ για να απαντήσουμε σε κάθε σας ερώτηση και να συζητήσουμε τις ανάγκες του χώρου σας.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start">
                                <div className="w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center text-[var(--accent-color)] flex-shrink-0">
                                    <div className="icon-phone text-2xl"></div>
                                </div>
                                <div className="ml-5">
                                    <h4 className="text-lg font-bold text-slate-900">Τηλέφωνο</h4>
                                    <p className="text-slate-600 mt-1 mb-2">Δευτέρα - Παρασκευή, 9πμ - 6μμ</p>
                                    <a href="tel:+306996832335" className="text-xl font-bold text-[var(--accent-color)] hover:text-sky-700">
                                        699 683 2335
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center text-[var(--accent-color)] flex-shrink-0">
                                    <div className="icon-mail text-2xl"></div>
                                </div>
                                <div className="ml-5">
                                    <h4 className="text-lg font-bold text-slate-900">Email</h4>
                                    <p className="text-slate-600 mt-1 mb-2">Στείλτε μας μήνυμα οποιαδήποτε στιγμή</p>
                                    <a href="mailto:technohome.gr@gmail.com" className="text-lg font-medium text-slate-800 hover:text-[var(--accent-color)] transition-colors">
                                        technohome.gr@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center text-[var(--accent-color)] flex-shrink-0">
                                    <div className="icon-map-pin text-2xl"></div>
                                </div>
                                <div className="ml-5">
                                    <h4 className="text-lg font-bold text-slate-900">Διεύθυνση</h4>
                                    <p className="text-slate-600 mt-1">
                                        Αγνώστου Στρατιώτη 23<br/>
                                        Θεσσαλονίκη, Ελλάδα
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-slate-50 p-8 rounded-2xl shadow-lg border border-slate-100">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Όνομα</label>
                                    <input 
                                        type="text" 
                                        id="name" 
                                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[var(--accent-color)] focus:border-transparent outline-none transition-all"
                                        placeholder="Το όνομά σας"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">Τηλέφωνο</label>
                                    <input 
                                        type="tel" 
                                        id="phone" 
                                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[var(--accent-color)] focus:border-transparent outline-none transition-all"
                                        placeholder="Το τηλέφωνό σας"
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[var(--accent-color)] focus:border-transparent outline-none transition-all"
                                    placeholder="Το email σας"
                                />
                            </div>

                            <div>
                                <label htmlFor="service" className="block text-sm font-medium text-slate-700 mb-2">Υπηρεσία</label>
                                <select 
                                    id="service"
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[var(--accent-color)] focus:border-transparent outline-none transition-all bg-white"
                                >
                                    <option value="">Επιλέξτε υπηρεσία...</option>
                                    <option value="renovation">Γενική Ανακαίνιση</option>
                                    <option value="tiles">Πλακάκια</option>
                                    <option value="painting">Βάψιμο</option>
                                    <option value="plumbing">Υδραυλικά</option>
                                    <option value="electrical">Ηλεκτρολογικά</option>
                                    <option value="other">Άλλο</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">Μήνυμα</label>
                                <textarea 
                                    id="message" 
                                    rows="4" 
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[var(--accent-color)] focus:border-transparent outline-none transition-all resize-none"
                                    placeholder="Περιγράψτε μας τι χρειάζεστε..."
                                ></textarea>
                            </div>

                            <button type="submit" className="w-full btn btn-primary py-4 text-lg shadow-lg hover:shadow-xl transform active:scale-95 transition-all">
                                Αποστολή Μηνύματος
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}