function Reviews() {
    const [reviews, setReviews] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [showForm, setShowForm] = React.useState(false);
    const [formData, setFormData] = React.useState({
        name: '',
        rating: 5,
        comment: ''
    });
    const [submitting, setSubmitting] = React.useState(false);

    const fetchReviews = async () => {
        try {
            const result = await trickleListObjects('review', 50, true);
            if (result && result.items) {
                // Parse the date for sorting if needed, but the API sorts by objectId (time) roughly
                setReviews(result.items);
            }
        } catch (error) {
            console.error('Failed to fetch reviews:', error);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchReviews();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleRatingChange = (rating) => {
        setFormData(prev => ({
            ...prev,
            rating: rating
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await trickleCreateObject('review', {
                name: formData.name,
                rating: parseInt(formData.rating),
                comment: formData.comment,
                date: new Date().toISOString()
            });
            
            // Reset form and reload reviews
            setFormData({ name: '', rating: 5, comment: '' });
            setShowForm(false);
            await fetchReviews();
            alert('Η κριτική σας καταχωρήθηκε επιτυχώς!');
        } catch (error) {
            console.error('Failed to submit review:', error);
            alert('Υπήρξε ένα σφάλμα κατά την καταχώρηση. Παρακαλώ δοκιμάστε ξανά.');
        } finally {
            setSubmitting(false);
        }
    };

    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <div 
                key={i} 
                className={`w-4 h-4 ${i < rating ? 'icon-star text-yellow-400 fill-yellow-400' : 'icon-star text-slate-300'}`}
            ></div>
        ));
    };

    return (
        <section id="reviews" className="section-padding bg-slate-50" data-name="reviews" data-file="components/Reviews.js">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-sm font-bold text-[var(--accent-color)] tracking-wider uppercase mb-2">ΑΞΙΟΛΟΓΗΣΕΙΣ</h2>
                        <h3 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Τι λένε οι πελάτες μας</h3>
                        <p className="text-lg text-slate-600">
                            Η εμπιστοσύνη σας είναι η δύναμή μας. Διαβάστε πραγματικές εμπειρίες από ανθρώπους που μας εμπιστεύτηκαν.
                        </p>
                    </div>
                    <button 
                        onClick={() => setShowForm(!showForm)}
                        className="btn btn-outline border-slate-300 text-slate-700 hover:border-[var(--accent-color)] hover:bg-[var(--accent-color)] hover:text-white flex-shrink-0"
                    >
                        <span className="mr-2">{showForm ? 'Κλείσιμο' : 'Γράψτε μια κριτική'}</span>
                        <div className={showForm ? "icon-x" : "icon-pencil"}></div>
                    </button>
                </div>

                {/* Review Form */}
                {showForm && (
                    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-slate-100 mb-12 animate-fade-in">
                        <h4 className="text-xl font-bold mb-6 text-slate-900">Νέα Αξιολόγηση</h4>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Όνομα</label>
                                    <input 
                                        type="text" 
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[var(--accent-color)] focus:border-transparent outline-none"
                                        placeholder="Το όνομά σας"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Βαθμολογία</label>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => handleRatingChange(star)}
                                                className="focus:outline-none transition-transform hover:scale-110"
                                            >
                                                <div className={`w-8 h-8 ${star <= formData.rating ? 'icon-star text-yellow-400 fill-yellow-400' : 'icon-star text-slate-300'}`}></div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Σχόλιο</label>
                                <textarea 
                                    name="comment"
                                    value={formData.comment}
                                    onChange={handleInputChange}
                                    required
                                    rows="3"
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[var(--accent-color)] focus:border-transparent outline-none"
                                    placeholder="Η εμπειρία σας μαζί μας..."
                                ></textarea>
                            </div>
                            <div className="flex justify-end">
                                <button 
                                    type="submit" 
                                    disabled={submitting}
                                    className="btn btn-primary"
                                >
                                    {submitting ? 'Αποστολή...' : 'Δημοσίευση Αξιολόγησης'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Reviews Grid */}
                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--accent-color)]"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {reviews.length > 0 ? (
                            reviews.map((item) => (
                                <div key={item.objectId} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col h-full hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center space-x-1">
                                            {renderStars(item.objectData.rating)}
                                        </div>
                                        <span className="text-xs text-slate-400">
                                            {new Date(item.objectData.date).toLocaleDateString('el-GR')}
                                        </span>
                                    </div>
                                    <p className="text-slate-600 mb-6 flex-grow italic">
                                        "{item.objectData.comment}"
                                    </p>
                                    <div className="flex items-center mt-auto">
                                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 mr-3">
                                            <div className="icon-user text-lg"></div>
                                        </div>
                                        <span className="font-bold text-slate-900">{item.objectData.name}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12 text-slate-500">
                                Δεν υπάρχουν ακόμα αξιολογήσεις. Γίνετε ο πρώτος που θα γράψει!
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}