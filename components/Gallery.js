function Gallery() {
    const [selectedImage, setSelectedImage] = React.useState(null);

    // Reduced to 3 images as requested
    const images = [
        {
            url: "https://app.trickle.so/storage/public/images/usr_1b48c29310000001/59bfef91-0fb8-44ce-bc4e-2c55f6b2cebb.jpeg",
            title: "Ανακαίνιση Κουζίνας"
        },
        {
            url: "https://app.trickle.so/storage/public/images/usr_1b48c29310000001/b8122eb2-3c43-4e02-aa58-2477df6ecb86.jpeg",
            title: "Πολυτελές Μπάνιο"
        },
        {
            url: "https://app.trickle.so/storage/public/images/usr_1b48c29310000001/a118368f-17ee-405d-bcb9-ea9e65a32abd.jpeg",
            title: "Σαλόνι & Δάπεδο"
        }
    ];

    const openLightbox = (img) => {
        setSelectedImage(img);
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    };

    const closeLightbox = () => {
        setSelectedImage(null);
        document.body.style.overflow = 'auto'; // Restore scrolling
    };

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

                {/* Grid reduced to 3 items */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {images.map((img, index) => (
                        <div 
                            key={index} 
                            onClick={() => openLightbox(img)}
                            className="group relative overflow-hidden rounded-xl aspect-[4/3] cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300"
                        >
                            <img 
                                src={img.url} 
                                alt={img.title} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-colors duration-300"></div>
                        </div>
                    ))}
                </div>

                {/* Facebook Button */}
                <div className="text-center">
                    <a 
                        href="https://www.facebook.com/profile.php?id=100063673203867" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn btn-primary shadow-lg shadow-sky-500/20 group inline-flex items-center gap-2"
                    >
                        <span>Δείτε περισσότερα στο Facebook</span>
                        <div className="icon-facebook text-xl group-hover:scale-110 transition-transform"></div>
                    </a>
                </div>
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div 
                    className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
                    onClick={closeLightbox}
                >
                    <button 
                        onClick={closeLightbox}
                        className="absolute top-4 right-4 text-white hover:text-[var(--accent-color)] transition-colors p-2"
                    >
                        <div className="icon-x text-4xl"></div>
                    </button>
                    
                    <div 
                        className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
                        onClick={e => e.stopPropagation()} // Prevent closing when clicking content
                    >
                        <img 
                            src={selectedImage.url} 
                            alt={selectedImage.title} 
                            className="w-auto h-auto max-w-full max-h-[85vh] rounded-lg shadow-2xl object-contain"
                        />
                        <h4 className="text-white text-xl font-bold mt-4 tracking-wide">
                            {selectedImage.title}
                        </h4>
                    </div>
                </div>
            )}
        </section>
    );
}