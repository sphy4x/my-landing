document.addEventListener("DOMContentLoaded", function() {

  const translations = {
    el: {
      logo: "TechnoHome",
      heroTitle: "Ανακαινίσεις & Υπηρεσίες Υψηλής Ποιότητας",
      ctaHero: "Ζήτα Προσφορά",
      servicesTitle: "Οι Υπηρεσίες μας",
      services: ["Πλακάκια", "Βάψιμο", "Υδραυλικά", "Ηλεκτρολογικά"],
      servicesDesc: [
        "Τοποθέτηση πλακιδίων μπάνιου, κουζίνας, δαπέδου.",
        "Εσωτερικών και εξωτερικών χώρων.",
        "Εγκατάσταση και συντήρηση υδραυλικών συστημάτων.",
        "Εγκαταστάσεις και επισκευές ηλεκτρικών κυκλωμάτων."
      ],
      aboutTitle: "Σχετικά με εμάς",
      aboutText: "Η TechnoHome αναλαμβάνει ολοκληρωμένες ή μερικές ανακαινίσεις, με έμφαση στην ποιότητα και αξιοπιστία. Η εμπειρία μας σε κάθε έργο εξασφαλίζει πλήρη ικανοποίηση των πελατών.",
      contactTitle: "Επικοινωνία",
      contactText: "Τηλ.: 6996832335<br>Email: technohome.gr@gmail.com<br>Διεύθυνση: Αγνώστου Στρατιώτη 23, Θεσσαλονίκη",
      ctaContact: "Καλέστε Τώρα",
      footerText: "© 2026 TechnoHome. Όλα τα δικαιώματα κατοχυρωμένα."
    },
    en: {
      logo: "TechnoHome",
      heroTitle: "High Quality Renovations & Services",
      ctaHero: "Request a Quote",
      servicesTitle: "Our Services",
      services: ["Tiles", "Painting", "Plumbing", "Electrical"],
      servicesDesc: [
        "Installation of bathroom, kitchen, and floor tiles.",
        "Interior and exterior painting.",
        "Installation and maintenance of plumbing systems.",
        "Electrical installations and repairs."
      ],
      aboutTitle: "About Us",
      aboutText: "TechnoHome carries out complete or partial renovations with focus on quality and reliability. Our experience ensures full client satisfaction.",
      contactTitle: "Contact",
      contactText: "Tel.: 6996832335<br>Email: technohome.gr@gmail.com<br>Address: Agnostou Stratioti 23, Thessaloniki",
      ctaContact: "Call Now",
      footerText: "© 2026 TechnoHome. All rights reserved."
    },
    ru: {
      logo: "TechnoHome",
      heroTitle: "Ремонт и услуги высокого качества",
      ctaHero: "Запросить расчёт",
      servicesTitle: "Наши услуги",
      services: ["Плитка", "Покраска", "Сантехника", "Электрика"],
      servicesDesc: [
        "Укладка плитки в ванной, кухне, на полу.",
        "Внутренние и наружные работы.",
        "Установка и обслуживание сантехники.",
        "Монтаж и ремонт электросетей."
      ],
      aboutTitle: "О нас",
      aboutText: "TechnoHome выполняет полные или частичные ремонты с упором на качество и надежность. Наш опыт гарантирует полное удовлетворение клиентов.",
      contactTitle: "Контакты",
      contactText: "Тел.: 6996832335<br>Email: technohome.gr@gmail.com<br>Адрес: Agnostou Stratioti 23, Thessaloniki",
      ctaContact: "Позвонить сейчас",
      footerText: "© 2026 TechnoHome. Все права защищены."
    }
  };

  function applyTranslations(lang) {
    document.getElementById('logo').textContent = translations[lang].logo;
    document.getElementById('hero-title').textContent = translations[lang].heroTitle;
    document.getElementById('cta-hero').textContent = translations[lang].ctaHero;
    document.getElementById('services-title').textContent = translations[lang].servicesTitle;

    // Services
    for(let i=1; i<=4; i++){
      document.getElementById(`service${i}-title`).textContent = translations[lang].services[i-1];
      document.getElementById(`service${i}-desc`).textContent = translations[lang].servicesDesc[i-1];
    }

    // About
    document.getElementById('about-title').textContent = translations[lang].aboutTitle;
    document.getElementById('about-text').textContent = translations[lang].aboutText;

    // Contact
    document.getElementById('contact-title').textContent = translations[lang].contactTitle;
    document.getElementById('contact-text').innerHTML = translations[lang].contactText;
    document.getElementById('cta-contact').textContent = translations[lang].ctaContact;

    // Footer
    document.getElementById('footer-text').textContent = translations[lang].footerText;
  }

  const langSelect = document.getElementById('language-select');

  // Применяем переводы при загрузке страницы
  applyTranslations('el');

  // Применяем переводы при смене языка
  langSelect.addEventListener('change', () => {
    applyTranslations(langSelect.value);
  });

});
