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
  if (img) {
    document.getElementById('lightbox-img').src = img.src;
    document.getElementById('lightbox').classList.add('open');
    document.body.style.overflow = 'hidden';
  }
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


/* ── Gallery Slideshow ── */
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prev-slide');
const nextBtn = document.getElementById('next-slide');
const caption = document.getElementById('slide-caption');
const counter = document.getElementById('slide-counter');
const indicatorsContainer = document.getElementById('slide-indicators');
const slidesContainer = document.getElementById('slides-container');

if (slides.length > 0) {
  let currentIndex = 0;
  let autoplayTimer;

  // Generate indicators
  slides.forEach((_, idx) => {
    const btn = document.createElement('button');
    btn.setAttribute('aria-label', `Go to slide ${idx + 1}`);
    btn.className = `w-2 h-2 rounded-full transition-all duration-300 ${idx === 0 ? 'bg-forest w-5' : 'bg-forest/20'}`;
    btn.addEventListener('click', () => {
      showSlide(idx);
      resetAutoplay();
    });
    indicatorsContainer.appendChild(btn);
  });

  const indicators = indicatorsContainer.querySelectorAll('button');

  function showSlide(index) {
    // Handle wrap-around
    if (index >= slides.length) currentIndex = 0;
    else if (index < 0) currentIndex = slides.length - 1;
    else currentIndex = index;

    // Toggle active classes on slides
    slides.forEach((slide, idx) => {
      if (idx === currentIndex) {
        slide.classList.remove('opacity-0');
        slide.classList.add('opacity-100');
        // Preload lazy image when displayed
        const img = slide.querySelector('img');
        if (img && img.getAttribute('loading') === 'lazy') {
          img.removeAttribute('loading');
        }
      } else {
        slide.classList.remove('opacity-100');
        slide.classList.add('opacity-0');
      }
    });

    // Update indicators
    indicators.forEach((ind, idx) => {
      if (idx === currentIndex) {
        ind.className = 'w-2 h-2 rounded-full transition-all duration-300 bg-forest w-5';
      } else {
        ind.className = 'w-2 h-2 rounded-full transition-all duration-300 bg-forest/20';
      }
    });

    // Update counter and caption
    const currentImg = slides[currentIndex].querySelector('img');
    if (currentImg) {
      caption.textContent = currentImg.alt;
    }
    counter.textContent = `${currentIndex + 1} / ${slides.length}`;
  }

  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  function prevSlide() {
    showSlide(currentIndex - 1);
  }

  // Event Listeners
  if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); prevSlide(); resetAutoplay(); });
  if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); nextSlide(); resetAutoplay(); });

  // Lightbox integration on main slide click
  if (slidesContainer) {
    slidesContainer.addEventListener('click', () => {
      const activeImg = slides[currentIndex].querySelector('img');
      if (activeImg) {
        document.getElementById('lightbox-img').src = activeImg.src;
        document.getElementById('lightbox').classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  }

  // Autoplay
  function startAutoplay() {
    autoplayTimer = setInterval(nextSlide, 5000);
  }

  function resetAutoplay() {
    clearInterval(autoplayTimer);
    startAutoplay();
  }

  startAutoplay();

  // Pause on hover
  const slideshowWrapper = slidesContainer.parentElement;
  slideshowWrapper.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
  slideshowWrapper.addEventListener('mouseleave', startAutoplay);
  
  // Touch swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  
  slideshowWrapper.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  
  slideshowWrapper.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });
  
  function handleSwipe() {
    const swipeThreshold = 55;
    if (touchStartX - touchEndX > swipeThreshold) {
      nextSlide(); // swipe left -> next
      resetAutoplay();
    } else if (touchEndX - touchStartX > swipeThreshold) {
      prevSlide(); // swipe right -> prev
      resetAutoplay();
    }
  }
}


/* ── Lucide icon render ── */
if (window.lucide) {
  lucide.createIcons();
}
