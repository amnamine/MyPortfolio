// ===== THEME TOGGLE FUNCTIONALITY =====
class ThemeManager {
  constructor() {
    this.theme = localStorage.getItem('theme') || 'light';
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
    
    window.addEventListener('scroll', () => this.updateProgress());
  }

  updateProgress() {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    
    this.progressBar.style.transform = `scaleX(${scrolled / 100})`;
    this.progressBar.style.opacity = scrolled > 0 ? 1 : 0;
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
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
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
    this.sections = document.querySelectorAll('section');
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
    });

    // Mobile nav toggle
    if (this.navToggle && this.navList) {
      this.navToggle.addEventListener('click', () => {
        const expanded = this.navToggle.getAttribute('aria-expanded') === 'true';
        this.navToggle.setAttribute('aria-expanded', String(!expanded));
        this.navList.classList.toggle('show');
      });

      // Close mobile nav when a link is clicked
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
    const scrollPosition = window.scrollY + 100;

    this.sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    this.navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  handleNavbarScroll() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
      this.navbar.style.boxShadow = 'none';
    } else {
      this.navbar.style.boxShadow = 'var(--shadow-md)';
    }
    
    if (currentScroll > this.lastScroll && currentScroll > 100) {
      this.navbar.style.transform = 'translateY(-100%)';
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
    
    // Update active button
    this.filterButtons.forEach(btn => btn.classList.remove('active'));
    activeButton.classList.add('active');
    
    // Filter project cards
    this.projectCards.forEach(card => {
      const tags = card.getAttribute('data-tags');
      const shouldShow = filter === 'all' || (tags && tags.includes(filter));
      
      if (shouldShow) {
        card.style.display = 'block';
        card.style.animation = 'fadeInUp 0.6s ease-out';
      } else {
        card.style.display = 'none';
      }
    });
    
    // Filter project categories
    this.projectCategories.forEach(category => {
      const visibleCards = category.querySelectorAll('.project-card[style*="block"], .project-card:not([style*="none"])');
      if (visibleCards.length > 0) {
        category.style.display = 'block';
      } else {
        category.style.display = 'none';
      }
    });

    if (this.specialSections[filter]) {
      this.specialSections[filter].scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (this.specialSections.ai && filter === 'all') {
      // ensure default view shows entire projects area
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

    // Observe sections
    document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
    });

    // Observe project cards
    document.querySelectorAll('.project-card').forEach(card => {
      observer.observe(card);
    });

    // Observe collection cards
    document.querySelectorAll('.collection-card').forEach(card => {
      observer.observe(card);
    });

    // Observe certificate cards
    document.querySelectorAll('.certificate-card').forEach(card => {
      observer.observe(card);
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
      this.addClickEffects(card);
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
      
      card.style.transform = `
        perspective(1000px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg) 
        translateY(-5px)
      `;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'none';
    });
  }

  addClickEffects(card) {
    const button = card.querySelector('.project-button, .collection-button, .certificate-button');
    if (button) {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Add loading state
        const originalText = button.textContent;
        button.textContent = 'Opening...';
        button.style.opacity = '0.7';
        
        // Simulate loading
        setTimeout(() => {
          button.textContent = originalText;
          button.style.opacity = '1';
        }, 1000);
      });
    }
  }
}

// ===== CONTACT FORM HANDLING =====
class ContactForm {
  constructor() {
    this.form = document.querySelector('.contact-form');
    this.init();
  }

  init() {
    if (this.form) {
      this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(this.form);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Create mailto link
    const subject = `Portfolio Contact from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    const mailtoLink = `mailto:your-email@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    const submitBtn = this.form.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Email Opened!';
    submitBtn.style.background = '#10b981';
    
    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.style.background = '';
    }, 3000);
  }
}

// ===== SKILL TAGS ANIMATION =====
class SkillTagsAnimation {
  constructor() {
    this.init();
  }

  init() {
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
      tag.style.animationDelay = `${index * 0.1}s`;
      
      tag.addEventListener('mouseover', () => {
        tag.style.transform = 'scale(1.1) rotate(2deg)';
      });
      
      tag.addEventListener('mouseout', () => {
        tag.style.transform = 'scale(1) rotate(0deg)';
      });
    });
  }
}

// ===== PARALLAX EFFECTS =====
class ParallaxEffects {
  constructor() {
    this.init();
  }

  init() {
    // Combined performant parallax (scroll + mouse) using requestAnimationFrame
    this.hero = document.querySelector('.hero');
    if (!this.hero) return;

    this.mouseX = 0.5;
    this.mouseY = 0.5;
    this.scrollY = 0;
    this.currentX = 0;
    this.currentY = 0;

    // Use passive listeners where appropriate
    window.addEventListener('scroll', () => {
      this.scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
    }, { passive: true });

    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX / window.innerWidth;
      this.mouseY = e.clientY / window.innerHeight;
    });

    this.rafId = null;
    const loop = () => {
      // Target values
      const targetX = (this.mouseX - 0.5) * 12; // subtle horizontal
      const targetY = (this.mouseY - 0.5) * 8 + (this.scrollY * 0.02); // combine scroll offset

      // simple easing
      this.currentX += (targetX - this.currentX) * 0.08;
      this.currentY += (targetY - this.currentY) * 0.08;

      // Apply transform once per frame
      this.hero.style.transform = `translate3d(${this.currentX}px, ${this.currentY}px, 0)`;

      this.rafId = requestAnimationFrame(loop);
    };

    this.rafId = requestAnimationFrame(loop);
  }

  addHeroParallax() {
    const hero = document.querySelector('.hero');
    if (hero) {
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
      });
    }
  }

  addMouseParallax() {
    document.addEventListener('mousemove', (e) => {
      const hero = document.querySelector('.hero');
      if (hero) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        hero.style.transform = `
          translate(
            ${mouseX * 20 - 10}px,
            ${mouseY * 20 - 10}px
          )
        `;
      }
    });
  }
}

// ===== UTILITY FUNCTIONS =====
const openProject = (url) => {
  window.open(url, '_blank', 'noopener,noreferrer');
};

const openCollection = (url) => {
  window.open(url, '_blank', 'noopener,noreferrer');
};

const openCertificate = (url) => {
  window.open(url, '_blank', 'noopener,noreferrer');
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  new ThemeManager();
  new ScrollProgress();
  new SmoothScroll();
  new NavbarManager();
  new ProjectFilter();
  new AnimationObserver();
  new ProjectCardInteractions();
  new ContactForm();
  new SkillTagsAnimation();
  new ParallaxEffects();
  
  // Add loading animation
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});

// ===== PERFORMANCE OPTIMIZATIONS =====
// Throttle scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }
  scrollTimeout = setTimeout(() => {
    // Scroll-dependent operations
  }, 16); // ~60fps
});

// Preload critical resources
const preloadCriticalResources = () => {
  const criticalImages = [
    // Add any critical image URLs here
  ];
  
  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

// Initialize preloading
preloadCriticalResources();