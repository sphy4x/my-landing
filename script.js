// === Анимация появления блоков ===
const faders = document.querySelectorAll('.fade-in');
const appearOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
const appearOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.style.animationPlayState = 'running';
  });
}, appearOptions);
faders.forEach(fader => appearOnScroll.observe(fader));

// === Переключение языков ===
const translations = {
  en: {
    services: "Services",
    portfolio: "Portfolio",
    about: "About Us",
    contact: "Contact",
    heroTitle: "High Quality Renovations & Services",
    ctaHero: "Request a Quote",
    servicesList: [
      { title: "Tiles", desc: "Installation of bathroom, kitchen, and floor tiles." },
      { title: "Painting", desc: "Interior and exterior painting." },
      { title: "Plumbing", desc: "Installation and maintenance of plumbing systems." },
      { title: "Electrical", desc: "Electrical installations and repairs." }
    ],
    aboutText: "TechnoHome carries out complete or partial renovations with focus on quality and reliability. Our experience ensures full client satisfaction.",
    contactText: "Tel.: 6996832335\nEmail: technohome.gr@gmail.com\nAddress: Agnostou Stratioti 23, Thessaloniki",
    ctaContact: "Call Now"
  },
  ru: {
    services: "Услуги",
    portfolio: "Портфолио",
    about: "О нас",
    contact: "Контакты",
    heroTitle: "Ремонт и услуги высокого качества",
    ctaHero: "Запросить расчёт",
    servicesList: [
      { title: "Плитка", desc: "Укладка плитки в ванной, кухне, на полу." },
      { title: "Покраска", desc: "Внутренние и наружные работы." },
      { title: "Сантехника", desc: "Установка и обслуживание сантехники." },
      { title: "Электрика", desc: "Монтаж и ремонт электросетей." }
    ],
    aboutText: "TechnoHome выполняет полные или частичные ремонты с упором на качество и надежность. Наш опыт гарантирует полное удовлетворение клиентов.",
    contactText: "Тел.: 6996832335\nEmail: technohome.gr@gmail.com\nАдрес: Agnostou Stratioti 23, Thessaloniki",
    ctaContact: "Позвонить сейчас"
  },
  el: {
    services: "Υπηρεσίες",
    portfolio: "Έργα",
    about: "Σχετικά",
    contact: "Επικοινωνία",
    heroTitle: "Ανακαινίσεις & Υπηρεσίες Υψηλής Ποιότητας",
    ctaHero: "Ζήτα Προσφορά",
    servicesList: [
      { title: "Πλακάκια", desc: "Τοποθέτηση πλακιδίων μπάνιου, κουζίνας, δαπέδου." },
      { title: "Βάψιμο", desc: "Εσωτερικών και εξωτερικών χώρων." },
      { title: "Υδραυλικά", desc: "Εγκατάσταση και συντήρηση υδραυλικών συστημάτων." },
      { title: "Ηλεκτρολογικά", desc: "Εγκαταστάσεις και επισκευές ηλεκτρικών κυκλωμάτων." }
    ],
    aboutText: "Η TechnoHome αναλαμβάνει ολοκληρωμένες ή μερικές ανακαινίσεις, με έμφαση στην ποιότητα και αξιοπιστία. Η εμπειρία μας σε κάθε έργο εξασφαλίζει πλήρη ικανοποίηση των πελατών.",
    contactText: "Τηλ.: 6996832335\nEmail: technohome.gr@gmail.com\nΔιεύθυνση: Αγνώστου Στρατιώτη 23, Θεσσαλονίκη",
    ctaContact: "Καλέστε Τώρα"
  }
};

const langSelect = document.getElementById('language-select');

function updateLanguage(lang) {
  document.querySelector('.hero-text h2').textContent = translations[lang].heroTitle;
  document.querySelector('.hero-text .cta-btn').textContent = translations[lang].ctaHero;

  // Меню навигации
  document.querySelectorAll('header nav a').forEach((a) => {
    const key = a.getAttribute('data-key');
    a.textContent = translations[lang][key];
  });

  // Услуги
  const serviceElems = document.querySelectorAll('.service');
  translations[lang].servicesList.forEach((item, i) => {
    serviceElems[i].querySelector('h3').textContent = item.title;
    serviceElems[i].querySelector('p').textContent = item.desc;
  });

  // About
  document.querySelector('#about p').textContent = translations[lang].aboutText;

  // Contact
  const contactSection = document.querySelector('#contact');
  contactSection.querySelector('p:nth-child(1)').textContent = translations[lang].contactText.split('\n')[0];
  contactSection.querySelector('p:nth-child(2)').textContent = translations[lang].contactText.split('\n')[1];
  contactSection.querySelector('p:nth-child(3)').textContent = translations[lang].contactText.split('\n')[2];
  contactSection.querySelector('a.cta-btn').textContent = translations[lang].ctaContact;
}

langSelect.addEventListener('change', (e) => updateLanguage(e.target.value));
