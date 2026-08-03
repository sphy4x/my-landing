function Reviews() {
    const [reviews, setReviews] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [showForm, setShowForm] = React.useState(false);
    const [formData, setFormData] = React.useState({ name: '', rating: 5, comment: '' });
    const [submitting, setSubmitting] = React.useState(false);

    const fetchReviews = async () => {
        try {
            if (!window.loadComments) {
                setLoading(false);
                return;
            }

            const result = await window.loadComments();
            if (Array.isArray(result)) {
                setReviews(result.map((item) => ({
                    objectId: item.id,
                    objectData: {
                        name: item.author,
                        comment: item.text,
                        rating: item.rating || 5,
                        date: item.created_at
                    }
                })));
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

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((current) => ({ ...current, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitting(true);
        try {
            if (!window.sendComment) throw new Error('Supabase is not initialized');
            await window.sendComment(formData.name, formData.comment);
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

    const renderStars = (rating) => (
        <span className="stars" aria-label={`${rating} από 5 αστέρια`}>
            {[1, 2, 3, 4, 5].map((star) => (
                <i className={star <= rating ? 'icon-star is-active' : 'icon-star'} key={star} aria-hidden="true"></i>
            ))}
        </span>
    );

    return (
        <section id="reviews" className="section reviews-section" data-name="reviews" data-file="components/Reviews.js">
            <div className="container">
                <div className="reviews-head" data-reveal>
                    <div>
                        <p className="section-label">Αξιολογήσεις</p>
                        <h2 className="section-title">Τι λένε οι <span>πελάτες μας.</span></h2>
                        <p className="section-intro">
                            Η εμπιστοσύνη σας είναι η δύναμή μας. Διαβάστε πραγματικές εμπειρίες από ανθρώπους που μας εμπιστεύτηκαν.
                        </p>
                    </div>
                    <button className="button button-outline" onClick={() => setShowForm((visible) => !visible)} aria-expanded={showForm}>
                        {showForm ? 'Κλείσιμο' : 'Γράψτε μια κριτική'}
                        <span className={showForm ? 'icon-x' : 'icon-pencil'} aria-hidden="true"></span>
                    </button>
                </div>

                {showForm && (
                    <form className="review-form" onSubmit={handleSubmit}>
                        <div className="form-field">
                            <label htmlFor="review-name">Όνομα</label>
                            <input
                                id="review-name"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                placeholder="Το όνομά σας"
                            />
                        </div>

                        <fieldset className="rating-field">
                            <legend>Βαθμολογία</legend>
                            <div>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setFormData((current) => ({ ...current, rating: star }))}
                                        aria-label={`${star} αστέρια`}
                                        aria-pressed={star === formData.rating}
                                    >
                                        <span className={`icon-star ${star <= formData.rating ? 'is-active' : ''}`} aria-hidden="true"></span>
                                    </button>
                                ))}
                            </div>
                        </fieldset>

                        <div className="form-field review-comment">
                            <label htmlFor="review-comment">Σχόλιο</label>
                            <textarea
                                id="review-comment"
                                name="comment"
                                value={formData.comment}
                                onChange={handleInputChange}
                                required
                                rows="4"
                                placeholder="Η εμπειρία σας μαζί μας..."
                            ></textarea>
                        </div>

                        <button className="button button-primary review-submit" type="submit" disabled={submitting}>
                            {submitting ? 'Αποστολή...' : 'Δημοσίευση Αξιολόγησης'}
                        </button>
                    </form>
                )}

                {loading ? (
                    <div className="reviews-loading" role="status">
                        <span></span>
                        Φόρτωση αξιολογήσεων
                    </div>
                ) : reviews.length > 0 ? (
                    <div className="reviews-grid">
                        {reviews.map((review, index) => (
                            <article className="review-card" key={review.objectId} data-reveal style={{ transitionDelay: `${index * 70}ms` }}>
                                <div className="review-card-top">
                                    {renderStars(review.objectData.rating)}
                                    <time dateTime={review.objectData.date}>
                                        {new Date(review.objectData.date).toLocaleDateString('el-GR')}
                                    </time>
                                </div>
                                <blockquote>“{review.objectData.comment}”</blockquote>
                                <div className="review-author">
                                    <span>{review.objectData.name ? review.objectData.name.charAt(0).toUpperCase() : 'T'}</span>
                                    <strong>{review.objectData.name}</strong>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="reviews-empty" data-reveal>
                        <span className="icon-message-square" aria-hidden="true"></span>
                        <p>Δεν υπάρχουν ακόμα αξιολογήσεις. Γίνετε ο πρώτος που θα γράψει!</p>
                    </div>
                )}
            </div>
        </section>
    );
}
