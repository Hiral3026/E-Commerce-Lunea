
// =====================================================
// LUNEA PRODUCTS PAGE
// Product Search, Filter, Sort & Quick View
// =====================================================


// =====================================================
// DOM ELEMENTS
// =====================================================

const productGrid = document.getElementById("productGrid");

const productCards = Array.from(
    document.querySelectorAll(".product-card")
);

const filterButtons =
    document.querySelectorAll(".filter-btn");

const productSearch =
    document.getElementById("productSearch");

const sortProducts =
    document.getElementById("sortProducts");

const productResultsCount =
    document.getElementById("productResultsCount");

const noProductsMessage =
    document.getElementById("noProductsMessage");


// =====================================================
// QUICK VIEW ELEMENTS
// =====================================================

const quickViewModal =
    document.getElementById("quickViewModal");

const quickViewClose =
    document.getElementById("quickViewClose");

const quickViewOverlay =
    document.querySelector(".quick-view-overlay");

const quickViewImage =
    document.getElementById("quickViewImage");

const quickViewCollection =
    document.getElementById("quickViewCollection");

const quickViewTitle =
    document.getElementById("quickViewTitle");

const quickViewIngredient =
    document.getElementById("quickViewIngredient");

const quickViewPrice =
    document.getElementById("quickViewPrice");

const quickViewDescription =
    document.getElementById("quickViewDescription");


// =====================================================
// QUANTITY ELEMENTS
// =====================================================

const decreaseQuantity =
    document.getElementById("decreaseQuantity");

const increaseQuantity =
    document.getElementById("increaseQuantity");

const productQuantity =
    document.getElementById("productQuantity");


// =====================================================
// QUICK VIEW VARIABLES
// =====================================================

let currentQuantity = 1;

let currentProduct = null;

let activeFilter = "all";


// =====================================================
// GET PRODUCT INFORMATION
// =====================================================

function getProductData(card) {

    return {

        image:
            card.querySelector(".product-image img")?.src || "",

        imageAlt:
            card.querySelector(".product-image img")?.alt || "",

        collection:
            card.querySelector(".product-collection")
                ?.textContent.trim() || "",

        name:
            card.querySelector(".product-name")
                ?.textContent.trim() || "",

        ingredient:
            card.querySelector(".product-ingredient")
                ?.textContent.trim() || "",

        price:
            card.querySelector(".product-price")
                ?.textContent.trim() || "",

        category:
            card.dataset.category || "",

        description:
            "A thoughtfully crafted LUNEA skincare formula designed to support your skin with carefully selected ingredients."

    };

}


// =====================================================
// FILTER + SEARCH + SORT PRODUCTS
// =====================================================

function updateProducts() {

    // =================================================
    // SAFETY CHECK
    // =================================================
    // Prevents the following error:
    //
    // Cannot read properties of null
    // (reading 'appendChild')
    //
    // if productGrid does not exist.

    if (!productGrid) {

        console.warn(
            "LUNEA: #productGrid was not found on this page."
        );

        return;

    }


    // =================================================
    // GET SEARCH VALUE
    // =================================================

    const searchTerm =
        productSearch?.value
            .toLowerCase()
            .trim() || "";


    // =================================================
    // GET SORT VALUE
    // =================================================

    const sortValue =
        sortProducts?.value || "default";


    // =================================================
    // FILTER PRODUCTS
    // =================================================

    let visibleProducts =
        productCards.filter(card => {

            const product =
                getProductData(card);


            // -----------------------------------------
            // COLLECTION FILTER
            // -----------------------------------------

            const matchesFilter =
                activeFilter === "all" ||
                product.category === activeFilter;


            // -----------------------------------------
            // SEARCH FILTER
            // -----------------------------------------

            const searchableText = `

                ${product.name}

                ${product.collection}

                ${product.ingredient}

            `.toLowerCase();


            const matchesSearch =
                searchableText.includes(searchTerm);


            // -----------------------------------------
            // RETURN MATCH
            // -----------------------------------------

            return (
                matchesFilter &&
                matchesSearch
            );

        });


    // =================================================
    // SORT BY PRICE - LOW TO HIGH
    // =================================================

    if (sortValue === "price-low") {

        visibleProducts.sort((a, b) => {

            const priceA =
                parseInt(
                    getProductData(a)
                        .price
                        .replace(/[^\d]/g, "")
                ) || 0;


            const priceB =
                parseInt(
                    getProductData(b)
                        .price
                        .replace(/[^\d]/g, "")
                ) || 0;


            return priceA - priceB;

        });

    }


    // =================================================
    // SORT BY PRICE - HIGH TO LOW
    // =================================================

    if (sortValue === "price-high") {

        visibleProducts.sort((a, b) => {

            const priceA =
                parseInt(
                    getProductData(a)
                        .price
                        .replace(/[^\d]/g, "")
                ) || 0;


            const priceB =
                parseInt(
                    getProductData(b)
                        .price
                        .replace(/[^\d]/g, "")
                ) || 0;


            return priceB - priceA;

        });

    }


    // =================================================
    // SORT BY NAME - A TO Z
    // =================================================

    if (sortValue === "name-a-z") {

        visibleProducts.sort((a, b) => {

            const nameA =
                getProductData(a)
                    .name
                    .toLowerCase();


            const nameB =
                getProductData(b)
                    .name
                    .toLowerCase();


            return nameA.localeCompare(nameB);

        });

    }


    // =================================================
    // SORT BY NAME - Z TO A
    // =================================================

    if (sortValue === "name-z-a") {

        visibleProducts.sort((a, b) => {

            const nameA =
                getProductData(a)
                    .name
                    .toLowerCase();


            const nameB =
                getProductData(b)
                    .name
                    .toLowerCase();


            return nameB.localeCompare(nameA);

        });

    }


    // =================================================
    // REORDER PRODUCT GRID
    // =================================================

    visibleProducts.forEach(card => {

        productGrid.appendChild(card);

        card.style.display = "block";

    });


    // =================================================
    // HIDE PRODUCTS THAT DON'T MATCH
    // =================================================

    productCards.forEach(card => {

        if (
            !visibleProducts.includes(card)
        ) {

            card.style.display = "none";

        }

    });


    // =================================================
    // NO PRODUCTS MESSAGE
    // =================================================

    if (noProductsMessage) {

        if (
            visibleProducts.length === 0
        ) {

            noProductsMessage.style.display =
                "block";

        } else {

            noProductsMessage.style.display =
                "none";

        }

    }


    // =================================================
    // UPDATE RESULTS COUNT
    // =================================================

    if (productResultsCount) {

        if (
            visibleProducts.length === 0
        ) {

            productResultsCount.textContent =
                "No products found";

        }

        else if (
            visibleProducts.length ===
            productCards.length
        ) {

            productResultsCount.textContent =
                `Showing all ${productCards.length} products`;

        }

        else {

            productResultsCount.textContent =
                `Showing ${visibleProducts.length} product${
                    visibleProducts.length > 1
                        ? "s"
                        : ""
                }`;

        }

    }

}


// =====================================================
// COLLECTION FILTER BUTTONS
// =====================================================

filterButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            // -----------------------------------------
            // REMOVE ACTIVE STATE
            // -----------------------------------------

            filterButtons.forEach(btn => {

                btn.classList.remove(
                    "active"
                );

            });


            // -----------------------------------------
            // ADD ACTIVE STATE
            // -----------------------------------------

            button.classList.add(
                "active"
            );


            // -----------------------------------------
            // GET SELECTED CATEGORY
            // -----------------------------------------

            activeFilter =
                button.dataset.filter ||
                "all";


            // -----------------------------------------
            // UPDATE PRODUCTS
            // -----------------------------------------

            updateProducts();

        }
    );

});


// =====================================================
// PRODUCT SEARCH
// =====================================================

if (productSearch) {

    productSearch.addEventListener(
        "input",
        updateProducts
    );

}


// =====================================================
// PRODUCT SORT
// =====================================================

if (sortProducts) {

    sortProducts.addEventListener(
        "change",
        updateProducts
    );

}


// =====================================================
// OPEN QUICK VIEW
// =====================================================

const quickViewButtons =
    document.querySelectorAll(
        ".quick-view-btn"
    );


quickViewButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            // -----------------------------------------
            // FIND PRODUCT CARD
            // -----------------------------------------

            const productCard =
                button.closest(
                    ".product-card"
                );


            // -----------------------------------------
            // CHECK PRODUCT CARD
            // -----------------------------------------

            if (!productCard) {

                return;

            }


            // -----------------------------------------
            // CHECK QUICK VIEW MODAL
            // -----------------------------------------

            if (!quickViewModal) {

                return;

            }


            // -----------------------------------------
            // STORE CURRENT PRODUCT
            // -----------------------------------------

            currentProduct =
                getProductData(
                    productCard
                );


            // -----------------------------------------
            // FILL QUICK VIEW IMAGE
            // -----------------------------------------

            if (quickViewImage) {

                quickViewImage.src =
                    currentProduct.image;

                quickViewImage.alt =
                    currentProduct.imageAlt;

            }


            // -----------------------------------------
            // FILL COLLECTION
            // -----------------------------------------

            if (quickViewCollection) {

                quickViewCollection.textContent =
                    currentProduct.collection;

            }


            // -----------------------------------------
            // FILL PRODUCT NAME
            // -----------------------------------------

            if (quickViewTitle) {

                quickViewTitle.textContent =
                    currentProduct.name;

            }


            // -----------------------------------------
            // FILL INGREDIENT
            // -----------------------------------------

            if (quickViewIngredient) {

                quickViewIngredient.textContent =
                    currentProduct.ingredient;

            }


            // -----------------------------------------
            // FILL PRICE
            // -----------------------------------------

            if (quickViewPrice) {

                quickViewPrice.textContent =
                    currentProduct.price;

            }


            // -----------------------------------------
            // FILL DESCRIPTION
            // -----------------------------------------

            if (quickViewDescription) {

                quickViewDescription.textContent =
                    currentProduct.description;

            }


            // -----------------------------------------
            // RESET QUANTITY
            // -----------------------------------------

            currentQuantity = 1;


            if (productQuantity) {

                productQuantity.textContent =
                    currentQuantity;

            }


            // -----------------------------------------
            // OPEN MODAL
            // -----------------------------------------

            quickViewModal.classList.add(
                "active"
            );


            quickViewModal.setAttribute(
                "aria-hidden",
                "false"
            );


            // -----------------------------------------
            // PREVENT BACKGROUND SCROLLING
            // -----------------------------------------

            document.body.classList.add(
                "modal-open"
            );

        }
    );

});


// =====================================================
// CLOSE QUICK VIEW
// =====================================================

function closeQuickView() {

    // -----------------------------------------------
    // SAFETY CHECK
    // -----------------------------------------------

    if (!quickViewModal) {

        return;

    }


    // -----------------------------------------------
    // CLOSE MODAL
    // -----------------------------------------------

    quickViewModal.classList.remove(
        "active"
    );


    quickViewModal.setAttribute(
        "aria-hidden",
        "true"
    );


    // -----------------------------------------------
    // RESTORE PAGE SCROLLING
    // -----------------------------------------------

    document.body.classList.remove(
        "modal-open"
    );

}


// =====================================================
// QUICK VIEW CLOSE BUTTON
// =====================================================

if (quickViewClose) {

    quickViewClose.addEventListener(
        "click",
        closeQuickView
    );

}


// =====================================================
// QUICK VIEW OVERLAY
// =====================================================

if (quickViewOverlay) {

    quickViewOverlay.addEventListener(
        "click",
        closeQuickView
    );

}


// =====================================================
// CLOSE MODAL WITH ESCAPE KEY
// =====================================================

document.addEventListener(
    "keydown",
    event => {

        if (

            event.key === "Escape" &&

            quickViewModal &&

            quickViewModal.classList.contains(
                "active"
            )

        ) {

            closeQuickView();

        }

    }
);


// =====================================================
// INCREASE QUANTITY
// =====================================================

if (increaseQuantity) {

    increaseQuantity.addEventListener(
        "click",
        () => {

            currentQuantity++;


            if (productQuantity) {

                productQuantity.textContent =
                    currentQuantity;

            }

        }
    );

}


// =====================================================
// DECREASE QUANTITY
// =====================================================

if (decreaseQuantity) {

    decreaseQuantity.addEventListener(
        "click",
        () => {

            // -----------------------------------------
            // MINIMUM QUANTITY = 1
            // -----------------------------------------

            if (
                currentQuantity > 1
            ) {

                currentQuantity--;


                if (productQuantity) {

                    productQuantity.textContent =
                        currentQuantity;

                }

            }

        }
    );

}


// =====================================================
// INITIALIZE PRODUCTS PAGE
// =====================================================

if (productGrid) {

    updateProducts();

}

/* =====================================================
   PRODUCT PAGE WISHLIST BUTTONS
===================================================== */

const wishlistButtons = document.querySelectorAll(
    ".wishlist-btn"
);

wishlistButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const productCard =
            button.closest(".product-card");

        if (!productCard) {
            return;
        }

        /* Get product ID directly from the card */

        const productId =
            productCard.dataset.productId;

        if (!productId) {
            return;
        }

        /* Check if product is already in wishlist */

        const exists = wishlist.some(
            item => item.id === productId
        );


        /* Remove from wishlist */

        if (exists) {

            removeFromWishlist(productId);

            button.classList.remove("active");

            const icon =
                button.querySelector("i");

            if (icon) {

                icon.classList.remove(
                    "fa-solid"
                );

                icon.classList.add(
                    "fa-regular"
                );

            }

        }

        /* Add to wishlist */

        else {

            addToWishlist(productId);

            button.classList.add("active");

            const icon =
                button.querySelector("i");

            if (icon) {

                icon.classList.remove(
                    "fa-regular"
                );

                icon.classList.add(
                    "fa-solid"
                );

            }

        }

    });

});
