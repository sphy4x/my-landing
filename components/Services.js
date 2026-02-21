function Services() {
    const services = [
        {
            id: "tiles",
            title: "Πλακάκια",
            description: "Τοποθέτηση πλακιδίων μπάνιου, κουζίνας και δαπέδου με απόλυτη ακρίβεια και υψηλή αισθητική.",
            icon: "icon-layout-grid",
            image: "https://app.trickle.so/storage/public/images/usr_1b48c29310000001/ec2e658d-da9b-4bab-8dc5-27323809a336.jpeg"
        },
        {
            id: "painting",
            title: "Βάψιμο",
            description: "Ελαιοχρωματισμοί εσωτερικών και εξωτερικών χώρων, τεχνοτροπίες και φρεσκαρίσματα.",
            icon: "icon-paint-roller",
            image: "https://app.trickle.so/storage/public/images/usr_1b48c29310000001/bf917846-3e1c-4a4f-9a77-1ee080c5a8fe.jpeg"
        },
        {
            id: "plumbing",
            title: "Υδραυλικά",
            description: "Εγκατάσταση και συντήρηση υδραυλικών συστημάτων, ανακαίνιση μπάνιου και κουζίνας.",
            icon: "icon-wrench",
            image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=2670&auto=format&fit=crop"
        },
        {
            id: "demolition",
            title: "Αποξηλώσεις & Γκρεμίσματα",
            description: "Αποξηλώσεις και γκρεμίσματα χώρων με ασφάλεια και συνέπεια. Καθαρίζουμε και προετοιμάζουμε τον χώρο για την ανακαίνιση.",
            icon: "icon-hammer",
            image: "https://app.trickle.so/storage/public/images/usr_1b48c29310000001/0f98445a-4156-430d-8f93-0ab586e94c8c.jpeg"
        }
    ];

    const handleServiceClick = (serviceId) => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
            
            // Try to pre-select the service in the contact form
            // We use a small timeout to ensure scrolling starts first
            setTimeout(() => {
                const serviceSelect = document.getElementById('service');
                if (serviceSelect) {
                    serviceSelect.value = serviceId;
                    // Add a highlight effect to the select box
                    serviceSelect.focus();
                    serviceSelect.classList.add('ring-4', 'ring-sky-200');
                    setTimeout(() => serviceSelect.classList.remove('ring-4', 'ring-sky-200'), 1000);
                }
            }, 500);
        }
    };

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
                        <div 
                            key={index} 
                            onClick={() => handleServiceClick(service.id)}
                            className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer relative"
                        >
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
                                <div className="flex justify-between items-start mb-3">
                                    <h4 className="text-xl font-bold text-slate-900 group-hover:text-[var(--accent-color)] transition-colors">
                                        {service.title}
                                    </h4>
                                    {/* Arrow icon that appears on hover/active to indicate clickability */}
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[var(--accent-color)]">
                                        <div className="icon-arrow-up-right text-xl"></div>
                                    </div>
                                </div>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    {service.description}
                                </p>
                            </div>
                            
                            {/* Full card ripple or overlay effect on hover can be added here if needed, but the shadow and lift is usually enough */}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}