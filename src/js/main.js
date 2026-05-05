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

/* ── Contact form (Send to WhatsApp) ── */
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    
    const name = data.get('name') || '';
    const phone = data.get('phone') || '';
    const email = data.get('email') || '';
    const details = data.get('details') || '';
    const message = data.get('message') || '';
    
    let waMessage = `*New Booking Enquiry*\n\n`;
    waMessage += `*Name:* ${name}\n`;
    if (phone) waMessage += `*Phone:* ${phone}\n`;
    if (email) waMessage += `*Email:* ${email}\n`;
    if (details) waMessage += `*Dates & Guests:* ${details}\n`;
    if (message) waMessage += `*Message:* ${message}\n`;
    
    const encodedMessage = encodeURIComponent(waMessage);
    
    // Using placeholder number (user can change this in HTML/JS later or just right here)
    const waPhone = '919876543210'; 
    const waUrl = `https://wa.me/${waPhone}?text=${encodedMessage}`;
    
    window.open(waUrl, '_blank');
    
    form.reset();
    const successEl = document.getElementById('form-success');
    successEl.innerText = "✓ Sending to WhatsApp...";
    successEl.classList.remove('hidden');
  });
}

/* ── Lucide icon render ── */
if (window.lucide) {
  lucide.createIcons();
}
