// smooth scrolling

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

anchor.addEventListener('click', function(e) {

e.preventDefault();

document.querySelector(this.getAttribute('href')).scrollIntoView({
behavior: 'smooth'
});

});

});


// scroll animation

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