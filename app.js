class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
    }

    render() {
        if (this.state.hasError) {
            return (
                <main className="error-screen">
                    <p className="eyebrow">TECHNOHOME.GR</p>
                    <h1>Κάτι πήγε στραβά.</h1>
                    <p>Παρακαλώ ανανεώστε τη σελίδα και δοκιμάστε ξανά.</p>
                    <button className="button button-primary" onClick={() => window.location.reload()}>
                        Ανανέωση Σελίδας
                    </button>
                </main>
            );
        }

        return this.props.children;
    }
}

function App() {
    React.useEffect(() => {
        const root = document.documentElement;
        root.classList.add('motion-ready');

        const revealItems = Array.from(document.querySelectorAll('[data-reveal]'));
        if (!('IntersectionObserver' in window)) {
            revealItems.forEach((item) => item.classList.add('is-visible'));
            return undefined;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -48px' });

        revealItems.forEach((item) => observer.observe(item));
        return () => observer.disconnect();
    }, []);

    return (
        <div className="site-shell" data-name="app" data-file="app.js">
            <Navbar />
            <main id="main-content">
                <Hero />
                <About />
                <Services />
                <Process />
                <Gallery />
                <Reviews />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ErrorBoundary>
        <App />
    </ErrorBoundary>
);
