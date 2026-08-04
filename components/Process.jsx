import React from 'react';

const steps = [
  {
    number: '01',
    title: 'Καθαίρεση',
    eyebrow: 'REMOVE',
    text: 'Αποξηλώνουμε παλιές επενδύσεις και κατασκευές, ενώ οι ελεγχόμενες καθαιρέσεις ανοίγουν τον δρόμο για τη νέα διαρρύθμιση.',
    image: '/assets/images/hero-demolition.webp'
  },
  {
    number: '02',
    title: 'Νέα Διαρρύθμιση',
    eyebrow: 'RESHAPE',
    text: 'Ορίζουμε τις νέες γραμμές του χώρου, τα ανοίγματα και τα χωρίσματα ώστε η κατασκευή να υπηρετεί την καθημερινή χρήση.',
    image: '/assets/images/hero-demolition.webp'
  },
  {
    number: '03',
    title: 'Γυψοσανίδα',
    eyebrow: 'BUILD',
    text: 'Κατασκευάζουμε χωρίσματα, ψευδοροφές, επενδύσεις και ειδικές λεπτομέρειες με καθαρές ενώσεις και ακριβή γεωμετρία.',
    image: '/assets/images/service-painting.webp'
  },
  {
    number: '04',
    title: 'Τσιμεντοκονία',
    eyebrow: 'PREPARE',
    text: 'Δημιουργούμε σταθερές και επίπεδες βάσεις ώστε κάθε επόμενο υλικό να εφαρμοστεί σωστά και να αντέξει στον χρόνο.',
    image: '/assets/images/project-paving.webp'
  },
  {
    number: '05',
    title: 'Πλακίδια',
    eyebrow: 'ALIGN',
    text: 'Χαράζουμε, ευθυγραμμίζουμε και τοποθετούμε τα πλακίδια με ακρίβεια στις αποστάσεις, στις κοπές και στις λεπτομέρειες.',
    image: '/assets/images/service-tiles.webp'
  },
  {
    number: '06',
    title: 'Παράδοση',
    eyebrow: 'REVEAL',
    text: 'Το τεχνικό υπόβαθρο υποχωρεί και αποκαλύπτεται ένας καθαρός, λειτουργικός και ολοκληρωμένος χώρος.',
    image: '/assets/images/about-renovation.webp'
  }
];

export default function Process() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [comparison, setComparison] = React.useState(58);
  const chapterRefs = React.useRef([]);
  const activeStep = steps[activeIndex];

  React.useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveIndex(Number(entry.target.dataset.stageIndex));
        }
      });
    }, { rootMargin: '-30% 0px -48% 0px', threshold: 0 });

    chapterRefs.current.forEach((chapter) => chapter && observer.observe(chapter));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="process" className="section process-section process-experience">
      <div className="container">
        <div className="process-intro" data-reveal>
          <p className="section-label">Structure → Space</p>
          <h2 className="section-title">Από την καθαίρεση στο <span>τελικό αποτέλεσμα.</span></h2>
          <p className="section-intro">Έξι στάδια. Μία καθαρή συνέχεια. Κάθε εργασία προετοιμάζει σωστά την επόμενη.</p>
        </div>

        <div className="process-story">
          <div className="process-visual-column">
            <div className="process-stage" data-active-stage={activeIndex + 1}>
              <div className="process-stage-images" aria-hidden="true">
                {steps.map((step, index) => (
                  <img
                    key={step.number}
                    src={step.image}
                    alt=""
                    className={index === activeIndex ? 'is-active' : ''}
                    loading={index > 1 ? 'lazy' : 'eager'}
                  />
                ))}
              </div>
              <div className="process-stage-overlay" aria-hidden="true"></div>
              <svg className="process-blueprint" viewBox="0 0 800 720" preserveAspectRatio="none" aria-hidden="true">
                <g className="process-blueprint-grid">
                  {Array.from({ length: 9 }, (_, index) => <path key={`pv-${index}`} d={`M ${index * 100} 0 V 720`} />)}
                  {Array.from({ length: 9 }, (_, index) => <path key={`ph-${index}`} d={`M 0 ${index * 90} H 800`} />)}
                </g>
                <g className="process-blueprint-shape">
                  <path d="M116 114 H686 V586 H116 Z" />
                  <path d="M116 326 H420 V586" />
                  <path d="M420 114 V428 H686" />
                  <path d="M88 82 H716 M88 616 H716" />
                  <path d="M90 68 V96 M714 68 V96 M90 602 V630 M714 602 V630" />
                </g>
              </svg>

              <div className="process-stage-topline">
                <span>{activeStep.eyebrow}</span>
                <span>TECHNOHOME / THESSALONIKI</span>
              </div>
              <div className="process-stage-copy">
                <small>STAGE {activeStep.number}</small>
                <strong>{activeStep.title}</strong>
              </div>
              <div className="process-stage-index" aria-hidden="true">{activeStep.number}</div>
              <div className="process-stage-progress" aria-hidden="true">
                <span style={{ width: `${((activeIndex + 1) / steps.length) * 100}%` }}></span>
              </div>
            </div>
          </div>

          <div className="process-chapters">
            {steps.map((step, index) => (
              <article
                className={`process-chapter ${index === activeIndex ? 'is-active' : ''}`}
                key={step.number}
                data-stage-index={index}
                ref={(node) => { chapterRefs.current[index] = node; }}
                tabIndex="0"
                onFocus={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <div className="process-chapter-marker">
                  <span>{step.number}</span>
                  <i aria-hidden="true"></i>
                </div>
                <div>
                  <small>{step.eyebrow}</small>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="transformation-proof" data-reveal>
          <div className="transformation-copy">
            <p className="section-label">Blueprint → Reality</p>
            <h3>Το εργοτάξιο είναι μόνο η αρχή.</h3>
            <p>Μετακινήστε τον δείκτη για να δείτε τη μετάβαση από τη σκληρή κατασκευή στον ολοκληρωμένο χώρο.</p>
            <div className="transformation-facts" aria-label="Στοιχεία εμπειρίας">
              <span><strong>25+</strong> χρόνια εμπειρίας</span>
              <span><strong>1000+</strong> ολοκληρωμένα έργα</span>
            </div>
          </div>

          <div className="result-comparison" style={{ '--compare-position': `${comparison}%` }}>
            <img className="comparison-base" src="/assets/images/hero-demolition.webp" alt="Χώρος κατά τη διάρκεια τεχνικών εργασιών" loading="lazy" />
            <div className="comparison-finish" aria-hidden="true">
              <img src="/assets/images/about-renovation.webp" alt="" loading="lazy" />
            </div>
            <span className="comparison-label comparison-label-before">ΚΑΤΑΣΚΕΥΗ</span>
            <span className="comparison-label comparison-label-after">ΑΠΟΤΕΛΕΣΜΑ</span>
            <div className="comparison-divider" aria-hidden="true"><span>↔</span></div>
            <input
              type="range"
              min="10"
              max="90"
              value={comparison}
              onChange={(event) => setComparison(Number(event.target.value))}
              aria-label="Σύγκριση εργοταξίου και τελικού αποτελέσματος"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
