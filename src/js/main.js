/* ── Navbar scroll ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
});

/* ── Hamburger ── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const hamIcon = document.getElementById('hamburger-icon');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    hamIcon.classList.toggle('fa-bars');
    hamIcon.classList.toggle('fa-times');
  });
}

window.closeMenu = function() {
  if (mobileMenu) {
    mobileMenu.classList.remove('open');
    hamIcon.classList.add('fa-bars');
    hamIcon.classList.remove('fa-times');
  }
}

/* ── Reveal on scroll ── */
const reveals = document.querySelectorAll('.reveal');
if (reveals.length > 0) {
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 60);
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => revealObs.observe(el));
}

/* ── Lightbox ── */
window.openLightbox = function(card) {
  const img = card.querySelector('img');
  document.getElementById('lightbox-img').src = img.src;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

window.closeLightbox = function() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
}

document.addEventListener('keydown', e => { 
  if(e.key === 'Escape') window.closeLightbox(); 
});

/* ── Contact form AJAX (Formspree) ── */
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    try {
      const res = await fetch(form.action, { method:'POST', body: data, headers:{ Accept:'application/json' } });
      if (res.ok) {
        form.reset();
        document.getElementById('form-success').classList.remove('hidden');
      }
    } catch(err) { console.error(err); }
  });
}

/* ── Lucide icon render ── */
if (window.lucide) {
  lucide.createIcons();
}
