function Services() {
    const services = [
        {
            title: "Πλακάκια",
            description: "Τοποθέτηση πλακιδίων μπάνιου, κουζίνας και δαπέδου με απόλυτη ακρίβεια και υψηλή αισθητική.",
            icon: "icon-layout-grid",
            image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2670&auto=format&fit=crop"
        },
        {
            title: "Βάψιμο",
            description: "Ελαιοχρωματισμοί εσωτερικών και εξωτερικών χώρων, τεχνοτροπίες και φρεσκαρίσματα.",
            icon: "icon-paint-roller",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2670&auto=format&fit=crop"
        },
        {
            title: "Υδραυλικά",
            description: "Εγκατάσταση και συντήρηση υδραυλικών συστημάτων, ανακαίνιση μπάνιου και κουζίνας.",
            icon: "icon-wrench",
            image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=2670&auto=format&fit=crop"
        },
        {
            title: "Ηλεκτρολογικά",
            description: "Πλήρεις ηλεκτρολογικές εγκαταστάσεις, επισκευές βλαβών και αναβαθμίσεις πινάκων.",
            icon: "icon-zap",
            image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2669&auto=format&fit=crop"
        }
    ];

    return (
        <section id="services" className="section-padding bg-slate-50" data-name="services" data-file="components/Services.js">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-sm font-bold text-[var(--accent-color)] tracking-wider uppercase mb-2">ΟΙ ΥΠΗΡΕΣΙΕΣ ΜΑΣ</h2>
                    <h3 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Ολοκληρωμένες Λύσεις για το Σπίτι</h3>
                    <p className="text-lg text-slate-600">
                        Αναλαμβάνουμε κάθε εργασία με επαγγελματισμό, χρησιμοποιώντας σύγχρονο εξοπλισμό και ποιοτικά υλικά.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <div key={index} className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                            {/* Image Container */}
                            <div className="h-48 overflow-hidden relative">
                                <img 
                                    src={service.image} 
                                    alt={service.title} 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                                <div className="absolute bottom-4 left-4">
                                    <div className="w-10 h-10 rounded-lg bg-white/90 backdrop-blur flex items-center justify-center shadow-lg text-[var(--accent-color)]">
                                        <div className={`${service.icon} text-xl`}></div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Content */}
                            <div className="p-6">
                                <h4 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-[var(--accent-color)] transition-colors">
                                    {service.title}
                                </h4>
                                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                                    {service.description}
                                </p>
                                <div className="flex items-center text-[var(--accent-color)] font-medium text-sm group-hover:translate-x-1 transition-transform cursor-pointer">
                                    <span className="mr-1">Μάθετε περισσότερα</span>
                                    <div className="icon-arrow-right text-xs"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}