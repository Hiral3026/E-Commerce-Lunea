// =====================================================
// LUNEA CART SYSTEM
// Add to Cart + Cart Count + Cart Page
// =====================================================


// =====================================================
// CART STORAGE
// =====================================================

let cart = JSON.parse(
    localStorage.getItem("luneaCart")
) || [];


// =====================================================
// DOM ELEMENTS
// =====================================================

const cartCount =
    document.getElementById("cartCount");


// =====================================================
// SHIPPING SETTINGS
// =====================================================

const FREE_SHIPPING_LIMIT = 1599;

const SHIPPING_FEE = 99;


// =====================================================
// SAVE CART
// =====================================================

function saveCart() {

    localStorage.setItem(
        "luneaCart",
        JSON.stringify(cart)
    );

}


// =====================================================
// UPDATE CART COUNT
// =====================================================

function updateCartCount() {

    const currentCartCount =
        document.getElementById("cartCount");

    if (!currentCartCount) {

        return;

    }


    // Calculate total quantity

    const totalItems = cart.reduce(
        (total, item) => {

            return total +
                (Number(item.quantity) || 0);

        },
        0
    );


    // Update count

    currentCartCount.textContent =
        totalItems;


    // Hide count when cart is empty

    if (totalItems === 0) {

        currentCartCount.classList.remove(
            "show"
        );

    } else {

        currentCartCount.classList.add(
            "show"
        );

    }

}


// =====================================================
// FORMAT PRICE
// =====================================================

function formatCartPrice(amount) {

    return `₹${Number(amount || 0).toLocaleString("en-IN")}`;

}


// =====================================================
// GET NUMERIC PRICE
// =====================================================

function getCartNumericPrice(price) {

    if (typeof price === "number") {

        return price;

    }


    return Number(
        String(price || "")
            .replace(/[₹,]/g, "")
            .trim()
    ) || 0;

}


// =====================================================
// ADD PRODUCT TO CART
// =====================================================

function addToCart(product, quantity = 1) {

    if (!product) {

        return;

    }


    // Make sure quantity is valid

    quantity =
        Number(quantity) || 1;


    // Check if product already exists

    const existingProduct =
        cart.find(
            item =>
                item.name === product.name
        );


    if (existingProduct) {

        // Increase quantity

        existingProduct.quantity =
            (Number(existingProduct.quantity) || 0) +
            quantity;

    } else {

        // Add new product

        cart.push({

            name:
                product.name || "",

            collection:
                product.collection || "",

            ingredient:
                product.ingredient || "",

            price:
                product.price || 0,

            image:
                product.image || "",

            quantity:
                quantity

        });

    }


    // Save cart

    saveCart();


    // Update navigation count

    updateCartCount();


    // Show confirmation

    showCartNotification(
        `${product.name} added to your cart`
    );

}


// =====================================================
// CART NOTIFICATION
// =====================================================

function showCartNotification(message) {

    // Remove existing notification

    const existingNotification =
        document.querySelector(
            ".cart-notification"
        );


    if (existingNotification) {

        existingNotification.remove();

    }


    // Create notification

    const notification =
        document.createElement("div");


    notification.className =
        "cart-notification";


    notification.innerHTML = `

        <i class="fa-solid fa-check"></i>

        <span>
            ${message}
        </span>

    `;


    document.body.appendChild(
        notification
    );


    // Show notification

    setTimeout(() => {

        notification.classList.add(
            "show"
        );

    }, 10);


    // Hide notification

    setTimeout(() => {

        notification.classList.remove(
            "show"
        );

    }, 2500);


    // Remove from DOM

    setTimeout(() => {

        notification.remove();

    }, 3000);

}


// =====================================================
// PRODUCT CARD — ADD TO CART
// =====================================================

const addToCartButtons =
    document.querySelectorAll(
        ".add-to-cart-btn"
    );


addToCartButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {


            // Find product card

            const productCard =
                button.closest(
                    ".product-card"
                );


            if (!productCard) {

                return;

            }


            // Get product information

            const product = {

                name:
                    productCard
                        .querySelector(
                            ".product-name"
                        )
                        ?.textContent
                        .trim() || "",


                collection:
                    productCard
                        .querySelector(
                            ".product-collection"
                        )
                        ?.textContent
                        .trim() || "",


                ingredient:
                    productCard
                        .querySelector(
                            ".product-ingredient"
                        )
                        ?.textContent
                        .trim() || "",


                price:
                    productCard
                        .querySelector(
                            ".product-price"
                        )
                        ?.textContent
                        .trim() || "",


                image:
                    productCard
                        .querySelector(
                            ".product-image img"
                        )
                        ?.src || ""

            };


            // Add product

            addToCart(
                product,
                1
            );

        }
    );

});


// =====================================================
// QUICK VIEW — ADD TO CART
// =====================================================

const quickViewAddToCart =
    document.getElementById(
        "quickViewAddToCart"
    );


if (quickViewAddToCart) {

    quickViewAddToCart.addEventListener(
        "click",
        () => {


            // Make sure product is selected

            if (
                typeof currentProduct ===
                    "undefined" ||
                !currentProduct
            ) {

                return;

            }


            // Get selected quantity

            const quantity =
                typeof currentQuantity !==
                    "undefined"

                    ? Number(currentQuantity) || 1

                    : 1;


            // Add product

            addToCart(
                currentProduct,
                quantity
            );


            // Close Quick View

            if (
                typeof closeQuickView ===
                "function"
            ) {

                closeQuickView();

            }

        }
    );

}


// =====================================================
// CART PAGE ELEMENTS
// =====================================================

const cartLayout =
    document.getElementById(
        "cartLayout"
    );


const emptyCart =
    document.getElementById(
        "emptyCart"
    );


const cartItemsContainer =
    document.getElementById(
        "cartItems"
    );


const cartItemsCount =
    document.getElementById(
        "cartItemsCount"
    );


const cartSubtotal =
    document.getElementById(
        "cartSubtotal"
    );


const cartShipping =
    document.getElementById(
        "cartShipping"
    );


const cartTotal =
    document.getElementById(
        "cartTotal"
    );


const shippingMessage =
    document.getElementById(
        "shippingMessage"
    );


const checkoutBtn =
    document.getElementById(
        "checkoutBtn"
    );


// =====================================================
// CALCULATE CART SUBTOTAL
// =====================================================

function calculateCartSubtotal() {

    return cart.reduce(
        (total, item) => {

            const price =
                getCartNumericPrice(
                    item.price
                );


            const quantity =
                Number(item.quantity) || 1;


            return total +
                (
                    price *
                    quantity
                );

        },
        0
    );

}


// =====================================================
// RENDER CART
// =====================================================

function renderCart() {

    // Only run on Cart page

    if (!cartItemsContainer) {

        return;

    }


    // Clear current items

    cartItemsContainer.innerHTML = "";


    // Check if cart is empty

    if (cart.length === 0) {


        // Hide cart layout

        if (cartLayout) {

            cartLayout.style.display =
                "none";

        }


        // Show empty cart

        if (emptyCart) {

            emptyCart.style.display =
                "block";

        }


        // Update summary

        updateCartSummary();

        return;

    }


    // Show cart layout

    if (cartLayout) {

        cartLayout.style.display =
            "grid";

    }


    // Hide empty cart

    if (emptyCart) {

        emptyCart.style.display =
            "none";

    }


    // Create cart items

    cart.forEach(
        (item, index) => {


            const cartItem =
                document.createElement(
                    "div"
                );


            cartItem.className =
                "cart-item";


            cartItem.innerHTML = `

                <div class="cart-item-image">

                    <img
                        src="${item.image || ""}"
                        alt="${item.name || "Product"}"
                    >

                </div>


                <div class="cart-item-details">

                    <span class="cart-item-collection">
                        ${item.collection || ""}
                    </span>


                    <h3 class="cart-item-name">
                        ${item.name || ""}
                    </h3>


                    <p class="cart-item-ingredient">
                        ${item.ingredient || ""}
                    </p>


                    <span class="cart-item-price">
                        ${item.price || formatCartPrice(0)}
                    </span>

                </div>


                <div class="cart-item-actions">

                    <div class="cart-quantity">

                        <button
                            type="button"
                            class="decrease-cart-quantity"
                            data-index="${index}"
                            aria-label="Decrease quantity"
                        >
                            −
                        </button>


                        <span>
                            ${Number(item.quantity) || 1}
                        </span>


                        <button
                            type="button"
                            class="increase-cart-quantity"
                            data-index="${index}"
                            aria-label="Increase quantity"
                        >
                            +
                        </button>

                    </div>


                    <button
                        type="button"
                        class="remove-cart-item"
                        data-index="${index}"
                    >
                        Remove
                    </button>

                </div>

            `;


            cartItemsContainer.appendChild(
                cartItem
            );

        }
    );


    // Add events

    addCartItemEvents();


    // Update summary

    updateCartSummary();

}


// =====================================================
// CART ITEM EVENTS
// =====================================================

function addCartItemEvents() {


    // =================================================
    // INCREASE QUANTITY
    // =================================================

    const increaseButtons =
        document.querySelectorAll(
            ".increase-cart-quantity"
        );


    increaseButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {


                    const index =
                        Number(
                            button.dataset.index
                        );


                    if (
                        cart[index]
                    ) {


                        cart[index].quantity =
                            (Number(
                                cart[index].quantity
                            ) || 1) + 1;


                        saveCart();

                        updateCartCount();

                        renderCart();

                    }

                }
            );

        }
    );


    // =================================================
    // DECREASE QUANTITY
    // =================================================

    const decreaseButtons =
        document.querySelectorAll(
            ".decrease-cart-quantity"
        );


    decreaseButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {


                    const index =
                        Number(
                            button.dataset.index
                        );


                    if (
                        cart[index]
                    ) {


                        cart[index].quantity =
                            (Number(
                                cart[index].quantity
                            ) || 1) - 1;


                        // Remove if quantity reaches zero

                        if (
                            cart[index].quantity <= 0
                        ) {

                            cart.splice(
                                index,
                                1
                            );

                        }


                        saveCart();

                        updateCartCount();

                        renderCart();

                    }

                }
            );

        }
    );


    // =================================================
    // REMOVE PRODUCT
    // =================================================

    const removeButtons =
        document.querySelectorAll(
            ".remove-cart-item"
        );


    removeButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {


                    const index =
                        Number(
                            button.dataset.index
                        );


                    if (
                        cart[index]
                    ) {


                        cart.splice(
                            index,
                            1
                        );


                        saveCart();

                        updateCartCount();

                        renderCart();

                    }

                }
            );

        }
    );

}


// =====================================================
// UPDATE CART SUMMARY
// =====================================================

function updateCartSummary() {

    if (
        !cartSubtotal ||
        !cartShipping ||
        !cartTotal
    ) {

        return;

    }


    // Calculate subtotal

    const subtotal =
        calculateCartSubtotal();


    // Calculate shipping

    let shipping = 0;


    if (
        subtotal > 0 &&
        subtotal < FREE_SHIPPING_LIMIT
    ) {

        shipping =
            SHIPPING_FEE;

    }


    // Calculate total

    const total =
        subtotal +
        shipping;


    // Update subtotal

    cartSubtotal.textContent =
        formatCartPrice(
            subtotal
        );


    // Update shipping

    if (
        shipping === 0
    ) {

        cartShipping.textContent =
            "FREE";

    } else {

        cartShipping.textContent =
            formatCartPrice(
                shipping
            );

    }


    // Update total

    cartTotal.textContent =
        formatCartPrice(
            total
        );


    // Update shipping message

    if (
        shippingMessage
    ) {


        if (
            subtotal === 0
        ) {

            shippingMessage.textContent =
                "Free shipping on orders over ₹1,599";

        }

        else if (
            subtotal >=
            FREE_SHIPPING_LIMIT
        ) {

            shippingMessage.textContent =
                "You qualify for FREE shipping!";

        }

        else {


            const remaining =
                FREE_SHIPPING_LIMIT -
                subtotal;


            shippingMessage.textContent =
                `Add ${formatCartPrice(remaining)} more for FREE shipping`;

        }

    }


    // Update item count

    if (
        cartItemsCount
    ) {


        const totalItems =
            cart.reduce(
                (total, item) => {

                    return total +
                        (
                            Number(
                                item.quantity
                            ) || 0
                        );

                },
                0
            );


        cartItemsCount.textContent =

            totalItems === 1

                ? "1 Item"

                : `${totalItems} Items`;

    }

}


// =====================================================
// CHECKOUT BUTTON
// =====================================================

if (checkoutBtn) {

    checkoutBtn.addEventListener(
        "click",
        () => {

            // Get latest cart from storage

            const latestCart =
                JSON.parse(
                    localStorage.getItem(
                        "luneaCart"
                    )
                ) || [];


            if (
                latestCart.length === 0
            ) {

                alert(
                    "Your shopping bag is empty."
                );

                return;

            }


            // Go to checkout

            window.location.href =
                "checkout.html";

        }
    );

}


// =====================================================
// INITIALIZE CART
// =====================================================

updateCartCount();

renderCart();