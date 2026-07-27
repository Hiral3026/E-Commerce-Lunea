/* =========================================================
   LUNEA WISHLIST
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       WISHLIST STORAGE
    ===================================================== */

    let wishlist = JSON.parse(localStorage.getItem("luneaWishlist")) || [];


    /* =====================================================
       WISHLIST PAGE ELEMENTS
    ===================================================== */

    const wishlistContainer = document.getElementById("wishlistGrid");
    const wishlistCount = document.getElementById("wishlistCount");
    const emptyWishlist = document.getElementById("wishlistEmpty");
    const clearWishlistButton = document.getElementById("clearWishlist");

    /* =====================================================
       PRODUCT DATA
    ===================================================== */

    const products = {

        "calm-barrier-cream": {
            id: "calm-barrier-cream",
            name: "Calm Barrier Cream",
            collection: "Calm Collection",
            ingredient: "Lavender + Ceramides",
            price: "₹1,399",
            image: "images/Calm Collection/Calm-Barrier-Cream.png"
        },

        "hydrating-serum": {
            id: "hydrating-serum",
            name: "Hydrating Serum",
            collection: "Soft Blue Collection",
            ingredient: "Hyaluronic Acid",
            price: "₹1,799",
            image: "images/Hydrate Collection/Hydrate-serum.png"
        },

        "vitamin-c-essence": {
            id: "vitamin-c-essence",
            name: "Vitamin C Essence",
            collection: "Glow Collection",
            ingredient: "Vitamin C",
            price: "₹1,899",
            image: "images/Glow Collection/Glow-Vitamin-C.png"
        },

        "balance-ampoule": {
            id: "balance-ampoule",
            name: "Balance Ampoule",
            collection: "Sage Collection",
            ingredient: "Centella Asiatica",
            price: "₹1,799",
            image: "images/Balance Collection/Balance-Ampolue.png"
        },

        "calm-cleansing-oil": {
            id: "calm-cleansing-oil",
            name: "Calm Cleansing Oil",
            collection: "Calm Collection",
            ingredient: "Lavender + Ceramides",
            price: "₹1,299",
            image: "images/Calm Collection/Calm-Clensing-Oil.png"
        },

        "hydrate-essence-toner": {
            id: "hydrate-essence-toner",
            name: "Hydrate Essence Toner",
            collection: "Hydrate Collection",
            ingredient: "Hyaluronic Acid",
            price: "₹1,499",
            image: "images/Hydrate Collection/Hydrate-Essence-toner.png"
        },

        "barrier-recovery-cream": {
            id: "barrier-recovery-cream",
            name: "Barrier Recovery Cream",
            collection: "Restore Collection",
            ingredient: "Oat + Peptides",
            price: "₹1,599",
            image: "images/Restore Collection/Restore-Barrier-cream.png"
        }

    };


    /* =====================================================
       SAVE WISHLIST
    ===================================================== */

    function saveWishlist() {

        localStorage.setItem(
            "luneaWishlist",
            JSON.stringify(wishlist)
        );

    }


    /* =====================================================
       UPDATE WISHLIST COUNT
    ===================================================== */
    function updateWishlistCount() {

        if (wishlistCount) {

            const count = wishlist.length;

            wishlistCount.textContent =
                `${count} ${count === 1 ? "ITEM" : "ITEMS"}`;

        }

    }

    /* =====================================================
       ADD PRODUCT TO WISHLIST
    ===================================================== */

    function addToWishlist(productId) {

        const product = products[productId];

        if (!product) {
            return;
        }

        const alreadyExists = wishlist.some(
            item => item.id === productId
        );


        if (!alreadyExists) {

            wishlist.push(product);

            saveWishlist();

            updateWishlistCount();

            showNotification(
                `${product.name} added to your wishlist.`
            );

        }

    }


    /* =====================================================
       REMOVE PRODUCT FROM WISHLIST
    ===================================================== */

    function removeFromWishlist(productId) {

        wishlist = wishlist.filter(
            item => item.id !== productId
        );

        saveWishlist();

        updateWishlistCount();

        renderWishlist();

    }


    /* =====================================================
       CLEAR COMPLETE WISHLIST
    ===================================================== */

    function clearWishlist() {

        if (wishlist.length === 0) {
            return;
        }


        const confirmClear = confirm(
            "Are you sure you want to clear your wishlist?"
        );


        if (confirmClear) {

            wishlist = [];

            saveWishlist();

            updateWishlistCount();

            renderWishlist();

        }

    }


    /* =====================================================
       RENDER WISHLIST
    ===================================================== */

    function renderWishlist() {

        if (!wishlistContainer) {
            return;
        }


        wishlistContainer.innerHTML = "";


        /* EMPTY WISHLIST */

        if (wishlist.length === 0) {

            if (emptyWishlist) {

                emptyWishlist.style.display = "flex";

            }

            wishlistContainer.style.display = "none";

            return;

        }


        /* WISHLIST HAS PRODUCTS */

        if (emptyWishlist) {

            emptyWishlist.style.display = "none";

        }

        wishlistContainer.style.display = "grid";


        wishlist.forEach(function (product) {

            const productCard = document.createElement("article");

            productCard.className = "wishlist-card";


            productCard.innerHTML = `

                <div class="wishlist-image">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                    >

                    <button
                        type="button"
                        class="wishlist-remove"
                        data-product-id="${product.id}"
                        aria-label="Remove ${product.name} from wishlist"
                    >
                        <i class="fa-solid fa-xmark"></i>
                    </button>

                </div>


                <div class="wishlist-content">

                    <span class="wishlist-collection">
                        ${product.collection}
                    </span>

                    <h3 class="wishlist-product-name">
                        ${product.name}
                    </h3>

                    <p class="wishlist-ingredient">
                        ${product.ingredient}
                    </p>

                    <p class="wishlist-price">
                        ${product.price}
                    </p>


                    <div class="wishlist-actions">

                        <button
                            type="button"
                            class="wishlist-add-cart"
                            data-product-id="${product.id}"
                        >
                            Add to Cart
                        </button>

                        <button
                            type="button"
                            class="wishlist-remove-text"
                            data-product-id="${product.id}"
                        >
                            Remove
                        </button>

                    </div>

                </div>

            `;


            wishlistContainer.appendChild(productCard);

        });

    }


    /* =====================================================
       WISHLIST REMOVE BUTTONS
    ===================================================== */

    document.addEventListener("click", function (event) {

        const removeButton = event.target.closest(
            ".wishlist-remove, .wishlist-remove-text"
        );


        if (removeButton) {

            const productId =
                removeButton.dataset.productId;

            removeFromWishlist(productId);

        }

    });


    /* =====================================================
       ADD TO CART FROM WISHLIST
    ===================================================== */

    document.addEventListener("click", function (event) {

        const addCartButton = event.target.closest(
            ".wishlist-add-cart"
        );


        if (!addCartButton) {
            return;
        }


        const productId =
            addCartButton.dataset.productId;


        const product = products[productId];


        if (!product) {
            return;
        }


        /* Get existing cart */

        let cart =
            JSON.parse(localStorage.getItem("luneaCart")) || [];


        /* Check if product already exists */

        const existingProduct =
            cart.find(item => item.id === productId);


        if (existingProduct) {

            existingProduct.quantity =
                (existingProduct.quantity || 1) + 1;

        } else {

            cart.push({

                id: product.id,

                name: product.name,

                collection: product.collection,

                price: product.price,

                image: product.image,

                quantity: 1

            });

        }


        /* Save cart */

        localStorage.setItem(
            "luneaCart",
            JSON.stringify(cart)
        );


        showNotification(
            `${product.name} added to your bag.`
        );


        /* Update cart count */

        updateCartCount();

    });


    /* =====================================================
       CLEAR WISHLIST BUTTON
    ===================================================== */

    if (clearWishlistButton) {

        clearWishlistButton.addEventListener(
            "click",
            clearWishlist
        );

    }


    /* =====================================================
       UPDATE CART COUNT
    ===================================================== */

    function updateCartCount() {

        const cartCount =
            document.getElementById("cartCount");


        if (!cartCount) {
            return;
        }


        const cart =
            JSON.parse(localStorage.getItem("luneaCart")) || [];


        const totalItems = cart.reduce(
            (total, item) =>
                total + (item.quantity || 1),
            0
        );


        cartCount.textContent = totalItems;

    }


    /* =====================================================
       NOTIFICATION
    ===================================================== */

    function showNotification(message) {

        let notification =
            document.querySelector(".wishlist-notification");


        if (!notification) {

            notification =
                document.createElement("div");

            notification.className =
                "wishlist-notification";

            document.body.appendChild(
                notification
            );

        }


        notification.textContent = message;

        notification.classList.add("show");


        setTimeout(function () {

            notification.classList.remove(
                "show"
            );

        }, 2500);

    }


    /* =====================================================
       PRODUCT PAGE WISHLIST BUTTONS
    ===================================================== */

    const wishlistButtons =
        document.querySelectorAll(
            ".wishlist-btn"
        );


    wishlistButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const productCard =
                    button.closest(".product-card");


                if (!productCard) {
                    return;
                }


                const productName =
                    productCard.querySelector(
                        ".product-name"
                    )?.textContent.trim();


                let productId = null;


                /* Match product name to product ID */

                Object.values(products).forEach(
                    function (product) {

                        if (
                            product.name.toLowerCase() ===
                            productName.toLowerCase()
                        ) {

                            productId =
                                product.id;

                        }

                    }
                );


                if (!productId) {
                    return;
                }


                const exists =
                    wishlist.some(
                        item =>
                            item.id === productId
                    );


                if (exists) {

                    removeFromWishlist(
                        productId
                    );

                    button.classList.remove(
                        "active"
                    );


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

                } else {

                    addToWishlist(
                        productId
                    );

                    button.classList.add(
                        "active"
                    );


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

            }
        );

    });


    /* =====================================================
       INITIALIZE
    ===================================================== */

    updateWishlistCount();

    updateCartCount();

    renderWishlist();

});