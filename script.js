const revealElements = Array.from(document.querySelectorAll('.reveal'));

revealElements.forEach((el, index) => {
  el.dataset.revealOrder = String(index);
});

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      }

      const target = entry.target;
      const order = Number(target.dataset.revealOrder || '0');
      target.style.transitionDelay = `${Math.min(order * 60, 300)}ms`;
      target.classList.add('is-visible');
      observer.unobserve(target);
    });
  },
  {
    threshold: 0.18,
  }
);

revealElements.forEach(el => observer.observe(el));

const playLink = document.getElementById('play-link');
if (playLink) {
  playLink.addEventListener('click', event => {
    if (playLink.getAttribute('href') === '#') {
      event.preventDefault();
    }
  });
}

// ── Contact form via EmailJS ──────────────────────────────────────────────────
(function () {
  // Replace these three values with your own from emailjs.com
  const EMAILJS_PUBLIC_KEY  = '-oPFi9C6owC4aB09_';
  const EMAILJS_SERVICE_ID  = 'service_coxip5l';
  const EMAILJS_TEMPLATE_ID = 'template_tl0bqjc';

  emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

  const form   = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (!form || !status) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    btn.disabled    = true;
    btn.textContent = 'Sending…';
    status.textContent = '';
    status.className   = 'form-status';

    const params = {
      from_name:  form.querySelector('[name="name"]').value,
      from_email: form.querySelector('[name="email"]').value,
      subject:    form.querySelector('[name="object"]').value,
      message:    form.querySelector('[name="message"]').value,
    };

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params)
      .then(function () {
        status.textContent = 'Message sent! We\'ll get back to you soon.';
        status.className   = 'form-status form-status--success';
        form.reset();
      })
      .catch(function () {
        status.textContent = 'Something went wrong. Please try again.';
        status.className   = 'form-status form-status--error';
      })
      .finally(function () {
        btn.disabled    = false;
        btn.textContent = 'Send Message';
      });
  });
}());
