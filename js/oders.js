// =====================================================
// LUNEA ORDERS SYSTEM
// Display Previous Orders
// =====================================================


document.addEventListener(
    "DOMContentLoaded",
    () => {


        // =================================================
        // DOM ELEMENTS
        // =================================================

        const ordersList =
            document.getElementById(
                "ordersList"
            );


        const ordersCount =
            document.getElementById(
                "ordersCount"
            );


        // =================================================
        // CHECK ORDERS CONTAINER
        // =================================================

        if (!ordersList) {

            return;

        }


        // =================================================
        // FORMAT PRICE
        // =================================================

        function formatOrderPrice(
            price
        ) {

            return `₹${Number(
                price || 0
            ).toLocaleString(
                "en-IN"
            )}`;

        }


        // =================================================
        // FORMAT DATE
        // =================================================

        function formatOrderDate(
            date
        ) {

            if (!date) {

                return "Date unavailable";

            }


            const orderDate =
                new Date(date);


            // Check if date is valid

            if (
                isNaN(
                    orderDate.getTime()
                )
            ) {

                return "Date unavailable";

            }


            return orderDate.toLocaleDateString(
                "en-IN",
                {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                }
            );

        }


        // =================================================
        // LOAD ORDERS FROM LOCAL STORAGE
        // =================================================

        let orders =
            JSON.parse(
                localStorage.getItem(
                    "luneaOrders"
                )
            ) || [];


        // =================================================
        // SORT ORDERS
        // NEWEST ORDER FIRST
        // =================================================

        orders.sort(
            (
                firstOrder,
                secondOrder
            ) => {

                return new Date(
                    secondOrder.orderDate
                ) -
                new Date(
                    firstOrder.orderDate
                );

            }
        );


        // =================================================
        // UPDATE ORDER COUNT
        // =================================================

        if (ordersCount) {

            ordersCount.textContent =

                orders.length === 1

                    ? "1 Order"

                    : `${orders.length} Orders`;

        }


        // =================================================
        // CHECK IF THERE ARE NO ORDERS
        // =================================================

        if (
            orders.length === 0
        ) {


            ordersList.innerHTML = `

                <div class="orders-empty">


                    <!-- EMPTY ORDER ICON -->

                    <div class="orders-empty-icon">

                        <i class="fa-solid fa-bag-shopping"></i>

                    </div>


                    <!-- EMPTY ORDER TITLE -->

                    <h2>
                        No Orders Yet
                    </h2>


                    <!-- EMPTY ORDER MESSAGE -->

                    <p>

                        You haven't placed any orders yet.
                        Start your LUNEA skincare ritual
                        and your orders will appear here.

                    </p>


                    <!-- SHOPPING BUTTON -->

                    <a
                        href="products.html"
                    >

                        Explore Products

                        <i class="fa-solid fa-arrow-right"></i>

                    </a>


                </div>

            `;


            return;

        }


        // =================================================
        // CLEAR ORDERS LIST
        // =================================================

        ordersList.innerHTML = "";


        // =================================================
        // DISPLAY EACH ORDER
        // =================================================

        orders.forEach(
            order => {


                // =================================================
                // CREATE ORDER CARD
                // =================================================

                const orderCard =
                    document.createElement(
                        "article"
                    );


                orderCard.className =
                    "order-card";


                // =================================================
                // ORDER PRODUCTS HTML
                // =================================================

                let productsHTML =
                    "";


                // =================================================
                // CHECK IF ORDER HAS PRODUCTS
                // =================================================

                if (
                    order.products &&
                    order.products.length > 0
                ) {


                    // =================================================
                    // DISPLAY EACH PRODUCT
                    // =================================================

                    order.products.forEach(
                        product => {


                            // Get quantity

                            const quantity =
                                Number(
                                    product.quantity
                                ) || 1;


                            // Get numeric price

                            const price =
                                parseFloat(
                                    String(
                                        product.price || 0
                                    ).replace(
                                        /[₹,]/g,
                                        ""
                                    )
                                ) || 0;


                            // Calculate product total

                            const productTotal =
                                price *
                                quantity;


                            // =================================================
                            // PRODUCT HTML
                            // =================================================

                            productsHTML += `

                                <div class="order-product">


                                    <!-- PRODUCT IMAGE -->

                                    <div class="order-product-image">

                                        <img
                                            src="${product.image || ""}"
                                            alt="${product.name || "LUNEA Product"}"
                                        >

                                    </div>



                                    <!-- PRODUCT INFORMATION -->

                                    <div class="order-product-info">

                                        <p class="order-product-collection">

                                            ${product.collection || "LUNEA Skincare"}

                                        </p>


                                        <h4>

                                            ${product.name || "LUNEA Product"}

                                        </h4>


                                        <p class="order-product-quantity">

                                            Quantity: ${quantity}

                                        </p>

                                    </div>



                                    <!-- PRODUCT PRICE -->

                                    <div class="order-product-price">

                                        ${formatOrderPrice(
                                            productTotal
                                        )}

                                    </div>


                                </div>

                            `;

                        }
                    );

                } else {


                    // =================================================
                    // NO PRODUCT INFORMATION
                    // =================================================

                    productsHTML = `

                        <div class="order-no-products">

                            <p>
                                Product information is unavailable.
                            </p>

                        </div>

                    `;

                }


                // =================================================
                // GET CUSTOMER INFORMATION
                // =================================================

                const customer =
                    order.customer || {};


                // =================================================
                // PAYMENT METHOD
                // =================================================

                const paymentMethod =

                    customer.paymentMethod === "cod"

                        ? "Cash on Delivery"

                        : "Credit / Debit Card";


                // =================================================
                // CREATE ORDER CARD HTML
                // =================================================

                orderCard.innerHTML = `


                    <!-- =================================
                         ORDER HEADER
                    ================================== -->

                    <div class="order-card-header">


                        <!-- ORDER INFORMATION -->

                        <div class="order-info">

                            <h3>

                                Order #${order.orderId || "N/A"}

                            </h3>


                            <p class="order-date">

                                ${formatOrderDate(
                                    order.orderDate
                                )}

                            </p>

                        </div>



                        <!-- ORDER STATUS -->

                        <div class="order-status">

                            <i class="fa-solid fa-check"></i>

                            Order Confirmed

                        </div>


                    </div>



                    <!-- =================================
                         ORDER PRODUCTS
                    ================================== -->

                    <div class="order-products">

                        ${productsHTML}

                    </div>



                    <!-- =================================
                         ORDER FOOTER
                    ================================== -->

                    <div class="order-card-footer">


                        <div class="order-summary">


                            <!-- SUBTOTAL -->

                            <div class="order-summary-row">

                                <span>
                                    Subtotal
                                </span>

                                <strong>

                                    ${formatOrderPrice(
                                        order.subtotal
                                    )}

                                </strong>

                            </div>



                            <!-- SHIPPING -->

                            <div class="order-summary-row">

                                <span>
                                    Shipping
                                </span>

                                <strong>

                                    ${
                                        Number(
                                            order.shipping
                                        ) === 0

                                            ? "FREE"

                                            : formatOrderPrice(
                                                order.shipping
                                            )
                                    }

                                </strong>

                            </div>



                            <!-- DIVIDER -->

                            <div class="order-summary-divider"></div>



                            <!-- TOTAL -->

                            <div class="order-summary-row order-total-row">

                                <span>
                                    Total
                                </span>

                                <strong>

                                    ${formatOrderPrice(
                                        order.total
                                    )}

                                </strong>

                            </div>


                        </div>


                    </div>



                    <!-- =================================
                         CUSTOMER INFORMATION
                    ================================== -->

                    <div class="order-customer">


                        <h4>
                            Delivery Information
                        </h4>



                        <!-- CUSTOMER NAME -->

                        <p>

                            <strong>

                                ${customer.firstName || ""}

                                ${customer.lastName || ""}

                            </strong>

                        </p>



                        <!-- CUSTOMER ADDRESS -->

                        <p>

                            ${customer.address || ""},

                            ${customer.city || ""},

                            ${customer.state || ""}

                            -

                            ${customer.postalCode || ""}

                        </p>



                        <!-- CUSTOMER EMAIL -->

                        <p>

                            Email:

                            ${customer.email || "Not available"}

                        </p>



                        <!-- CUSTOMER PHONE -->

                        <p>

                            Phone:

                            ${customer.phone || "Not available"}

                        </p>



                        <!-- PAYMENT METHOD -->

                        <p>

                            Payment:

                            ${paymentMethod}

                        </p>


                    </div>


                `;


                // =================================================
                // ADD ORDER CARD TO PAGE
                // =================================================

                ordersList.appendChild(
                    orderCard
                );

            }
        );

    }
);