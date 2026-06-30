/* 
  ========================================================================
  DATA ANALYST PORTFOLIO - CORE INTERACTIVE ENGINE
  ========================================================================
*/

document.addEventListener('DOMContentLoaded', () => {
  // 1. Loader Fade Out
  const loader = document.getElementById('loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
      }, 300);
    });
    setTimeout(() => {
      loader.style.opacity = '0';
      loader.style.visibility = 'hidden';
    }, 1500);
  }

  // 2. Scroll Progress Bar
  const progressBar = document.querySelector('.scroll-progress-bar');
  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    if (progressBar) {
      progressBar.style.width = scrolled + '%';
    }
  });

  // 3. Smart Navbar Scroll Behavior
  const navbar = document.querySelector('.navbar');
  let lastScrollTop = 0;
  const scrollThreshold = 10;

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    if (Math.abs(lastScrollTop - scrollTop) <= scrollThreshold) return;
    
    if (scrollTop > lastScrollTop && scrollTop > 150) {
      navbar.classList.add('nav-hidden');
    } else {
      navbar.classList.remove('nav-hidden');
    }
    lastScrollTop = scrollTop;
  });

  // 4. Active Section Highlighting
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a:not(.dropdown-content a)');
  const dropdownLinks = document.querySelectorAll('.dropdown-content a');

  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });

        const projectSubsections = ['sql', 'dashboard', 'excel', 'regression'];
        if (projectSubsections.includes(id)) {
          const projectsNav = document.querySelector('.nav-links a[href="#sql"]');
          if (projectsNav) projectsNav.classList.add('active');

          dropdownLinks.forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href') === `#${id}`) {
              link.style.color = 'var(--primary)';
            }
          });
        } else {
          dropdownLinks.forEach(link => link.style.color = '');
        }
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    if (section.getAttribute('id')) {
      sectionObserver.observe(section);
    }
  });

  // 5. Mobile Navigation Menu Toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinksContainer = document.querySelector('.nav-links');
  
  if (navToggle && navLinksContainer) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinksContainer.classList.toggle('active');
    });

    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinksContainer.classList.remove('active');
      });
    });
  }

  // 6. Typing Animation
  const typingElement = document.querySelector('.hero-typing');
  if (typingElement) {
    const words = ['Data Analyst', 'Problem Solver', 'Insights Creator', 'CS Graduate'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
      const currentWord = words[wordIndex];
      if (isDeleting) {
        typingElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typingElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 150;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typingSpeed = 2000;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingSpeed = 500;
      }

      setTimeout(type, typingSpeed);
    }

    setTimeout(type, 1000);
  }

  // 7. Scroll Reveal Animation
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 8. Skill Progress Bars & Circles Animation
  const skillsSection = document.querySelector('#skills');
  const skillBarFills = document.querySelectorAll('.skill-bar-fill');
  const skillCircleProgresses = document.querySelectorAll('.circle-progress');

  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        skillBarFills.forEach(fill => {
          const targetWidth = fill.getAttribute('data-width') || '0%';
          fill.style.width = targetWidth;
        });

        skillCircleProgresses.forEach(circle => {
          const percent = parseInt(circle.getAttribute('data-percent') || '0', 10);
          const strokeDashoffset = 251.3 - (251.3 * percent) / 100;
          circle.style.strokeDashoffset = strokeDashoffset;
        });

        skillsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  if (skillsSection) {
    skillsObserver.observe(skillsSection);
  }

  // 9. Back to Top Button
  const backToTopBtn = document.querySelector('.back-to-top');
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 10. 3D Tilt Effect on Cards
  const tiltCards = document.querySelectorAll('.project-card, .hero-image-card');
  
  if (window.innerWidth > 1024 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const width = rect.width;
        const height = rect.height;
        
        const rotateY = ((x / width) - 0.5) * 10;
        const rotateX = (((y / height) - 0.5) * -10);
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }
});
