// =====================================================
// LUNEA CHECKOUT SYSTEM
// Order Summary + Shipping + Place Order
// =====================================================


// =====================================================
// INITIALIZE CHECKOUT
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {


        // =================================================
        // LOAD CART FROM LOCAL STORAGE
        // =================================================

        let checkoutCart =
            JSON.parse(
                localStorage.getItem(
                    "luneaCart"
                )
            ) || [];


        // =================================================
        // DOM ELEMENTS
        // =================================================

        const checkoutItems =
            document.getElementById(
                "checkoutItems"
            );


        const checkoutSubtotal =
            document.getElementById(
                "checkoutSubtotal"
            );


        const checkoutShipping =
            document.getElementById(
                "checkoutShipping"
            );


        const checkoutTotal =
            document.getElementById(
                "checkoutTotal"
            );


        const checkoutForm =
            document.getElementById(
                "checkoutForm"
            );


        const orderSuccessModal =
            document.getElementById(
                "orderSuccessModal"
            );


        // =================================================
        // SHIPPING SETTINGS
        // =================================================

        const FREE_SHIPPING_LIMIT =
            1599;


        const SHIPPING_COST =
            99;


        // =================================================
        // FORMAT PRICE
        // =================================================

        function formatCheckoutPrice(price) {

            return `₹${Number(
                price || 0
            ).toLocaleString("en-IN")}`;

        }


        // =================================================
        // GET NUMERIC PRICE
        // =================================================

        function getCheckoutNumericPrice(price) {

            if (
                typeof price ===
                "number"
            ) {

                return price;

            }


            return Number(
                String(price || "")
                    .replace(/[₹,]/g, "")
                    .trim()
            ) || 0;

        }


        // =================================================
        // CALCULATE CHECKOUT SUBTOTAL
        // =================================================

        function calculateCheckoutSubtotal() {

            return checkoutCart.reduce(
                (total, item) => {


                    const price =
                        getCheckoutNumericPrice(
                            item.price
                        );


                    const quantity =
                        Number(
                            item.quantity
                        ) || 1;


                    return total +
                        (
                            price *
                            quantity
                        );

                },
                0
            );

        }


        // =================================================
        // CALCULATE SHIPPING
        // =================================================

        function calculateCheckoutShipping(
            subtotal
        ) {


            // Empty cart

            if (
                subtotal <= 0
            ) {

                return 0;

            }


            // Free shipping

            if (
                subtotal >=
                FREE_SHIPPING_LIMIT
            ) {

                return 0;

            }


            // Standard shipping

            return SHIPPING_COST;

        }


        // =================================================
        // UPDATE CHECKOUT TOTALS
        // =================================================

        function updateCheckoutTotals() {


            const subtotal =
                calculateCheckoutSubtotal();


            const shipping =
                calculateCheckoutShipping(
                    subtotal
                );


            const total =
                subtotal +
                shipping;


            // Update subtotal

            if (
                checkoutSubtotal
            ) {

                checkoutSubtotal.textContent =
                    formatCheckoutPrice(
                        subtotal
                    );

            }


            // Update shipping

            if (
                checkoutShipping
            ) {


                if (
                    shipping === 0 &&
                    subtotal > 0
                ) {

                    checkoutShipping.textContent =
                        "FREE";

                } else {

                    checkoutShipping.textContent =
                        formatCheckoutPrice(
                            shipping
                        );

                }

            }


            // Update total

            if (
                checkoutTotal
            ) {

                checkoutTotal.textContent =
                    formatCheckoutPrice(
                        total
                    );

            }

        }


        // =================================================
        // DISPLAY CHECKOUT ITEMS
        // =================================================

        function displayCheckoutItems() {


            // Make sure container exists

            if (
                !checkoutItems
            ) {

                return;

            }


            // Clear old items

            checkoutItems.innerHTML =
                "";


            // Check if cart is empty

            if (
                checkoutCart.length === 0
            ) {


                checkoutItems.innerHTML = `

                    <div class="checkout-empty">

                        <i class="fa-solid fa-bag-shopping"></i>

                        <p>
                            Your cart is empty.
                        </p>

                        <a href="products.html">
                            Continue Shopping
                        </a>

                    </div>

                `;


                updateCheckoutTotals();

                return;

            }


            // =================================================
            // DISPLAY EACH PRODUCT
            // =================================================

            checkoutCart.forEach(
                item => {


                    const price =
                        getCheckoutNumericPrice(
                            item.price
                        );


                    const quantity =
                        Number(
                            item.quantity
                        ) || 1;


                    const itemTotal =
                        price *
                        quantity;


                    // Create item container

                    const checkoutItem =
                        document.createElement(
                            "div"
                        );


                    checkoutItem.className =
                        "checkout-item";


                    // Product HTML

                    checkoutItem.innerHTML = `

                        <div class="checkout-item-image">

                            <img
                                src="${item.image || ""}"
                                alt="${item.name || "LUNEA Product"}"
                            >

                            <span class="checkout-item-quantity">
                                ${quantity}
                            </span>

                        </div>


                        <div class="checkout-item-info">

                            <h4>
                                ${item.name || "LUNEA Product"}
                            </h4>

                            <p>
                                ${item.collection || ""}
                            </p>

                            <p>
                                Qty: ${quantity}
                            </p>

                        </div>


                        <div class="checkout-item-price">

                            ${formatCheckoutPrice(
                                itemTotal
                            )}

                        </div>

                    `;


                    // Add item to summary

                    checkoutItems.appendChild(
                        checkoutItem
                    );

                }
            );


            // Update totals

            updateCheckoutTotals();

        }


        // =================================================
        // CHECKOUT FORM SUBMISSION
        // =================================================

        if (
            checkoutForm
        ) {


            checkoutForm.addEventListener(
                "submit",
                function(event) {


                    // Prevent page refresh

                    event.preventDefault();


                    // =================================================
                    // GET LATEST CART
                    // =================================================

                    checkoutCart =
                        JSON.parse(
                            localStorage.getItem(
                                "luneaCart"
                            )
                        ) || [];


                    // =================================================
                    // CHECK EMPTY CART
                    // =================================================

                    if (
                        checkoutCart.length === 0
                    ) {

                        alert(
                            "Your shopping bag is empty. Please add a product before placing your order."
                        );

                        return;

                    }


                    // =================================================
                    // CHECK FORM VALIDITY
                    // =================================================

                    if (
                        !checkoutForm.checkValidity()
                    ) {

                        checkoutForm.reportValidity();

                        return;

                    }


                    // =================================================
                    // GET FORM DATA
                    // =================================================

                    const formData =
                        new FormData(
                            checkoutForm
                        );


                    // =================================================
                    // CUSTOMER INFORMATION
                    // =================================================

                    const customer = {

                        email:
                            formData.get(
                                "email"
                            ),

                        phone:
                            formData.get(
                                "phone"
                            ),

                        firstName:
                            formData.get(
                                "firstName"
                            ),

                        lastName:
                            formData.get(
                                "lastName"
                            ),

                        address:
                            formData.get(
                                "address"
                            ),

                        city:
                            formData.get(
                                "city"
                            ),

                        state:
                            formData.get(
                                "state"
                            ),

                        postalCode:
                            formData.get(
                                "postalCode"
                            ),

                        paymentMethod:
                            formData.get(
                                "paymentMethod"
                            )

                    };


                    // =================================================
                    // CALCULATE ORDER TOTALS
                    // =================================================

                    const subtotal =
                        calculateCheckoutSubtotal();


                    const shipping =
                        calculateCheckoutShipping(
                            subtotal
                        );


                    const total =
                        subtotal +
                        shipping;


                    // =================================================
                    // CREATE ORDER
                    // =================================================

                    const order = {

                        orderId:
                            "LUNEA-" +
                            Date.now(),


                        customer:
                            customer,


                        products:
                            checkoutCart.map(
                                item => ({

                                    name:
                                        item.name,

                                    collection:
                                        item.collection,

                                    ingredient:
                                        item.ingredient,

                                    price:
                                        item.price,

                                    image:
                                        item.image,

                                    quantity:
                                        Number(
                                            item.quantity
                                        ) || 1

                                })
                            ),


                        subtotal:
                            subtotal,


                        shipping:
                            shipping,


                        total:
                            total,


                        orderDate:
                            new Date()
                                .toISOString()

                    };


                     // =====================================================
                    // SAVE ORDER TO ORDER HISTORY
                    // =====================================================

                    // Get existing orders from localStorage

                    let orders =
                        JSON.parse(
                            localStorage.getItem("luneaOrders")
                        ) || [];


                    // Add the new order

                    orders.unshift (order);


                    // Save all orders

                    localStorage.setItem(
                        "luneaOrders",
                        JSON.stringify(orders)
                    );


                    // Also save the latest order

                    localStorage.setItem(
                        "luneaLastOrder",
                        JSON.stringify(order)
                    );


                    // =================================================
                    // CLEAR CART
                    // =================================================

                    localStorage.removeItem(
                        "luneaCart"
                    );


                    // Update local cart

                    checkoutCart =
                        [];


                    // =================================================
                    // UPDATE CART COUNT
                    // =================================================

                    if (
                        typeof updateCartCount ===
                        "function"
                    ) {

                        updateCartCount();

                    }


                    // =================================================
                    // UPDATE CHECKOUT SUMMARY
                    // =================================================

                    displayCheckoutItems();


                    // =================================================
                    // SHOW SUCCESS MODAL
                    // =================================================

                    if (
                        orderSuccessModal
                    ) {

                        orderSuccessModal.classList.add(
                            "show"
                        );

                    }

                }
            );

        }


        // =================================================
        // DISPLAY CHECKOUT ON PAGE LOAD
        // =================================================

        displayCheckoutItems();

    }
);