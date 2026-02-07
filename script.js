const translations = {
  ru: {
    navPortfolio: "Работы",
    navAdvantages: "Преимущества",
    navProcess: "Процесс",
    navReviews: "Отзывы",
    navContact: "Контакты",

    heroTitle: "Ремонт и отделка под ключ",
    heroDesc: "Современные решения. Чёткие сроки. Прозрачная смета.",
    heroButton: "Связаться",

    portfolioTitle: "Примеры работ",
    portfolio1: "Квартира под ключ",
    portfolio2: "Косметический ремонт",
    portfolio3: "Дизайн интерьера",
    portfolio4: "Ремонт кухни",
    portfolio5: "Ванная комната",
    portfolio6: "Коммерческие объекты",

    advantagesTitle: "Почему выбирают нас",
    advantage1: "Собственные мастера",
    advantage2: "Фиксированная стоимость",
    advantage3: "Контроль сроков",

    processTitle: "Как мы работаем",
    step1: "Консультация и замер",
    step2: "Согласование и договор",
    step3: "Реализация проекта",

    reviewsTitle: "Отзывы клиентов",
    reviewsFormTitle: "Оставить комментарий",
    submitButton: "Отправить",
    clearReviewsButton: "Очистить",
    reviewName: "Имя",
    reviewText: "Комментарий",

    contactTitle: "Контакты",
    contactDesc: "example@mail.com",

    footerText: "© 2026 TECNOHOME"
  },
  en: {
    navPortfolio: "Portfolio",
    navAdvantages: "Advantages",
    navProcess: "Process",
    navReviews: "Reviews",
    navContact: "Contact",

    heroTitle: "Renovation & Finishing",
    heroDesc: "Modern solutions. Clear deadlines. Transparent pricing.",
    heroButton: "Contact",

    portfolioTitle: "Our Work",
    portfolio1: "Turnkey apartment",
    portfolio2: "Cosmetic renovation",
    portfolio3: "Interior design",
    portfolio4: "Kitchen renovation",
    portfolio5: "Bathroom",
    portfolio6: "Commercial spaces",

    advantagesTitle: "Why us",
    advantage1: "In-house specialists",
    advantage2: "Fixed pricing",
    advantage3: "Deadline control",

    processTitle: "How we work",
    step1: "Consultation & measurement",
    step2: "Agreement & contract",
    step3: "Project execution",

    reviewsTitle: "Client reviews",
    reviewsFormTitle: "Leave a comment",
    submitButton: "Submit",
    clearReviewsButton: "Clear",
    reviewName: "Name",
    reviewText: "Comment",

    contactTitle: "Contact",
    contactDesc: "example@mail.com",

    footerText: "© 2026 TECNOHOME"
  },
  gr: {
    navPortfolio: "Έργα",
    navAdvantages: "Πλεονεκτήματα",
    navProcess: "Διαδικασία",
    navReviews: "Κριτικές",
    navContact: "Επικοινωνία",

    heroTitle: "Ανακαινίσεις & Τελειώματα",
    heroDesc: "Σύγχρονες λύσεις. Σαφή χρονοδιαγράμματα.",
    heroButton: "Επικοινωνία",

    portfolioTitle: "Έργα",
    portfolio1: "Διαμέρισμα",
    portfolio2: "Απλή ανακαίνιση",
    portfolio3: "Σχεδιασμός",
    portfolio4: "Κουζίνα",
    portfolio5: "Μπάνιο",
    portfolio6: "Επαγγελματικοί χώροι",

    advantagesTitle: "Γιατί εμάς",
    advantage1: "Ιδιόκτητοι τεχνίτες",
    advantage2: "Σταθερή τιμή",
    advantage3: "Έλεγχος χρόνου",

    processTitle: "Πώς δουλεύουμε",
    step1: "Συμβουλευτική",
    step2: "Σύμβαση",
    step3: "Υλοποίηση",

    reviewsTitle: "Κριτικές",
    reviewsFormTitle: "Αφήστε σχόλιο",
    submitButton: "Αποστολή",
    clearReviewsButton: "Καθαρισμός",
    reviewName: "Όνομα",
    reviewText: "Σχόλιο",

    contactTitle: "Επικοινωνία",
    contactDesc: "example@mail.com",

    footerText: "© 2026 TECNOHOME"
  }
};

// language
const elements = document.querySelectorAll("[data-i18n]");
const placeholders = document.querySelectorAll("[data-i18n-placeholder]");
const buttons = document.querySelectorAll(".lang-switch button");

function setLang(lang) {
  elements.forEach(el => el.textContent = translations[lang][el.dataset.i18n]);
  placeholders.forEach(el => el.placeholder = translations[lang][el.dataset.i18nPlaceholder]);
  localStorage.setItem("lang", lang);
}
buttons.forEach(b => b.onclick = () => setLang(b.dataset.lang));
setLang(localStorage.getItem("lang") || "ru");

// scroll reveal
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("visible");
      observer.unobserve(e.target);
    }
  });
},{ threshold: 0.15 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// reviews
const list = document.getElementById("reviews-list");
let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

function renderReview(r) {
  const d = document.createElement("div");
  d.className = "review";
  d.innerHTML = `<strong>${r.name}</strong><p>${r.text}</p>`;
  list.prepend(d);
}

reviews.forEach(renderReview);

document.getElementById("submit-review").onclick = () => {
  const name = document.getElementById("reviewer-name").value.trim();
  const text = document.getElementById("review-text").value.trim();
  if (!name || !text) return;
  const r = { name, text };
  reviews.unshift(r);
  localStorage.setItem("reviews", JSON.stringify(reviews));
  renderReview(r);
  document.getElementById("reviewer-name").value = "";
  document.getElementById("review-text").value = "";
};

document.getElementById("clear-reviews").onclick = () => {
  localStorage.removeItem("reviews");
  list.innerHTML = "";
};
