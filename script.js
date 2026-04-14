// smooth scrolling
document.querySelectorAll('a[href^=\"#\"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Vertical Timeline Animation with IntersectionObserver & staggered year bars
const timeline = document.querySelector('#experience-timeline');

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Trigger CSS animations
      entry.target.classList.add('animate');
      
      // Staggered year-bar growth
      const yearBars = entry.target.querySelectorAll('.year-bar');
      yearBars.forEach((bar, index) => {
        bar.style.animationDelay = `${0.5 + index * 0.2}s`;
        bar.style.animationPlayState = 'running';
      });
      
      timelineObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

if (timeline) {
  timelineObserver.observe(timeline);
}

// Scroll animation for job items
const items = document.querySelectorAll(".timeline-item");

window.addEventListener("scroll", () => {
  items.forEach(item => {
    const top = item.getBoundingClientRect().top;
    if(top < window.innerHeight - 100){
      item.style.opacity = 1;
      item.style.transform = "translateY(0)";
    }
  });
});

// Diploma Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('diploma-modal');
  const iframe = document.getElementById('diploma-iframe');
  const closeBtn = document.querySelector('.close');
  const diplomaBtns = document.querySelectorAll('.diploma-btn');

  // Open modal
  diplomaBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const diplomaSrc = this.getAttribute('data-diploma');
      iframe.src = diplomaSrc;
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    });
  });

  // Close modal
  function closeModal() {
    modal.style.display = 'none';
    iframe.src = '';
    document.body.style.overflow = 'auto';
  }

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', function(e) {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'block') {
      closeModal();
    }
  });
});

// Interactive Skills
function initSkills() {
  const skillItems = document.querySelectorAll('.skill-item[data-level]');
  
  skillItems.forEach(item => {
    const level = parseInt(item.dataset.level);
    const desc = item.dataset.desc;
    const circle = item.querySelector('.progress-ring__circle');
    const text = item.querySelector('.progress-text');
    
    // Animate progress ring
    const radius = 16;
    const circumference = 2 * Math.PI * radius;
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference;
    
    // Show tooltip on click/hover
    item.addEventListener('click', () => {
      item.classList.toggle('active');
      showTooltip(item, desc);
    });
    
    item.addEventListener('mouseenter', () => {
      animateProgress(circle, level);
      text.textContent = `${level}%`;
    });
  });
}

function animateProgress(circle, level) {
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (level / 100 * circumference);
  circle.style.strokeDashoffset = offset;
}

function showTooltip(item, desc) {
  let tooltip = item.querySelector('.skill-tooltip');
  if (!tooltip) {
    tooltip = document.createElement('div');
    tooltip.className = 'skill-tooltip';
    tooltip.innerHTML = `<div class="tooltip-content">${desc}</div>`;
    item.appendChild(tooltip);
  }
  tooltip.style.opacity = item.classList.contains('active') ? '1' : '0';
}

// Initialize when DOM loaded
if (document.querySelector('.skill-item[data-level]')) {
  initSkills();
}
