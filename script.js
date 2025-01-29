// Clean up existing scroll progress elements
document.querySelectorAll('.scroll-progress').forEach(el => el.remove());

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Navbar Active Link Highlight
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li a');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 50) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href').includes(current)) {
      a.classList.add('active');
    }
  });
});

// Scroll Progress Indicator
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
  const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = (window.scrollY / windowHeight) * 100;
  scrollProgress.style.transform = `scaleX(${scrolled / 100})`;
  scrollProgress.style.opacity = scrolled > 0 ? 1 : 0;
});

// Enhanced Project Card Interactions
document.querySelectorAll('.project-card').forEach(card => {
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
});

// Skill Tags Animation
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

// Section Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  const currentScroll = window.pageYOffset;
  
  if (currentScroll <= 0) {
    navbar.style.boxShadow = 'none';
  } else {
    navbar.style.boxShadow = 'var(--shadow-md)';
  }
  
  if (currentScroll > lastScroll && currentScroll > 100) {
    navbar.style.transform = 'translateY(-100%)';
  } else {
    navbar.style.transform = 'translateY(0)';
  }
  
  lastScroll = currentScroll;
});

// Add hover effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((centerX - x) / centerX) * 10;
    
    card.style.transform = `
      perspective(1000px) 
      rotateX(${rotateX}deg) 
      rotateY(${rotateY}deg) 
      scale3d(1.02, 1.02, 1.02)
    `;
    
    // Add highlight effect
    const shine = card.querySelector('.shine') || document.createElement('div');
    shine.classList.add('shine');
    shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 80%)`;
    
    if (!card.querySelector('.shine')) {
      card.appendChild(shine);
    }
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    const shine = card.querySelector('.shine');
    if (shine) shine.remove();
  });
});

// Parallax Effect for Hero Section
const heroParallax = () => {
  const hero = document.querySelector('.hero');
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    hero.style.backgroundPosition = `center ${scrolled * 0.5}px`;
  });
};

// Animate Skill Tags
const animateSkills = () => {
  const skills = document.querySelectorAll('.skill-tag');
  skills.forEach((skill, index) => {
    skill.style.animationDelay = `${index * 0.1}s`;
  });
};

// Parallax Effect for Hero Section
document.addEventListener('mousemove', (e) => {
  const hero = document.querySelector('.hero');
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;
  
  hero.style.transform = `
    translate(
      ${mouseX * 20 - 10}px,
      ${mouseY * 20 - 10}px
    )
  `;
});

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
  heroParallax();
  animateSkills();
});
