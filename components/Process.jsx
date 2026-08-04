import React from 'react';

export default function Process() {
    const steps = [
        {
            number: '01',
            title: 'Μελέτη Αναγκών',
            text: 'Συζητάμε τις ανάγκες του χώρου σας και καταγράφουμε τις εργασίες που απαιτούνται.'
        },
        {
            number: '02',
            title: 'Σχεδιασμός',
            text: 'Οργανώνουμε τη λύση που συνδυάζει αισθητική, λειτουργικότητα και το συμφωνημένο χρονοδιάγραμμα.'
        },
        {
            number: '03',
            title: 'Υλοποίηση',
            text: 'Το έμπειρο προσωπικό μας εκτελεί κάθε εργασία με προσοχή, συνέπεια και ποιοτικά υλικά.'
        },
        {
            number: '04',
            title: 'Παράδοση',
            text: 'Ολοκληρώνουμε τον χώρο με έμφαση στη λεπτομέρεια και στην πλήρη ικανοποίηση του πελάτη.'
        }
    ];

    return (
        <section id="process" className="section process-section" data-name="process" data-file="components/Process.js">
            <div className="container">
                <div data-reveal>
                    <p className="section-label">Η Διαδικασία</p>
                    <h2 className="section-title">Από τη μελέτη μέχρι την <span>υλοποίηση.</span></h2>
                </div>

                <div className="process-grid">
                    {steps.map((step, index) => (
                        <article className="process-step" key={step.number} data-reveal style={{ transitionDelay: `${index * 80}ms` }}>
                            <span className="process-bg-number" aria-hidden="true">{step.number}</span>
                            <span className="process-number">{step.number}</span>
                            <h3>{step.title}</h3>
                            <p>{step.text}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
