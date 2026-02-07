document.addEventListener("DOMContentLoaded", function() {

  const translations = {
    el: {
      heroTitle: "Ανακαινίσεις & Υπηρεσίες Υψηλής Ποιότητας",
      ctaHero: "Ζήτα Προσφορά",
      services: ["Πλακάκια", "Βάψιμο", "Υδραυλικά", "Ηλεκτρολογικά"],
      servicesDesc: [
        "Τοποθέτηση πλακιδίων μπάνιου, κουζίνας, δαπέδου.",
        "Εσωτερικών και εξωτερικών χώρων.",
        "Εγκατάσταση και συντήρηση υδραυλικών συστημάτων.",
        "Εγκαταστάσεις και επισκευές ηλεκτρικών κυκλωμάτων."
      ],
      aboutText: "Η TechnoHome αναλαμβάνει ολοκληρωμένες ή μερικές ανακαινίσεις, με έμφαση στην ποιότητα και αξιοπιστία. Η εμπειρία μας σε κάθε έργο εξασφαλίζει πλήρη ικανοποίηση των πελατών.",
      contactText: "Τηλ.: 6996832335<br>Email: technohome.gr@gmail.com<br>Διεύθυνση: Αγνώστου Στρατιώτη 23, Θεσσαλονίκη",
      ctaContact: "Καλέστε Τώρα"
    },
    en: {
      heroTitle: "High Quality Renovations & Services",
      ctaHero: "Request a Quote",
      services: ["Tiles", "Painting", "Plumbing", "Electrical"],
      servicesDesc: [
        "Installation of bathroom, kitchen, and floor tiles.",
        "Interior and exterior painting.",
        "Installation and maintenance of plumbing systems.",
        "Electrical installations and repairs."
      ],
      aboutText: "TechnoHome carries out complete or partial renovations with focus on quality and reliability. Our experience ensures full client satisfaction.",
      contactText: "Tel.: 6996832335<br>Email: technohome.gr@gmail.com<br>Address: Agnostou Stratioti 23, Thessaloniki",
      ctaContact: "Call Now"
    },
    ru: {
      heroTitle: "Ремонт и услуги высокого качества",
      ctaHero: "Запросить расчёт",
      services: ["Плитка", "Покраска", "Сантехника", "Электрика"],
      servicesDesc: [
        "Укладка плитки в ванной, кухне, на полу.",
        "Внутренние и наружные работы.",
        "Установка и обслуживание сантехники.",
        "Монтаж и ремонт электросетей."
      ],
      aboutText: "TechnoHome выполняет полные или частичные ремонты с упором на качество и надежность. Наш опыт гарантирует полное удовлетворение клиентов.",
      contactText: "Тел.: 6996832335<br>Email: technohome.gr@gmail.com<br>Адрес: Agnostou Stratioti 23, Thessaloniki",
      ctaContact: "Позвонить сейчас"
    }
  };

  const langSelect = document.getElementById('language-select');

  langSelect.addEventListener('change', () => {
    const lang = langSelect.value;

    // Hero
    document.getElementById('hero-title').textContent = translations[lang].heroTitle;
    document.getElementById('cta-hero').textContent = translations[lang].ctaHero;

    // Services
    for(let i=1; i<=4; i++){
      document.getElementById(`service${i}-title`).textContent = translations[lang].services[i-1];
      document.getElementById(`service${i}-desc`).textContent = translations[lang].servicesDesc[i-1];
    }

    // About
    document.getElementById('about-text').textContent = translations[lang].aboutText;

    // Contact
    document.getElementById('contact-text').innerHTML = translations[lang].contactText;
    document.getElementById('cta-contact').textContent = translations[lang].ctaContact;
  });

});
