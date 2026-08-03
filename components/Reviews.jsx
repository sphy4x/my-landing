import React from 'react';
import { AlertCircle, MessageSquare, Pencil, Star, X } from 'lucide-react';

const initialForm = { name: '', rating: 5, comment: '', website: '', consent: false };

export default function Reviews() {
  const [reviews, setReviews] = React.useState([]);
  const [status, setStatus] = React.useState('loading');
  const [showForm, setShowForm] = React.useState(false);
  const [formData, setFormData] = React.useState(initialForm);
  const [submitting, setSubmitting] = React.useState(false);
  const [feedback, setFeedback] = React.useState('');

  const fetchReviews = React.useCallback(async () => {
    try {
      const { loadApprovedReviews } = await import('../lib/supabaseClient.js');
      const data = await loadApprovedReviews();
      setReviews(data);
      setStatus('ready');
    } catch (error) {
      console.warn('Reviews are temporarily unavailable:', error.message);
      setStatus('error');
    }
  }, []);

  React.useEffect(() => { fetchReviews(); }, [fetchReviews]);

  const handleInputChange = (event) => {
    const { name, value, checked, type } = event.target;
    setFormData((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.website) {
      setFeedback('Η αξιολόγησή σας στάλθηκε για έλεγχο. Ευχαριστούμε!');
      return;
    }

    setSubmitting(true);
    setFeedback('');
    try {
      const { submitReview } = await import('../lib/supabaseClient.js');
      await submitReview({ author: formData.name, text: formData.comment, rating: formData.rating });
      setFormData(initialForm);
      setShowForm(false);
      setFeedback('Η αξιολόγησή σας στάλθηκε και θα δημοσιευτεί μετά από έλεγχο. Ευχαριστούμε!');
    } catch (error) {
      console.warn('Review submission failed:', error.message);
      setFeedback('Η αποστολή δεν ολοκληρώθηκε. Παρακαλώ δοκιμάστε ξανά αργότερα.');
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating) => (
    <span className="stars" aria-label={`${rating} από 5 αστέρια`}>
      {[1, 2, 3, 4, 5].map((star) => <Star key={star} size={17} className={star <= rating ? 'is-active' : ''} aria-hidden="true" />)}
    </span>
  );

  return (
    <section id="reviews" className="section reviews-section">
      <div className="container">
        <div className="reviews-head" data-reveal>
          <div>
            <p className="section-label">Αξιολογήσεις</p>
            <h2 className="section-title">Τι λένε οι <span>πελάτες μας.</span></h2>
            <p className="section-intro">Οι νέες αξιολογήσεις ελέγχονται πριν δημοσιευτούν, ώστε το περιεχόμενο να παραμένει πραγματικό και χρήσιμο.</p>
          </div>
          <button className="button button-outline" onClick={() => setShowForm((visible) => !visible)} aria-expanded={showForm}>
            {showForm ? 'Κλείσιμο' : 'Γράψτε μια κριτική'}
            {showForm ? <X size={17} aria-hidden="true" /> : <Pencil size={17} aria-hidden="true" />}
          </button>
        </div>

        {showForm && (
          <form className="review-form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="review-name">Όνομα</label>
              <input id="review-name" type="text" name="name" minLength="2" maxLength="80" value={formData.name} onChange={handleInputChange} required placeholder="Το όνομά σας" />
            </div>

            <fieldset className="rating-field">
              <legend>Βαθμολογία</legend>
              <div>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} type="button" onClick={() => setFormData((current) => ({ ...current, rating: star }))} aria-label={`${star} αστέρια`} aria-pressed={star === formData.rating}>
                    <Star size={25} className={star <= formData.rating ? 'is-active' : ''} aria-hidden="true" />
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="form-field review-comment">
              <label htmlFor="review-comment">Σχόλιο</label>
              <textarea id="review-comment" name="comment" minLength="10" maxLength="1000" value={formData.comment} onChange={handleInputChange} required rows="4" placeholder="Η εμπειρία σας μαζί μας..."></textarea>
            </div>

            <div className="honeypot-field" aria-hidden="true">
              <label htmlFor="review-website">Ιστότοπος</label>
              <input id="review-website" name="website" tabIndex="-1" autoComplete="off" value={formData.website} onChange={handleInputChange} />
            </div>

            <label className="consent-field review-consent">
              <input type="checkbox" name="consent" checked={formData.consent} onChange={handleInputChange} required />
              <span>Συμφωνώ με την επεξεργασία της αξιολόγησης σύμφωνα με την <a href="/privacy/">Πολιτική Απορρήτου</a>.</span>
            </label>

            <button className="button button-primary review-submit" type="submit" disabled={submitting}>
              {submitting ? 'Αποστολή...' : 'Αποστολή για Έλεγχο'}
            </button>
          </form>
        )}

        {feedback && <p className="form-feedback" role="status">{feedback}</p>}

        {status === 'loading' && <div className="reviews-loading" role="status"><span></span> Φόρτωση αξιολογήσεων</div>}

        {status === 'ready' && reviews.length > 0 && (
          <div className="reviews-grid">
            {reviews.map((review, index) => (
              <article className="review-card" key={review.id} data-reveal style={{ transitionDelay: `${index * 70}ms` }}>
                <div className="review-card-top">
                  {renderStars(review.rating)}
                  <time dateTime={review.created_at}>{new Date(review.created_at).toLocaleDateString('el-GR')}</time>
                </div>
                <blockquote>“{review.text}”</blockquote>
                <div className="review-author"><span>{review.author?.charAt(0).toUpperCase() || 'T'}</span><strong>{review.author}</strong></div>
              </article>
            ))}
          </div>
        )}

        {status === 'ready' && reviews.length === 0 && (
          <div className="reviews-empty compact-empty" data-reveal>
            <MessageSquare size={28} aria-hidden="true" />
            <p>Δεν υπάρχουν ακόμη δημοσιευμένες αξιολογήσεις.</p>
          </div>
        )}

        {status === 'error' && (
          <div className="reviews-empty compact-empty reviews-error" role="status">
            <AlertCircle size={28} aria-hidden="true" />
            <p>Οι αξιολογήσεις είναι προσωρινά μη διαθέσιμες. Μπορείτε ακόμη να επικοινωνήσετε μαζί μας τηλεφωνικά ή μέσω Viber.</p>
          </div>
        )}
      </div>
    </section>
  );
}
