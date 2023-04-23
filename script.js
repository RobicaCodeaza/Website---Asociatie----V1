// SELECTING ELEMENTS
const nav = document.querySelector('.navigation');
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
const btnMobileNav = document.querySelector('.btn-mobile-nav');

// ---------------------------------------
// Stabilire Height Property - Header
navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);
header.style.setProperty('height', `calc(100vh - ${navHeight}px)`);

// ---------------------------------------\
// Sticky Navigation
const stickyNav = function (entries) {
  [entry] = entries;
  if (entry.isIntersecting) nav.classList.remove('sticky');
  else nav.classList.add('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// MOBILE NAVIGATION

btnMobileNav.addEventListener('click', function () {
  nav.classList.toggle('nav-active');
});

// ---------------------------------------
// LAZY LOADING SECTIONS

const mediaQueryMin900 = window.matchMedia('(max-width: 900px)');
const mediaQueryMax900 = window.matchMedia('(max-width: 900px)');

if (mediaQueryMax900.matches) {
  allSections.forEach(function (section) {
    section.classList.remove('section--hidden');
  });
} else {
  const revealSection = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  };
  const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.1,
  });

  allSections.forEach(function (section) {
    section.classList.add('section--hidden');
    sectionObserver.observe(section);
  });
}
// ---------------------------------------
// Implementing Sign in
const raportButton = document.querySelector('.btn--form-cover-raport');
const ofertaButton = document.querySelector('.btn--form-cover-oferta');
const container = document.querySelector('.container--form');

raportButton.addEventListener('click', () => {
  container.classList.toggle('coverall');
});

ofertaButton.addEventListener('click', () => {
  container.classList.toggle('coverall');
});

// ---------------------------------------
// Implementing Smooth Scrolling
smoothScroll = function (e) {
  // console.log(e.target);
  const id = e.getAttribute('href');
  console.log(id);
  document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
};
elementTarget = function (e) {
  target = e.target.classList.contains('link')
    ? e.target
    : e.target.parentElement.classList.contains('link')
    ? e.target.parentElement
    : 0;

  return target;
};

document
  .querySelector('.navigation__list')
  .addEventListener('click', function (e) {
    elementTg = elementTarget(e);

    if (elementTg) {
      e.preventDefault();
      smoothScroll(elementTg);
      nav.classList.toggle('nav-active');
    }
  });

document.querySelectorAll('.btn--cta').forEach((link) => {
  console.log(link.firstElementChild);
  link.addEventListener('click', function (e) {
    console.log(e.target);
    elementTg = elementTarget(e);

    if (elementTg) {
      e.preventDefault();
      smoothScroll(elementTg);
    }
  });
});

// ---------------------------------------
// Implementing Copyright

const yearEl = document.querySelector('.year');
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear + 4;
