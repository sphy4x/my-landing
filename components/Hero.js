function Hero() {
    const scrollToContact = () => {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div id="hero" className="relative h-screen min-h-[600px] flex items-center" data-name="hero" data-file="components/Hero.js">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2831&auto=format&fit=crop" 
                    alt="Modern Home Renovation" 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-slate-900/60 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>
            </div>

            {/* Content */}
            <div className="container-custom relative z-10 pt-20">
                <div className="max-w-3xl text-white">
                    <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
                        <span className="icon-star text-yellow-400 text-sm"></span>
                        <span className="text-sm font-medium tracking-wide text-slate-100">Ποιότητα & Αξιοπιστία</span>
                    </div>
                    
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                        Ανακαινίσεις & <br/>
                        <span className="text-sky-400">Υπηρεσίες Σπιτιού</span>
                    </h1>
                    
                    <p className="text-lg md:text-xl text-slate-200 mb-10 leading-relaxed max-w-2xl">
                        Η TechnoHome αναλαμβάνει ολοκληρωμένες ή μερικές ανακαινίσεις, 
                        μεταμορφώνοντας τον χώρο σας με επαγγελματισμό και συνέπεια.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button onClick={scrollToContact} className="btn btn-primary shadow-lg shadow-sky-900/50">
                            <span className="mr-2">Ζήτα Προσφορά</span>
                            <span className="icon-arrow-right"></span>
                        </button>
                        <button onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })} className="btn btn-outline">
                            Οι Υπηρεσίες μας
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}