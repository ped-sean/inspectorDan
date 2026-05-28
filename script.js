// InspectorDan — small bits of interactivity. Smooth scrolling is handled in CSS.

const header = document.querySelector('.site-header');
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');

// Mobile menu
toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
});

// Close the menu after tapping a link
nav.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
    }
});

// Header shadow once the page is scrolled
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Highlight the nav link for the section currently in view
const sections = document.querySelectorAll('main section[id]');
const linksById = new Map(
    [...nav.querySelectorAll('a[href^="#"]')].map((a) => [a.getAttribute('href').slice(1), a])
);

if (sections.length && 'IntersectionObserver' in window) {
    const spy = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const link = linksById.get(entry.target.id);
                if (link && entry.isIntersecting) {
                    linksById.forEach((l) => l.classList.remove('active'));
                    link.classList.add('active');
                }
            });
        },
        { rootMargin: '-45% 0px -50% 0px' }
    );

    sections.forEach((section) => spy.observe(section));
}

// Testimonial carousel
const carousel = document.querySelector('.quotes');
if (carousel) {
    const slides = [...carousel.querySelectorAll('.quote')];
    const dotsBox = carousel.querySelector('.quotes-dots');
    let current = 0;
    let timer;

    // Build one dot per slide
    const dots = slides.map((_, n) => {
        const dot = document.createElement('button');
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-label', `Review ${n + 1}`);
        dot.addEventListener('click', () => { go(n); restart(); });
        dotsBox.append(dot);
        return dot;
    });

    const go = (n) => {
        current = (n + slides.length) % slides.length;
        slides.forEach((s, k) => s.classList.toggle('is-active', k === current));
        dots.forEach((d, k) => {
            d.classList.toggle('is-active', k === current);
            d.setAttribute('aria-selected', k === current);
        });
    };

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const start = () => { if (!reduceMotion) timer = setInterval(() => go(current + 1), 6000); };
    const stop = () => clearInterval(timer);
    const restart = () => { stop(); start(); };

    carousel.querySelector('.quotes-prev').addEventListener('click', () => { go(current - 1); restart(); });
    carousel.querySelector('.quotes-next').addEventListener('click', () => { go(current + 1); restart(); });
    carousel.addEventListener('mouseenter', stop);
    carousel.addEventListener('mouseleave', start);
    carousel.addEventListener('focusin', stop);
    carousel.addEventListener('focusout', start);

    go(0);
    start();
}
