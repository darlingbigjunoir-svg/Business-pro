

(function () {
  'use strict';


  const navbar = document.querySelector('.navbar');

  function handleNavbarScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll(); // run on load


  const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.querySelector('.nav-links');
  const navPhone  = document.querySelector('.nav-phone');


  const mobileMenu = document.createElement('div');
  mobileMenu.className = 'mobile-menu';
  mobileMenu.innerHTML = `
    <button class="mobile-close" aria-label="Close menu">
      <i class="fa fa-times"></i>
    </button>
    <ul class="mobile-nav-links">
      <li><a href="#">Home</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Services</a></li>
      <li><a href="#">Contact</a></li>
      <li><a href="#">Pages</a></li>
    </ul>
    <a href="#" class="mobile-phone"><i class="fa fa-phone"></i> 123 456 789</a>
  `;
  document.body.appendChild(mobileMenu);

  const mobileClose = mobileMenu.querySelector('.mobile-close');

  function openMobileMenu() {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', openMobileMenu);
  mobileClose.addEventListener('click', closeMobileMenu);

  // Close on outside click
  mobileMenu.addEventListener('click', function (e) {
    if (e.target === mobileMenu) closeMobileMenu();
  });

  // Close on nav link click
  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMobileMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMobileMenu();
  });


  /* -----------------------------------------------
     3. SCROLL-REVEAL ANIMATIONS (Intersection Observer)
  ----------------------------------------------- */
  const revealElements = document.querySelectorAll(
    '.event-card, .recruit-inner, .cta-left, .cta-right, .footer-col, .hero-content, .events h2, .events .section-label'
  );

  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(function (el, i) {
    el.classList.add('reveal-hidden');
    el.style.transitionDelay = (i * 0.07) + 's';
    revealObserver.observe(el);
  });


  /* -----------------------------------------------
     4. VIDEO PLAY BUTTON MODAL (lightbox)
  ----------------------------------------------- */
  // Build modal markup
  const modal = document.createElement('div');
  modal.className = 'video-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-label', 'Video Player');
  modal.innerHTML = `
    <div class="video-modal-backdrop"></div>
    <div class="video-modal-box">
      <button class="video-modal-close" aria-label="Close video">
        <i class="fa fa-times"></i>
      </button>
      <div class="video-modal-player">
        <div class="video-placeholder">
          <div class="video-placeholder-icon"><i class="fa fa-play-circle"></i></div>
          <p class="video-placeholder-text">Video Player</p>
          <p class="video-placeholder-sub">In a production site, an iframe or HTML5 video would load here.</p>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const modalBackdrop = modal.querySelector('.video-modal-backdrop');
  const modalClose    = modal.querySelector('.video-modal-close');

  function openModal() {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    modalClose.focus();
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Attach all play buttons
  document.querySelectorAll('.play-btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      openModal();
    });
  });

  modalBackdrop.addEventListener('click', closeModal);
  modalClose.addEventListener('click', closeModal);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });


  /* -----------------------------------------------
     5. NAV DROPDOWN MENUS (hover)
  ----------------------------------------------- */
  const dropdownData = {
    'Home':     ['Home v1', 'Home v2', 'Home v3'],
    'About':    ['Our Story', 'Our Team', 'Careers'],
    'Services': ['Recruitment', 'Executive Search', 'HR Consulting', 'Training'],
    'Contact':  ['Get In Touch', 'Locations', 'Support'],
    'Pages':    ['Gallery', 'Pricing', 'FAQ', 'Blog'],
  };

  document.querySelectorAll('.nav-links > li').forEach(function (li) {
    const link = li.querySelector('a');
    const label = link.childNodes[0].textContent.trim();

    if (!dropdownData[label]) return;

    // Build dropdown
    const dropdown = document.createElement('ul');
    dropdown.className = 'nav-dropdown';
    dropdownData[label].forEach(function (item) {
      const dLi = document.createElement('li');
      dLi.innerHTML = `<a href="#">${item}</a>`;
      dropdown.appendChild(dLi);
    });
    li.appendChild(dropdown);
    li.classList.add('has-dropdown');

    // Show/hide on hover (CSS handles display; JS adds .active for animation)
    li.addEventListener('mouseenter', function () {
      li.classList.add('dropdown-open');
    });
    li.addEventListener('mouseleave', function () {
      li.classList.remove('dropdown-open');
    });
  });


  /* -----------------------------------------------
     6. SMOOTH SCROLLING for anchor links
  ----------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  /* -----------------------------------------------
     7. EVENT CARD HOVER TILT EFFECT
  ----------------------------------------------- */
  document.querySelectorAll('.event-card').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const midX = rect.width  / 2;
      const midY = rect.height / 2;
      const rotateX = ((y - midY) / midY) * -5;
      const rotateY = ((x - midX) / midX) *  5;
      card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    });

    card.addEventListener('mouseleave', function () {
      card.style.transform = 'perspective(600px) rotateX(0) rotateY(0) scale(1)';
      card.style.transition = 'transform 0.35s ease';
    });

    card.addEventListener('mouseenter', function () {
      card.style.transition = 'transform 0.1s ease';
    });
  });


  /* -----------------------------------------------
     8. "GET A QUOTE" BUTTON – ripple click effect
  ----------------------------------------------- */
  document.querySelectorAll('.btn-orange').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();

      const ripple = document.createElement('span');
      ripple.className = 'btn-ripple';

      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 1.5;
      ripple.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${e.clientX - rect.left - size / 2}px;
        top:  ${e.clientY - rect.top  - size / 2}px;
      `;

      btn.appendChild(ripple);
      ripple.addEventListener('animationend', function () { ripple.remove(); });
    });
  });


  /* -----------------------------------------------
     9. COUNTER ANIMATION (runs once when in view)
     (Visual flair – could drive stats if added to page)
  ----------------------------------------------- */
  function animateCounter(el, target, duration) {
    let start     = 0;
    const step    = target / (duration / 16);
    const suffix  = el.dataset.suffix || '';

    const timer = setInterval(function () {
      start += step;
      if (start >= target) {
        el.textContent = target + suffix;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(start) + suffix;
      }
    }, 16);
  }

  const counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const el     = entry.target;
        const target = parseInt(el.dataset.target, 10);
        animateCounter(el, target, 1500);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-counter]').forEach(function (el) {
    counterObserver.observe(el);
  });


  /* -----------------------------------------------
     10. INJECT DYNAMIC STYLES for JS-driven UI
         (navbar scroll, mobile menu, modal, reveal,
          dropdown, ripple)
  ----------------------------------------------- */
  const dynamicStyles = document.createElement('style');
  dynamicStyles.textContent = `

    /* -- Navbar scrolled state -- */
    .navbar.scrolled {
      position: fixed;
      background: rgba(30, 77, 56, 0.97);
      backdrop-filter: blur(8px);
      box-shadow: 0 2px 20px rgba(0,0,0,0.18);
      animation: navSlideDown 0.3s ease;
    }

    @keyframes navSlideDown {
      from { transform: translateY(-100%); opacity: 0; }
      to   { transform: translateY(0);    opacity: 1; }
    }

    /* -- Scroll reveal -- */
    .reveal-hidden {
      opacity: 0;
      transform: translateY(32px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .revealed {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }

    /* -- Mobile Menu -- */
    .mobile-menu {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 24px;
      position: fixed;
      inset: 0;
      background: rgba(20, 50, 36, 0.97);
      z-index: 9999;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
    }
    .mobile-menu.open {
      opacity: 1;
      pointer-events: all;
    }
    .mobile-close {
      position: absolute;
      top: 20px; right: 24px;
      background: none;
      border: none;
      color: #fff;
      font-size: 1.6rem;
      cursor: pointer;
    }
    .mobile-nav-links {
      list-style: none;
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .mobile-nav-links a {
      color: #fff;
      text-decoration: none;
      font-size: 1.4rem;
      font-weight: 700;
      font-family: 'Playfair Display', serif;
      transition: color 0.2s;
    }
    .mobile-nav-links a:hover { color: #e07c28; }
    .mobile-phone {
      color: #fff;
      background: #e07c28;
      text-decoration: none;
      padding: 12px 32px;
      border-radius: 30px;
      font-weight: 700;
      font-size: 0.95rem;
    }

    /* -- Video Modal -- */
    .video-modal {
      position: fixed;
      inset: 0;
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    .video-modal.open {
      opacity: 1;
      pointer-events: all;
    }
    .video-modal-backdrop {
      position: absolute;
      inset: 0;
      background: rgba(0,0,0,0.75);
    }
    .video-modal-box {
      position: relative;
      z-index: 2;
      background: #111;
      border-radius: 16px;
      overflow: hidden;
      width: 90%;
      max-width: 760px;
      aspect-ratio: 16/9;
      box-shadow: 0 30px 80px rgba(0,0,0,0.6);
      transform: scale(0.88);
      transition: transform 0.3s ease;
    }
    .video-modal.open .video-modal-box {
      transform: scale(1);
    }
    .video-modal-close {
      position: absolute;
      top: 14px; right: 16px;
      z-index: 10;
      background: rgba(255,255,255,0.12);
      border: none;
      color: #fff;
      width: 36px; height: 36px;
      border-radius: 50%;
      font-size: 1rem;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: background 0.2s;
    }
    .video-modal-close:hover { background: rgba(255,255,255,0.25); }
    .video-modal-player {
      width: 100%; height: 100%;
      display: flex; align-items: center; justify-content: center;
    }
    .video-placeholder {
      text-align: center;
      color: rgba(255,255,255,0.7);
    }
    .video-placeholder-icon { font-size: 4rem; color: #e07c28; margin-bottom: 12px; }
    .video-placeholder-text { font-size: 1.1rem; font-weight: 700; color: #fff; }
    .video-placeholder-sub  { font-size: 0.78rem; margin-top: 6px; opacity: 0.55; max-width: 280px; }

    /* -- Nav Dropdowns -- */
    .has-dropdown { position: relative; }
    .nav-dropdown {
      position: absolute;
      top: calc(100% + 10px);
      left: 50%;
      transform: translateX(-50%) translateY(-8px);
      background: #fff;
      border-radius: 10px;
      box-shadow: 0 12px 40px rgba(0,0,0,0.12);
      list-style: none;
      min-width: 180px;
      padding: 10px 0;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.22s ease, transform 0.22s ease;
      z-index: 500;
    }
    .has-dropdown.dropdown-open .nav-dropdown {
      opacity: 1;
      pointer-events: all;
      transform: translateX(-50%) translateY(0);
    }
    .nav-dropdown li a {
      color: #1a1a1a !important;
      display: block;
      padding: 9px 20px;
      font-size: 0.85rem;
      font-weight: 600;
      opacity: 1 !important;
      transition: background 0.15s, color 0.15s;
    }
    .nav-dropdown li a:hover {
      background: #f0f0ec;
      color: #2e6b4f !important;
    }

    /* -- Ripple button effect -- */
    .btn-orange { position: relative; overflow: hidden; }
    .btn-ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255,255,255,0.3);
      transform: scale(0);
      animation: rippleAnim 0.55s linear;
      pointer-events: none;
    }
    @keyframes rippleAnim {
      to { transform: scale(1); opacity: 0; }
    }

    /* -- Event card transition base -- */
    .event-card {
      transition: transform 0.35s ease;
      cursor: pointer;
    }
  `;

  document.head.appendChild(dynamicStyles);


  /* -----------------------------------------------
     11. PAGE LOAD – stagger hero elements in
  ----------------------------------------------- */
  window.addEventListener('load', function () {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      heroContent.style.opacity = '0';
      heroContent.style.transform = 'translateY(24px)';
      heroContent.style.transition = 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s';

      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          heroContent.style.opacity = '1';
          heroContent.style.transform = 'translateY(0)';
        });
      });
    }
  });


  /* -----------------------------------------------
     12. FOOTER LINKS – prevent default + console log
         (placeholder for real routing)
  ----------------------------------------------- */
  document.querySelectorAll('.footer a').forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (this.getAttribute('href') === '#') {
        e.preventDefault();
        // In a real site: router.navigate(this.dataset.route)
      }
    });
  });

})();