// Basic UI: menu toggle, gallery lightbox, simple form validation, year update

document.addEventListener('DOMContentLoaded', function(){
  // set dynamic years
  const year = new Date().getFullYear();
  document.querySelectorAll('[id^="year"]').forEach(el => el.textContent = year);

  // menu toggle
  const menuBtn = document.querySelectorAll('.menu-btn');
  menuBtn.forEach(btn => {
    btn.addEventListener('click', function(){
      const nav = btn.nextElementSibling;
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', !expanded);
      nav.classList.toggle('open');
    });
  });

  // gallery lightbox
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const closeBtn = document.querySelector('.lightbox-close');

  document.querySelectorAll('.gallery-item').forEach(btn => {
    btn.addEventListener('click', function(){
      const full = btn.getAttribute('data-full') || btn.querySelector('img').src;
      lightboxImg.src = full;
      lightboxImg.alt = btn.querySelector('img').alt || 'Gallery image';
      lightbox.style.display = 'flex';
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox(){
    lightbox.style.display = 'none';
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.src = '';
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function(e){ if(e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeLightbox(); });

  // simple contact form validation (client side only)
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      const msgEl = document.getElementById('formMsg');

      if(!name || !email || !message){
        msgEl.textContent = 'Please fill in required fields.';
        msgEl.style.color = 'crimson';
        return;
      }
      // lightweight email regex
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!re.test(email)){
        msgEl.textContent = 'Please enter a valid email address.';
        msgEl.style.color = 'crimson';
        return;
      }

      // success (client-side). Replace with actual AJAX / Formspree / backend endpoint
      msgEl.style.color = 'green';
      msgEl.textContent = 'Thank you — your message has been received. We will contact you shortly.';
      form.reset();
    });
  }
});
function toggleMenu() {
  const nav = document.querySelector('.nav-links');
  nav.classList.toggle('active');
}
