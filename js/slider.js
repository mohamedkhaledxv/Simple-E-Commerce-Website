
document.addEventListener('DOMContentLoaded', () => {
let slideIndex = 0;
let slides = document.getElementsByClassName("slides");

function showSlide(index) {
    if (index >= slides.length) {
        slideIndex = 0;
    } else if (index < 0) {
        slideIndex = slides.length - 1;
    } else {
        slideIndex = index;
    }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex].style.display = "block";
}

function changeSlide(n) {
    showSlide(slideIndex + n);
}

function autoSlide() {
    showSlide(slideIndex + 1);
    setTimeout(autoSlide, 4000);
}

showSlide(slideIndex);
setTimeout(autoSlide, 4000);
});