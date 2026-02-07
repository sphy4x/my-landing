// Мультиязычные тексты
const translations = {
    ru: {
        heroTitle: "Ремонт и отделка под ключ",
        heroDesc: "Быстро, качественно и с гарантией",
        heroButton: "Связаться",

        advantagesTitle: "Наши преимущества",
        advantage1: "Собственные мастера",
        advantage2: "Фиксированная смета",
        advantage3: "Сроки под контролем",

        servicesTitle: "Услуги",
        service1: "Капитальный ремонт квартиры",
        service2: "Косметический ремонт",
        service3: "Дизайн-проект интерьера",

        reviewsTitle: "Отзывы клиентов",
        reviewsFormTitle: "Оставить отзыв",
        submitButton: "Отправить",
        reviewName: "Имя",
        reviewText: "Ваш отзыв",
        clearReviewsButton: "Очистить все отзывы",

        processTitle: "Как мы работаем",
        step1: "Консультация и замер",
        step2: "Заключение договора",
        step3: "Реализация проекта",

        contactTitle: "Контакты",
        contactDesc: "Напишите нам: example@mail.com",

        footerText: "Все права защищены © 2026"
    },
    en: {
        heroTitle: "Renovation & Finishing",
        heroDesc: "Fast, high-quality, guaranteed",
        heroButton: "Contact Us",

        advantagesTitle: "Our Advantages",
        advantage1: "Own specialists",
        advantage2: "Fixed estimate",
        advantage3: "Deadline control",

        servicesTitle: "Services",
        service1: "Full apartment renovation",
        service2: "Cosmetic renovation",
        service3: "Interior design project",

        reviewsTitle: "Customer Reviews",
        reviewsFormTitle: "Leave a review",
        submitButton: "Submit",
        reviewName: "Name",
        reviewText: "Your review",
        clearReviewsButton: "Clear All Reviews",

        processTitle: "How we work",
        step1: "Consultation and measurement",
        step2: "Contract signing",
        step3: "Project execution",

        contactTitle: "Contact",
        contactDesc: "Write to us: example@mail.com",

        footerText: "All rights reserved © 2026"
    },
    gr: {
        heroTitle: "Ανακαινίσεις & Τελειώματα",
        heroDesc: "Γρήγορα, ποιοτικά και με εγγύηση",
        heroButton: "Επικοινωνία",

        advantagesTitle: "Τα Πλεονεκτήματά μας",
        advantage1: "Ιδιόκτητοι τεχνίτες",
        advantage2: "Σταθερός προϋπολογισμός",
        advantage3: "Έλεγχος προθεσμιών",

        servicesTitle: "Υπηρεσίες",
        service1: "Ολική ανακαίνιση διαμερίσματος",
        service2: "Απλή ανακαίνιση",
        service3: "Σχέδιο εσωτερικού χώρου",

        reviewsTitle: "Κριτικές Πελατών",
        reviewsFormTitle: "Αφήστε ένα σχόλιο",
        submitButton: "Αποστολή",
        reviewName: "Όνομα",
        reviewText: "Το σχόλιό σας",
        clearReviewsButton: "Διαγραφή όλων των σχολίων",

        processTitle: "Πώς δουλεύουμε",
        step1: "Συμβουλευτική και μέτρηση",
        step2: "Υπογραφή σύμβασης",
        step3: "Εκτέλεση έργου",

        contactTitle: "Επικοινωνία",
        contactDesc: "Γράψτε μας: example@mail.com",

        footerText: "Όλα τα δικαιώματα διατηρούνται © 2026"
    }
};

// Мультиязычная логика
const elements = document.querySelectorAll("[data-i18n]");
const buttons = document.querySelectorAll(".lang-switch button");

function setLanguage(lang) {
    elements.forEach(el => {
        const key = el.getAttribute("data-i18n");
        el.textContent = translations[lang][key];
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
        const key = el.getAttribute("data-i18n-placeholder");
        el.placeholder = translations[lang][key];
    });

    localStorage.setItem("lang", lang);
}

buttons.forEach(btn => {
    btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
});

const savedLang = localStorage.getItem("lang") || "ru";
setLanguage(savedLang);

// Динамические отзывы
const reviewsList = document.getElementById("reviews-list");
const submitBtn = document.getElementById("submit-review");
const clearBtn = document.getElementById("clear-reviews");

let savedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
savedReviews.forEach(r => addReviewToDOM(r.name, r.text));

function addReviewToDOM(name, text) {
    const div = document.createElement("div");
    div.classList.add("review");
    div.innerHTML = `<strong>${name}</strong>: <p>${text}</p>`;
    reviewsList.prepend(div);
    div.style.animation = "reviewFadeIn 0.5s ease forwards";
}

submitBtn.addEventListener("click", () => {
    const name = document.getElementById("reviewer-name").value.trim();
    const text = document.getElementById("review-text").value.trim();
    if(name && text) {
        addReviewToDOM(name, text);
        savedReviews.unshift({ name, text });
        localStorage.setItem("reviews", JSON.stringify(savedReviews));
        document.getElementById("reviewer-name").value = "";
        document.getElementById("review-text").value = "";
    } else {
        const lang = localStorage.getItem("lang") || "ru";
        const messages = {
            ru: "Введите имя и текст отзыва",
            en: "Enter name and review text",
            gr: "Εισάγετε όνομα και κείμενο σχολίου"
        };
        alert(messages[lang]);
    }
});

clearBtn.addEventListener("click", () => {
    const lang = localStorage.getItem("lang") || "ru";
    const messages = {
        ru: "Вы точно хотите удалить все отзывы?",
        en: "Are you sure you want to delete all reviews?",
        gr: "Είστε σίγουροι ότι θέλετε να διαγράψετε όλα τα σχόλια;"
    };
    if(confirm(messages[lang])) {
        localStorage.removeItem("reviews");
        reviewsList.innerHTML = "";
    }
});
