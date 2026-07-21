// =====================================================
// NEW LAUNCHES CAROUSEL
// =====================================================

const launchTrack = document.querySelector(".launch-track");
const launchSlides = document.querySelectorAll(".launch-slide");

const prevLaunchBtn = document.querySelector(".launch-prev");
const nextLaunchBtn = document.querySelector(".launch-next");

const launchDots = document.querySelectorAll(".launch-dot");

let currentLaunchSlide = 0;
function updateLaunchCarousel() {

    if (!launchTrack || launchSlides.length === 0) {
        return;
    }

    const slide = launchSlides[currentLaunchSlide];

    const slideWidth = slide.offsetWidth;

    const trackGap = parseFloat(
        getComputedStyle(launchTrack).gap
    ) || 0;

    const slidePosition =
        slide.offsetLeft;

    const viewportWidth =
        launchTrack.parentElement.offsetWidth;

    const offset =
        slidePosition -
        (viewportWidth - slideWidth) / 2;

    launchTrack.style.transform =
        `translateX(-${offset}px)`;


    // Update dots

    launchDots.forEach((dot, index) => {

        dot.classList.toggle(
            "active",
            index === currentLaunchSlide
        );

    });

}


// NEXT BUTTON

if (nextLaunchBtn) {

    nextLaunchBtn.addEventListener("click", () => {

        currentLaunchSlide++;

        if (currentLaunchSlide >= launchSlides.length) {
            currentLaunchSlide = 0;
        }

        updateLaunchCarousel();

    });

}


// PREVIOUS BUTTON

if (prevLaunchBtn) {

    prevLaunchBtn.addEventListener("click", () => {

        currentLaunchSlide--;

        if (currentLaunchSlide < 0) {
            currentLaunchSlide = launchSlides.length - 1;
        }

        updateLaunchCarousel();

    });

}


// DOTS

launchDots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        currentLaunchSlide = index;

        updateLaunchCarousel();

    });

});


// RESPONSIVE

window.addEventListener("resize", () => {
    updateLaunchCarousel();
});


// INITIALIZE

updateLaunchCarousel();