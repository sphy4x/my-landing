export const BUSINESS = {
  name: 'TechnoHome.gr',
  technician: 'Κώστας Τζέζαρ',
  phonePrimaryDisplay: '699 683 2335',
  phonePrimaryHref: 'tel:+306996832335',
  phoneSecondaryDisplay: '694 830 8810',
  phoneSecondaryHref: 'tel:+306948308810',
  viberHref: 'viber://chat?number=%2B306996832335',
  email: 'technohome.gr@gmail.com',
  serviceArea: 'Θεσσαλονίκη και γύρω περιοχές',
  facebook: 'https://www.facebook.com/profile.php?id=100063673203867'
};

export const METRICS = [
  { value: '25+', label: 'Χρόνια Εμπειρίας' },
  { value: '1000+', label: 'Ολοκληρωμένα Έργα' },
  { value: 'ΘΕΣ/ΝΙΚΗ', label: 'Περιοχή Εξυπηρέτησης' },
  { value: '7', label: 'Βασικές Υπηρεσίες' }
];

export const SERVICES = [
  {
    id: 'demolition', slug: 'kathaireseis-apoxiloseis', number: '01',
    title: 'Καθαιρέσεις & Αποξηλώσεις', menuTitle: 'Καθαιρέσεις & Αποξηλώσεις',
    description: 'Ελεγχόμενες καθαιρέσεις τοίχων, χωρισμάτων, πλακιδίων και παλιών κατασκευών.',
    image: '/assets/images/service-demolition.webp',
    pageTitle: 'Καθαιρέσεις & Αποξηλώσεις στη Θεσσαλονίκη',
    pageLead: 'Προετοιμάζουμε με ασφάλεια τον χώρο για τη νέα διαρρύθμιση και τις επόμενες εργασίες.',
    bullets: ['Καθαιρέσεις εσωτερικών τοίχων', 'Αποξηλώσεις πλακιδίων', 'Απομάκρυνση παλιών κατασκευών', 'Προετοιμασία χώρου']
  },
  {
    id: 'plumbing', slug: 'ydraulikes-ergasies', number: '02',
    title: 'Υδραυλικές Εργασίες', menuTitle: 'Υδραυλικές Εργασίες',
    description: 'Παρεμβάσεις και αλλαγές εγκαταστάσεων για μπάνιο, κουζίνα και εργασίες ανακαίνισης.',
    image: '/assets/images/service-plumbing.webp',
    pageTitle: 'Υδραυλικές Εργασίες στη Θεσσαλονίκη',
    pageLead: 'Οργανώνουμε τις υδραυλικές εργασίες στο σωστό στάδιο, πριν κλείσουν και ολοκληρωθούν οι επιφάνειες.',
    bullets: ['Αλλαγές σωληνώσεων', 'Παροχές μπάνιου και κουζίνας', 'Είδη υγιεινής', 'Εργασίες στο πλαίσιο ανακαίνισης']
  },
  {
    id: 'drywall', slug: 'gypsosanides', number: '03',
    title: 'Γυψοσανίδες', menuTitle: 'Κατασκευές Γυψοσανίδας',
    description: 'Χωρίσματα, ψευδοροφές, επενδύσεις, νίχες και ειδικές κατασκευές με καθαρές γραμμές.',
    image: '/assets/images/about-renovation.webp',
    pageTitle: 'Κατασκευές Γυψοσανίδας στη Θεσσαλονίκη',
    pageLead: 'Διαμορφώνουμε λειτουργικούς εσωτερικούς χώρους με κατασκευές προσαρμοσμένες σε κάθε έργο.',
    bullets: ['Εσωτερικά χωρίσματα', 'Ψευδοροφές', 'Επενδύσεις τοίχων', 'Νίχες και ειδικές κατασκευές']
  },
  {
    id: 'cement', slug: 'tsimentokonia-oikodomikes-ergasies', number: '04',
    title: 'Τσιμεντοκονίες & Οικοδομικές Εργασίες', menuTitle: 'Τσιμεντοκονίες',
    description: 'Εξομάλυνση επιφανειών, τσιμεντοκονίες, χτισίματα και οικοδομικές παρεμβάσεις.',
    image: '/assets/images/project-paving.webp',
    pageTitle: 'Τσιμεντοκονίες & Οικοδομικές Εργασίες',
    pageLead: 'Δημιουργούμε σταθερή και σωστά προετοιμασμένη βάση πριν από κάθε τελικό φινίρισμα.',
    bullets: ['Τσιμεντοκονίες', 'Εξομάλυνση επιφανειών', 'Χτισίματα', 'Βάσεις για πλακίδια']
  },
  {
    id: 'tiles', slug: 'plakakia', number: '05',
    title: 'Τοποθέτηση Πλακιδίων', menuTitle: 'Τοποθέτηση Πλακιδίων',
    description: 'Πλακίδια μπάνιου, δαπέδου, κουζίνας και εξωτερικού χώρου με ακριβείς ευθυγραμμίσεις.',
    image: '/assets/images/service-tiles.webp',
    pageTitle: 'Τοποθέτηση Πλακιδίων στη Θεσσαλονίκη',
    pageLead: 'Αναλαμβάνουμε την προετοιμασία, τη χάραξη και την τοποθέτηση μέχρι το τελικό φινίρισμα.',
    bullets: ['Μπάνια και κουζίνες', 'Δάπεδα και σκάλες', 'Εξωτερικοί χώροι', 'Ειδικές διατάξεις']
  },
  {
    id: 'painting', slug: 'elaiokhromatismoi', number: '06',
    title: 'Ελαιοχρωματισμοί', menuTitle: 'Ελαιοχρωματισμοί',
    description: 'Προετοιμασία, στοκαρίσματα και βαφές εσωτερικών ή εξωτερικών χώρων με ομοιόμορφο αποτέλεσμα.',
    image: '/assets/images/service-painting.webp',
    pageTitle: 'Ελαιοχρωματισμοί στη Θεσσαλονίκη',
    pageLead: 'Προετοιμάζουμε κάθε επιφάνεια και εφαρμόζουμε τα κατάλληλα υλικά για καθαρό και ανθεκτικό χρώμα.',
    bullets: ['Εσωτερικοί χώροι', 'Εξωτερικές επιφάνειες', 'Στοκαρίσματα', 'Αλλαγές χρώματος']
  },
  {
    id: 'bathroom', slug: 'anakainisi-mpaniou', number: '07',
    title: 'Ανακαίνιση Μπάνιου', menuTitle: 'Ανακαίνιση Μπάνιου',
    description: 'Καθαιρέσεις, υδραυλικά, προετοιμασία επιφανειών, γυψοσανίδες, πλακίδια και βαφή.',
    image: '/assets/images/project-bathroom.webp',
    pageTitle: 'Ανακαίνιση Μπάνιου στη Θεσσαλονίκη',
    pageLead: 'Οργανώνουμε τα βασικά στάδια της ανακαίνισης μπάνιου με μία καθαρή συνέχεια εργασιών.',
    bullets: ['Αποξηλώσεις', 'Υδραυλικές αλλαγές', 'Γυψοσανίδες και προετοιμασία', 'Πλακίδια και βαφή']
  }
];

export const PROJECTS = [
  { src: '/assets/images/project-terrace.webp', title: 'Διαμόρφωση Εξωτερικού Χώρου', category: 'Πλακάκια & Δάπεδα' },
  { src: '/assets/images/project-paving.webp', title: 'Πέτρινη Αυλή & Εξωτερική Όψη', category: 'Οικοδομικές Εργασίες' },
  { src: '/assets/images/project-bathroom.webp', title: 'Ανακαίνιση Μπάνιου', category: 'Υδραυλικά & Πλακάκια' },
  { src: '/assets/images/project-mosaic.webp', title: 'Ειδική Κατασκευή Ψηφιδωτού', category: 'Πλακάκια & Λεπτομέρειες' }
];

export const SERVICE_PATHS = Object.fromEntries(
  SERVICES.map((service) => [`/services/${service.slug}/`, service])
);
