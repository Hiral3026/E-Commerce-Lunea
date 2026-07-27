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

// Philosophy Quote Scroll Animation

const philosophyQuote = document.querySelector(".philosophy-quote");

if (philosophyQuote) {

    const quoteObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    philosophyQuote.classList.add("animate");

                    quoteObserver.unobserve(philosophyQuote);

                }

            });

        },
        {
            threshold: 0.5
        }
    );

    quoteObserver.observe(philosophyQuote);
}

/* =========================================================
   ACCOUNT DROPDOWN
========================================================= */

const accountDropdown = document.querySelector(".account-dropdown");
const accountToggle = document.querySelector(".account-toggle");

if (accountDropdown && accountToggle) {

    accountToggle.addEventListener("click", function (event) {

        event.stopPropagation();

        const isOpen = accountDropdown.classList.toggle("active");

        accountToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

    });


    /* Close when clicking outside */

    document.addEventListener("click", function (event) {

        if (!accountDropdown.contains(event.target)) {

            accountDropdown.classList.remove("active");

            accountToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });


    /* Close with Escape key */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            accountDropdown.classList.remove("active");

            accountToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });

}

/* =====================================================
   LUNEA SEARCH
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const searchToggle = document.querySelector(".search-toggle");
    const searchOverlay = document.getElementById("searchOverlay");
    const searchClose = document.getElementById("searchClose");

    const searchInput = document.getElementById("searchInput");
    const searchClear = document.getElementById("searchClear");

    const searchSuggestions =
        document.getElementById("searchSuggestions");

    const searchResults =
        document.getElementById("searchResults");

    const searchNoResults =
        document.getElementById("searchNoResults");


    /* =========================================
       PRODUCT DATABASE
    ========================================= */

    const searchProducts = [

        {
            name: "Calm Barrier Cream",
            collection: "Calm Collection",
            ingredient: "Lavender + Ceramides",
            price: "₹1,399",
            image: "images/Calm Collection/Calm-Barrier-Cream.png"
        },

        {
            name: "Hydrating Serum",
            collection: "Hydrate Collection",
            ingredient: "Hyaluronic Acid",
            price: "₹1,799",
            image: "images/Hydrate Collection/Hydrate-serum.png"
        },

        {
            name: "Vitamin C Essence",
            collection: "Glow Collection",
            ingredient: "Vitamin C",
            price: "₹1,899",
            image: "images/Glow Collection/Glow-Vitamin-C.png"
        },

        {
            name: "Balance Ampoule",
            collection: "Balance Collection",
            ingredient: "Centella Asiatica",
            price: "₹1,799",
            image: "images/Balance Collection/Balance-Ampolue.png"
        },

        {
            name: "Calm Cleansing Oil",
            collection: "Calm Collection",
            ingredient: "Lavender + Ceramides",
            price: "₹1,499",
            image: "images/Calm Collection/Calm-Clensing-Oil.png"
        },

        {
            name: "Hydrate Essence Toner",
            collection: "Hydrate Collection",
            ingredient: "Hyaluronic Acid",
            price: "₹1,499",
            image: "images/Hydrate Collection/Hydrate-Essence-toner.png"
        },

        {
            name: "Barrier Recovery Cream",
            collection: "Restore Collection",
            ingredient: "Oat + Peptides",
            price: "₹1,699",
            image: "images/Restore Collection/Restore-Barrier-cream.png"
        }

    ];


    /* =========================================
       OPEN SEARCH
    ========================================= */

    searchToggle.addEventListener("click", function () {

        searchOverlay.classList.add("active");

        searchToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        document.body.style.overflow = "hidden";

        setTimeout(function () {
            searchInput.focus();
        }, 300);

    });


    /* =========================================
       CLOSE SEARCH
    ========================================= */

    function closeSearch() {

        searchOverlay.classList.remove("active");

        searchToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        document.body.style.overflow = "";

        searchInput.value = "";

        searchClear.classList.remove("active");

        searchSuggestions.style.display = "block";

        searchResults.innerHTML = "";

        searchNoResults.classList.remove("active");

    }


    searchClose.addEventListener(
        "click",
        closeSearch
    );


    /* =========================================
       CLICK OUTSIDE
    ========================================= */

    searchOverlay.addEventListener(
        "click",
        function (event) {

            if (event.target === searchOverlay) {

                closeSearch();

            }

        }
    );


    /* =========================================
       SEARCH PRODUCTS
    ========================================= */

    function performSearch(query) {

        const searchTerm =
            query.toLowerCase().trim();


        if (searchTerm === "") {

            searchSuggestions.style.display =
                "block";

            searchResults.innerHTML = "";

            searchNoResults.classList.remove(
                "active"
            );

            return;

        }


        searchSuggestions.style.display =
            "none";


        const filteredProducts =
            searchProducts.filter(function (product) {

                return (

                    product.name
                        .toLowerCase()
                        .includes(searchTerm)

                    ||

                    product.collection
                        .toLowerCase()
                        .includes(searchTerm)

                    ||

                    product.ingredient
                        .toLowerCase()
                        .includes(searchTerm)

                );

            });


        /* NO RESULTS */

        if (filteredProducts.length === 0) {

            searchResults.innerHTML = "";

            searchNoResults.classList.add(
                "active"
            );

            return;

        }


        searchNoResults.classList.remove(
            "active"
        );


        /* DISPLAY RESULTS */

        searchResults.innerHTML =
            filteredProducts
                .map(function (product) {

                    return `

                        <a
                            href="products.html"
                            class="search-result-card"
                        >

                            <div class="search-result-image">

                                <img
                                    src="${product.image}"
                                    alt="${product.name}"
                                >

                            </div>

                            <span
                                class="search-result-collection"
                            >
                                ${product.collection}
                            </span>

                            <h3
                                class="search-result-name"
                            >
                                ${product.name}
                            </h3>

                            <p
                                class="search-result-price"
                            >
                                ${product.price}
                            </p>

                        </a>

                    `;

                })
                .join("");

    }


    /* =========================================
       INPUT SEARCH
    ========================================= */

    searchInput.addEventListener(
        "input",
        function () {

            const query =
                searchInput.value;

            performSearch(query);


            if (query.length > 0) {

                searchClear.classList.add(
                    "active"
                );

            } else {

                searchClear.classList.remove(
                    "active"
                );

            }

        }
    );


    /* =========================================
       CLEAR SEARCH
    ========================================= */

    searchClear.addEventListener(
        "click",
        function () {

            searchInput.value = "";

            searchClear.classList.remove(
                "active"
            );

            searchInput.focus();

            performSearch("");

        }
    );


    /* =========================================
       POPULAR SEARCH TAGS
    ========================================= */

    const searchTags =
        document.querySelectorAll(
            ".search-tags button"
        );


    searchTags.forEach(function (tag) {

        tag.addEventListener(
            "click",
            function () {

                const searchValue =
                    tag.dataset.search;

                searchInput.value =
                    searchValue;

                searchClear.classList.add(
                    "active"
                );

                performSearch(
                    searchValue
                );

            }
        );

    });


    /* =========================================
       ESC KEY
    ========================================= */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                searchOverlay.classList.contains(
                    "active"
                )
            ) {

                closeSearch();

            }

        }
    );

});

// =====================================================
// LUNEA HEADER SEARCH BUTTON
// =====================================================

const navSearchBtn = document.getElementById("navSearchBtn");

if (navSearchBtn) {

    navSearchBtn.addEventListener("click", function () {

        const productSearch = document.getElementById("productSearch");

        if (productSearch) {

            // Scroll to the product search box
            productSearch.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            // Focus the search input
            setTimeout(() => {
                productSearch.focus();
            }, 500);

        }

    });

}