function Contact() {
    return (
        <section id="contact" className="section-padding bg-white" data-name="contact" data-file="components/Contact.js">
            <div className="container-custom">
                <div className="max-w-3xl mx-auto">
                    {/* Contact Info */}
                    <div className="text-center">
                        <h2 className="text-sm font-bold text-[var(--accent-color)] tracking-wider uppercase mb-2">ΕΠΙΚΟΙΝΩΝΙΑ</h2>
                        <h3 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">Ζητήστε Προσφορά</h3>
                        <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
                            Είμαστε εδώ για να απαντήσουμε σε κάθε σας ερώτηση και να συζητήσουμε τις ανάγκες του χώρου σας.
                        </p>

                        <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full border border-slate-200 shadow-sm mb-10 mx-auto transform hover:scale-105 transition-transform duration-300">
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-[var(--accent-color)]">
                                <div className="icon-user-round text-xl"></div>
                            </div>
                            <div className="text-left">
                                <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Υπευθυνος Τεχνικος</p>
                                <p className="text-slate-900 font-bold text-lg">Κώστας Τζέζαρ</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4 text-left">
                            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-slate-50 border border-slate-100 h-full">
                                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-[var(--accent-color)] mb-4 shadow-sm">
                                    <div className="icon-phone text-2xl"></div>
                                </div>
                                <h4 className="text-lg font-bold text-slate-900 mb-2">Τηλέφωνο</h4>
                                <p className="text-slate-600 text-sm mb-4">Δευτέρα - Παρασκευή, 9πμ - 6μμ</p>
                                <div className="flex flex-col gap-1">
                                    <a href="tel:+306996832335" className="text-lg font-bold text-[var(--accent-color)] hover:text-sky-700">
                                        699 683 2335
                                    </a>
                                    <a href="tel:+306948308810" className="text-lg font-bold text-[var(--accent-color)] hover:text-sky-700">
                                        694 830 8810
                                    </a>
                                </div>
                            </div>

                            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-slate-50 border border-slate-100 h-full">
                                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-[var(--accent-color)] mb-4 shadow-sm">
                                    <div className="icon-mail text-2xl"></div>
                                </div>
                                <h4 className="text-lg font-bold text-slate-900 mb-2">Email</h4>
                                <p className="text-slate-600 text-sm mb-4">Στείλτε μας μήνυμα</p>
                                <a href="mailto:technohome.gr@gmail.com" className="text-lg font-medium text-slate-800 hover:text-[var(--accent-color)] transition-colors break-all">
                                    technohome.gr@gmail.com
                                </a>
                            </div>

                            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-slate-50 border border-slate-100 h-full">
                                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-[var(--accent-color)] mb-4 shadow-sm">
                                    <div className="icon-map-pin text-2xl"></div>
                                </div>
                                <h4 className="text-lg font-bold text-slate-900 mb-2">Διεύθυνση</h4>
                                <p className="text-slate-600 text-sm mb-4">Επισκεφθείτε μας</p>
                                <p className="text-slate-800 font-medium">
                                    Θεσσαλονίκη, Ελλάδα
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}