// ── Lightbox ──────────────────────────────────────────
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

document.querySelectorAll('.polaroid-grid .polaroid img').forEach(img => {
  img.style.cursor = 'pointer';
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || '';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
}

lightboxClose.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// ── Pricing → Contact ─────────────────────────────────
const shootSelect = document.querySelector('select[name="shoot"]');

document.querySelectorAll('.price-card').forEach(card => {
  card.style.cursor = 'pointer';
  card.addEventListener('click', () => {
    const packageName = card.querySelector('h3').textContent.trim();

    const optionMap = {
      'Portrait Session': 'Portrait session',
      'Event Coverage': 'Wedding / event',
      'Creative Campaign': 'Creative campaign'
    };

    const matchingOption = optionMap[packageName];
    if (matchingOption) {
      Array.from(shootSelect.options).forEach((opt, i) => {
        if (opt.text === matchingOption) shootSelect.selectedIndex = i;
      });
    }

    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  });
});

// ── Active nav on scroll ───────────────────────────────
const sections = document.querySelectorAll('.page-section');
const navLinks = document.querySelectorAll('.nav-link');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      const active = document.querySelector(`.nav-link[data-section="${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observer.observe(s));