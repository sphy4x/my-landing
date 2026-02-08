function Gallery() {
    const images = [
        {
            url: "https://images.unsplash.com/photo-1484154218962-a1c002085d2f?q=80&w=2671&auto=format&fit=crop",
            title: "Ανακαίνιση Κουζίνας"
        },
        {
            url: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=2664&auto=format&fit=crop",
            title: "Πολυτελές Μπάνιο"
        },
        {
            url: "https://images.unsplash.com/photo-1562259920-47afc305f369?q=80&w=2670&auto=format&fit=crop",
            title: "Σαλόνι & Δάπεδο"
        },
        {
            url: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2668&auto=format&fit=crop",
            title: "Εξωτερικοί Χώροι"
        },
        {
            url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2670&auto=format&fit=crop",
            title: "Υπνοδωμάτιο"
        },
        {
            url: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?q=80&w=2670&auto=format&fit=crop",
            title: "Φωτισμός"
        }
    ];

    return (
        <section id="gallery" className="section-padding bg-white" data-name="gallery" data-file="components/Gallery.js">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-sm font-bold text-[var(--accent-color)] tracking-wider uppercase mb-2">ΤΑ ΕΡΓΑ ΜΑΣ</h2>
                    <h3 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Δείγματα Δουλειάς</h3>
                    <p className="text-lg text-slate-600">
                        Φωτογραφίες από πρόσφατες ανακαινίσεις και τεχνικές εργασίες που έχουμε ολοκληρώσει.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map((img, index) => (
                        <div key={index} className="group relative overflow-hidden rounded-xl aspect-[4/3] cursor-pointer">
                            <img 
                                src={img.url} 
                                alt={img.title} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <h4 className="text-white text-xl font-bold mb-2">{img.title}</h4>
                                    <span className="inline-block px-4 py-2 border border-white/30 rounded-full text-sm text-white backdrop-blur-sm">
                                        Προβολή
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}