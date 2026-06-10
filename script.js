// Navbar: scroll state
const navbar = document.getElementById('navbar');
function updateNav() {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}
window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  hamburger.classList.toggle('active', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

navMenu.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

// Fade-in on scroll
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

// Contact form
const form       = document.getElementById('contact-form');
const formError  = document.getElementById('form-error');
const formSuccess = document.getElementById('form-success');
const btnSubmit  = document.getElementById('btn-submit');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  formError.textContent = '';

  const lastName  = form.querySelector('#last-name').value.trim();
  const firstName = form.querySelector('#first-name').value.trim();
  const email     = form.querySelector('#form-email').value.trim();
  const message   = form.querySelector('#form-message').value.trim();

  if (!lastName || !firstName || !email || !message) {
    formError.textContent = '必須項目をすべてご入力ください。';
    return;
  }

  btnSubmit.disabled     = true;
  btnSubmit.textContent  = '送信中...';

  try {
    const res = await fetch(form.action, {
      method:  'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ last_name: lastName, first_name: firstName, email, message }),
    });

    if (res.ok) {
      form.style.display = 'none';
      formSuccess.classList.add('visible');
    } else {
      formError.textContent = '送信に失敗しました。時間をおいてもう一度お試しください。';
      btnSubmit.disabled    = false;
      btnSubmit.textContent = '送信する';
    }
  } catch {
    formError.textContent = 'ネットワークエラーが発生しました。';
    btnSubmit.disabled    = false;
    btnSubmit.textContent = '送信する';
  }
});
