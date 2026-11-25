// ===== THEME TOGGLE FUNCTIONALITY =====
class ThemeManager {
  constructor() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.theme = savedTheme || (prefersDark ? 'dark' : 'light');
    this.init();
  }

  init() {
    this.setTheme(this.theme);
    this.bindEvents();
  }

  setTheme(theme) {
    this.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
      themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
  }

  toggleTheme() {
    const newTheme = this.theme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  bindEvents() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => this.toggleTheme());
    }
  }
}

// ===== SCROLL PROGRESS =====
class ScrollProgress {
  constructor() {
    this.progressBar = document.getElementById('scrollProgress');
    this.init();
  }

  init() {
    if (!this.progressBar) return;

    window.addEventListener('scroll', () => this.updateProgress(), { passive: true });
  }

  updateProgress() {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (windowHeight <= 0) {
      this.progressBar.style.transform = 'scaleX(0)';
      this.progressBar.style.opacity = '0';
      return;
    }

    const ratio = Math.min(Math.max(window.scrollY / windowHeight, 0), 1);
    this.progressBar.style.transform = `scaleX(${ratio})`;
    this.progressBar.style.opacity = ratio > 0 ? '1' : '0';
  }
}

// ===== SMOOTH SCROLLING =====
class SmoothScroll {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        const target = href ? document.querySelector(href) : null;
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }
}

// ===== NAVBAR ACTIVE LINK =====
class NavbarManager {
  constructor() {
    this.sections = document.querySelectorAll('section, footer#footer');
    this.navLinks = document.querySelectorAll('nav ul li a');
    this.navbar = document.getElementById('navbar');
    this.navToggle = document.getElementById('navToggle');
    this.navList = document.querySelector('#navbar ul');
    this.lastScroll = 0;
    this.init();
  }

  init() {
    window.addEventListener('scroll', () => {
      this.updateActiveLink();
      this.handleNavbarScroll();
    }, { passive: true });

    if (this.navToggle && this.navList) {
      this.navToggle.addEventListener('click', () => {
        const expanded = this.navToggle.getAttribute('aria-expanded') === 'true';
        this.navToggle.setAttribute('aria-expanded', String(!expanded));
        this.navList.classList.toggle('show');
      });

      this.navList.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
          if (this.navList.classList.contains('show')) {
            this.navList.classList.remove('show');
            this.navToggle.setAttribute('aria-expanded', 'false');
          }
        });
      });
    }
  }

  updateActiveLink() {
    let current = '';
    const scrollPosition = window.scrollY + 120;
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10;

    if (atBottom) {
      current = 'footer';
    } else {
      this.sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          current = section.getAttribute('id') || '';
        }
      });
    }

    this.navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  handleNavbarScroll() {
    if (!this.navbar) return;

    const currentScroll = window.pageYOffset;
    const isMobile = window.innerWidth <= 768;

    this.navbar.style.boxShadow = currentScroll <= 0 ? 'none' : 'var(--shadow-md)';

    if (!isMobile && !(this.navList && this.navList.classList.contains('show'))) {
      if (currentScroll > this.lastScroll && currentScroll > 100) {
        this.navbar.style.transform = 'translateY(-100%)';
      } else {
        this.navbar.style.transform = 'translateY(0)';
      }
    } else {
      this.navbar.style.transform = 'translateY(0)';
    }

    this.lastScroll = currentScroll;
  }
}

// ===== PROJECT FILTERING =====
class ProjectFilter {
  constructor() {
    this.filterButtons = document.querySelectorAll('.filter-btn');
    this.projectCards = document.querySelectorAll('.project-card');
    this.projectCategories = document.querySelectorAll('.project-category');
    this.specialSections = {
      fullstack: document.getElementById('fullstack-projects'),
      ai: document.getElementById('ai-projects-yolo'),
    };
    this.init();
  }

  init() {
    this.filterButtons.forEach(button => {
      button.addEventListener('click', () => this.filterProjects(button));
    });
  }

  filterProjects(activeButton) {
    const filter = activeButton.getAttribute('data-filter');

    this.filterButtons.forEach(btn => btn.classList.remove('active'));
    activeButton.classList.add('active');

    this.projectCards.forEach(card => {
      const tags = (card.getAttribute('data-tags') || '').split(',').map(t => t.trim());
      const shouldShow = filter === 'all' || tags.includes(filter);

      if (shouldShow) {
        card.style.display = '';
        card.style.animation = 'fadeInUp 0.6s ease-out';
      } else {
        card.style.display = 'none';
      }
    });

    this.projectCategories.forEach(category => {
      const hasVisible = Array.from(category.querySelectorAll('.project-card')).some(
        card => card.style.display !== 'none'
      );
      category.style.display = hasVisible ? '' : 'none';
    });

    Object.values(this.specialSections).forEach(section => {
      if (!section) return;
      const hasVisible = Array.from(section.querySelectorAll('.project-card')).some(
        card => card.style.display !== 'none'
      );
      section.style.display = hasVisible ? '' : 'none';
    });

    if (this.specialSections[filter] && this.specialSections[filter].style.display !== 'none') {
      this.specialSections[filter].scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (filter === 'all') {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
class AnimationObserver {
  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    this.init();
  }

  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, this.observerOptions);

    document.querySelectorAll('section, .project-card, .certificate-card').forEach(el => {
      observer.observe(el);
    });
  }
}

// ===== ENHANCED PROJECT CARD INTERACTIONS =====
class ProjectCardInteractions {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('.project-card').forEach(card => {
      this.addHoverEffects(card);
    });
  }

  addHoverEffects(card) {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * 5;
      const rotateY = ((centerX - x) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  }
}

// ===== SKILL TAGS ANIMATION =====
class SkillTagsAnimation {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('.skill-tag').forEach((tag, index) => {
      tag.style.animationDelay = `${index * 0.1}s`;
    });
  }
}

// ===== PARALLAX EFFECTS =====
class ParallaxEffects {
  constructor() {
    this.init();
  }

  init() {
    this.hero = document.querySelector('.hero');
    if (!this.hero) return;

    this.mouseX = 0.5;
    this.mouseY = 0.5;
    this.scrollY = 0;
    this.currentX = 0;
    this.currentY = 0;
    this.rafId = null;

    const scheduleUpdate = () => {
      if (!this.rafId) {
        this.rafId = requestAnimationFrame(loop);
      }
    };

    const loop = () => {
      const targetX = (this.mouseX - 0.5) * 12;
      const targetY = (this.mouseY - 0.5) * 8 + (this.scrollY * 0.02);

      this.currentX += (targetX - this.currentX) * 0.1;
      this.currentY += (targetY - this.currentY) * 0.1;

      this.hero.style.transform = `translate3d(${this.currentX}px, ${this.currentY}px, 0)`;

      if (Math.abs(targetX - this.currentX) > 0.05 || Math.abs(targetY - this.currentY) > 0.05) {
        this.rafId = requestAnimationFrame(loop);
      } else {
        this.rafId = null;
      }
    };

    window.addEventListener('scroll', () => {
      this.scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
      scheduleUpdate();
    }, { passive: true });

    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX / window.innerWidth;
      this.mouseY = e.clientY / window.innerHeight;
      scheduleUpdate();
    });
  }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  new ThemeManager();
  new ScrollProgress();
  new SmoothScroll();
  new NavbarManager();
  new ProjectFilter();
  new AnimationObserver();
  new ProjectCardInteractions();
  new SkillTagsAnimation();
  new ParallaxEffects();

  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});
