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
