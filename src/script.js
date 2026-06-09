// InspectorDan — small bits of interactivity. Smooth scrolling is handled in CSS.

const header = document.querySelector('.site-header');
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');

// Mobile menu
if (toggle && nav) {
    toggle.addEventListener('click', () => {
        const open = nav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', open);
    });

    nav.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            nav.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// Header shadow once the page is scrolled
if (header) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
}

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

// Referral accordion
document.querySelectorAll('.ref-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const panel = btn.nextElementSibling;
        const isOpen = btn.getAttribute('aria-expanded') === 'true';

        // close all
        document.querySelectorAll('.ref-btn').forEach(b => {
            b.setAttribute('aria-expanded', 'false');
            b.nextElementSibling.classList.remove('ref-panel--open');
        });

        // open clicked if it was closed
        if (!isOpen) {
            btn.setAttribute('aria-expanded', 'true');
            panel.classList.add('ref-panel--open');
        }
    });
});