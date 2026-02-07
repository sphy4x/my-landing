// Анимация появления элементов при прокрутке
const faders = document.querySelectorAll('.fade-in');
const appearOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
const appearOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
    }
  });
}, appearOptions);

faders.forEach(fader => { appearOnScroll.observe(fader); });
