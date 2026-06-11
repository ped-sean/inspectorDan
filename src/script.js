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

// Referral search — filters categories first, then individual rows.
const refSearch = document.querySelector('#ref-search-input');
const refItems = document.querySelectorAll('.ref-item');
const refEmpty = document.querySelector('.ref-empty');

if (refSearch && refItems.length) {
    const filter = () => {
        const q = refSearch.value.trim().toLowerCase();
        let anyMatch = false;

        refItems.forEach(item => {
            const btn = item.querySelector('.ref-btn');
            const panel = item.querySelector('.ref-panel');
            const rows = item.querySelectorAll('.ref-row');
            const category = btn.textContent.toLowerCase();

            if (!q) {
                // Reset: show everything, collapse all
                item.classList.remove('is-hidden');
                rows.forEach(r => r.classList.remove('is-hidden'));
                btn.setAttribute('aria-expanded', 'false');
                panel.classList.remove('ref-panel--open');
                anyMatch = true;
                return;
            }

            const categoryHit = category.includes(q);
            let rowHit = false;
            rows.forEach(row => {
                const match = categoryHit || row.textContent.toLowerCase().includes(q);
                row.classList.toggle('is-hidden', !match);
                if (match) rowHit = true;
            });

            const itemHit = categoryHit || rowHit;
            item.classList.toggle('is-hidden', !itemHit);
            btn.setAttribute('aria-expanded', itemHit);
            panel.classList.toggle('ref-panel--open', itemHit);
            if (itemHit) anyMatch = true;
        });

        if (refEmpty) refEmpty.classList.toggle('is-hidden', anyMatch);
    };

    refSearch.addEventListener('input', filter);
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