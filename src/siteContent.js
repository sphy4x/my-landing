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
  { value: '15+', label: 'Χρόνια Εμπειρίας' },
  { value: '1000+', label: 'Ολοκληρωμένα Έργα' },
  { value: 'ΘΕΣ/ΝΙΚΗ', label: 'Περιοχή Εξυπηρέτησης' },
  { value: '4', label: 'Βασικές Υπηρεσίες' }
];

export const SERVICES = [
  {
    id: 'tiles',
    slug: 'plakakia',
    number: '01',
    title: 'Πλακάκια',
    menuTitle: 'Τοποθέτηση Πλακιδίων',
    description: 'Τοποθέτηση πλακιδίων μπάνιου, κουζίνας, δαπέδου και εξωτερικού χώρου με ακρίβεια και προσοχή στη λεπτομέρεια.',
    image: '/assets/images/service-tiles.webp',
    pageTitle: 'Τοποθέτηση Πλακιδίων στη Θεσσαλονίκη',
    pageLead: 'Αναλαμβάνουμε τοποθετήσεις πλακιδίων σε νέους και υφιστάμενους χώρους, από την προετοιμασία της επιφάνειας μέχρι το τελικό φινίρισμα.',
    bullets: ['Μπάνιο και κουζίνα', 'Δάπεδα και σκάλες', 'Εξωτερικοί χώροι', 'Ειδικές κατασκευές και ψηφιδωτά']
  },
  {
    id: 'painting',
    slug: 'elaiokhromatismoi',
    number: '02',
    title: 'Βάψιμο',
    menuTitle: 'Ελαιοχρωματισμοί',
    description: 'Ελαιοχρωματισμοί εσωτερικών και εξωτερικών χώρων, προετοιμασία επιφανειών, τεχνοτροπίες και φρεσκαρίσματα.',
    image: '/assets/images/service-painting.webp',
    pageTitle: 'Ελαιοχρωματισμοί στη Θεσσαλονίκη',
    pageLead: 'Προετοιμάζουμε σωστά κάθε επιφάνεια και παραδίδουμε καθαρό, ομοιόμορφο αποτέλεσμα για κατοικίες και επαγγελματικούς χώρους.',
    bullets: ['Εσωτερικοί χώροι', 'Εξωτερικές όψεις', 'Στοκαρίσματα και προετοιμασία', 'Τεχνοτροπίες και ανανεώσεις']
  },
  {
    id: 'plumbing',
    slug: 'ydraulika',
    number: '03',
    title: 'Υδραυλικά',
    menuTitle: 'Υδραυλικές Εργασίες',
    description: 'Εγκατάσταση και συντήρηση υδραυλικών συστημάτων, καθώς και ολοκληρωμένες εργασίες σε μπάνιο και κουζίνα.',
    image: '/assets/images/service-plumbing.webp',
    pageTitle: 'Υδραυλικές Εργασίες στη Θεσσαλονίκη',
    pageLead: 'Υδραυλικές παρεμβάσεις και εγκαταστάσεις με οργανωμένη εκτέλεση, σωστή επιλογή υλικών και καθαρή συνεννόηση.',
    bullets: ['Ανακαίνιση μπάνιου', 'Εργασίες κουζίνας', 'Αλλαγές εγκαταστάσεων', 'Συντήρηση και αποκατάσταση']
  },
  {
    id: 'demolition',
    slug: 'apoxiloseis',
    number: '04',
    title: 'Αποξηλώσεις & Γκρεμίσματα',
    menuTitle: 'Αποξηλώσεις',
    description: 'Ελεγχόμενες αποξηλώσεις και γκρεμίσματα με ασφάλεια, οργάνωση και σωστή προετοιμασία του χώρου για την ανακαίνιση.',
    image: '/assets/images/service-demolition.webp',
    pageTitle: 'Αποξηλώσεις στη Θεσσαλονίκη',
    pageLead: 'Προετοιμάζουμε τον χώρο για το επόμενο στάδιο της ανακαίνισης, με προσοχή στην ασφάλεια και στον σωστό συντονισμό των εργασιών.',
    bullets: ['Αποξηλώσεις πλακιδίων', 'Καθαιρέσεις εσωτερικών στοιχείων', 'Προετοιμασία χώρου', 'Συντονισμός με τις επόμενες εργασίες']
  }
];

export const PROJECTS = [
  {
    src: '/assets/images/project-terrace.webp',
    title: 'Διαμόρφωση Εξωτερικού Χώρου',
    category: 'Πλακάκια & Δάπεδα'
  },
  {
    src: '/assets/images/project-paving.webp',
    title: 'Πέτρινη Αυλή & Εξωτερική Όψη',
    category: 'Εξωτερικός Χώρος'
  },
  {
    src: '/assets/images/project-bathroom.webp',
    title: 'Πλήρης Ανακαίνιση Μπάνιου',
    category: 'Μπάνιο & Υδραυλικά'
  },
  {
    src: '/assets/images/project-mosaic.webp',
    title: 'Ειδική Κατασκευή Ψηφιδωτού',
    category: 'Πλακάκια & Λεπτομέρειες'
  }
];

export const SERVICE_PATHS = Object.fromEntries(
  SERVICES.map((service) => [`/services/${service.slug}/`, service])
);
