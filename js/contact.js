/* =====================================================
   LUNEA CONTACT PAGE JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       CONTACT FORM
    ===================================================== */

    const contactForm = document.getElementById("contactForm");

    if (contactForm) {

        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const subjectInput = document.getElementById("subject");
        const messageInput = document.getElementById("message");

        const formSuccess = document.getElementById("formSuccess");
        const formError = document.getElementById("formError");


        /* -------------------------------------------------
           EMAIL VALIDATION
        ------------------------------------------------- */

        function isValidEmail(email) {
            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            return emailPattern.test(email);
        }


        /* -------------------------------------------------
           SHOW ERROR
        ------------------------------------------------- */

        function showError(input, message) {

            const formGroup = input.closest(".form-group");

            if (!formGroup) return;

            let errorMessage =
                formGroup.querySelector(".field-error");

            if (!errorMessage) {

                errorMessage =
                    document.createElement("small");

                errorMessage.className =
                    "field-error";

                formGroup.appendChild(errorMessage);
            }

            errorMessage.textContent = message;

            input.classList.add("input-error");
        }


        /* -------------------------------------------------
           CLEAR ERROR
        ------------------------------------------------- */

        function clearError(input) {

            const formGroup = input.closest(".form-group");

            if (!formGroup) return;

            const errorMessage =
                formGroup.querySelector(".field-error");

            if (errorMessage) {
                errorMessage.remove();
            }

            input.classList.remove("input-error");
        }


        /* -------------------------------------------------
           CLEAR ALL ERRORS
        ------------------------------------------------- */

        function clearAllErrors() {

            const errorMessages =
                contactForm.querySelectorAll(".field-error");

            errorMessages.forEach(error => {
                error.remove();
            });

            const errorInputs =
                contactForm.querySelectorAll(".input-error");

            errorInputs.forEach(input => {
                input.classList.remove("input-error");
            });
        }


        /* -------------------------------------------------
           REAL-TIME VALIDATION
        ------------------------------------------------- */

        if (nameInput) {

            nameInput.addEventListener("input", () => {

                if (nameInput.value.trim().length >= 2) {
                    clearError(nameInput);
                }

            });

        }


        if (emailInput) {

            emailInput.addEventListener("input", () => {

                if (isValidEmail(emailInput.value.trim())) {
                    clearError(emailInput);
                }

            });

        }


        if (subjectInput) {

            subjectInput.addEventListener("input", () => {

                if (subjectInput.value.trim().length >= 3) {
                    clearError(subjectInput);
                }

            });

        }


        if (messageInput) {

            messageInput.addEventListener("input", () => {

                if (messageInput.value.trim().length >= 10) {
                    clearError(messageInput);
                }

            });

        }


        /* -------------------------------------------------
           FORM SUBMISSION
        ------------------------------------------------- */

        contactForm.addEventListener("submit", (event) => {

            event.preventDefault();

            clearAllErrors();

            /* Hide previous messages */

            if (formSuccess) {
                formSuccess.style.display = "none";
            }

            if (formError) {
                formError.style.display = "none";
            }


            let isValid = true;


            /* -------------------------------------------------
               NAME VALIDATION
            ------------------------------------------------- */

            if (
                !nameInput ||
                nameInput.value.trim().length < 2
            ) {

                if (nameInput) {
                    showError(
                        nameInput,
                        "Please enter your name."
                    );
                }

                isValid = false;
            }


            /* -------------------------------------------------
               EMAIL VALIDATION
            ------------------------------------------------- */

            if (
                !emailInput ||
                !isValidEmail(emailInput.value.trim())
            ) {

                if (emailInput) {
                    showError(
                        emailInput,
                        "Please enter a valid email address."
                    );
                }

                isValid = false;
            }


            /* -------------------------------------------------
               SUBJECT VALIDATION
            ------------------------------------------------- */

            if (
                !subjectInput ||
                subjectInput.value.trim().length < 3
            ) {

                if (subjectInput) {
                    showError(
                        subjectInput,
                        "Please enter a subject."
                    );
                }

                isValid = false;
            }


            /* -------------------------------------------------
               MESSAGE VALIDATION
            ------------------------------------------------- */

            if (
                !messageInput ||
                messageInput.value.trim().length < 10
            ) {

                if (messageInput) {
                    showError(
                        messageInput,
                        "Please enter a message with at least 10 characters."
                    );
                }

                isValid = false;
            }


            /* -------------------------------------------------
               STOP IF FORM IS INVALID
            ------------------------------------------------- */

            if (!isValid) {

                if (formError) {

                    formError.textContent =
                        "Please check the highlighted fields and try again.";

                    formError.style.display = "block";

                }

                return;
            }


            /* -------------------------------------------------
               SUCCESS MESSAGE
            ------------------------------------------------- */

            if (formSuccess) {

                formSuccess.textContent =
                    "Thank you for reaching out to LUNEA. Your message has been received. We’ll be in touch soon.";

                formSuccess.style.display = "block";

            }


            /* -------------------------------------------------
               RESET FORM
            ------------------------------------------------- */

            contactForm.reset();


            /* -------------------------------------------------
               SCROLL TO SUCCESS MESSAGE
            ------------------------------------------------- */

            if (formSuccess) {

                formSuccess.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }

        });

    }


    /* =====================================================
       MESSAGE CHARACTER COUNTER
    ===================================================== */

    const messageInput =
        document.getElementById("message");

    const characterCount =
        document.getElementById("characterCount");

    if (messageInput && characterCount) {

        const maxLength =
            messageInput.getAttribute("maxlength");

        messageInput.addEventListener("input", () => {

            const currentLength =
                messageInput.value.length;

            characterCount.textContent =
                `${currentLength}/${maxLength || 500}`;

        });

    }


    /* =====================================================
       FAQ ACCORDION
    ===================================================== */

    const faqItems =
        document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {

        const question =
            item.querySelector(".faq-question");

        const answer =
            item.querySelector(".faq-answer");

        const icon =
            item.querySelector(".faq-icon");


        if (!question || !answer) return;


        question.addEventListener("click", () => {

            const isOpen =
                item.classList.contains("active");


            /* Close all FAQ items */

            faqItems.forEach(otherItem => {

                otherItem.classList.remove("active");

                const otherAnswer =
                    otherItem.querySelector(".faq-answer");

                const otherIcon =
                    otherItem.querySelector(".faq-icon");


                if (otherAnswer) {
                    otherAnswer.style.maxHeight = null;
                }

                if (otherIcon) {
                    otherIcon.textContent = "+";
                }

            });


            /* Open selected FAQ */

            if (!isOpen) {

                item.classList.add("active");

                answer.style.maxHeight =
                    answer.scrollHeight + "px";


                if (icon) {
                    icon.textContent = "−";
                }

            }

        });

    });


    /* =====================================================
       CONTACT INFORMATION COPY BUTTON
    ===================================================== */

    const copyButtons =
        document.querySelectorAll("[data-copy]");

    copyButtons.forEach(button => {

        button.addEventListener("click", async () => {

            const textToCopy =
                button.getAttribute("data-copy");

            if (!textToCopy) return;


            try {

                await navigator.clipboard.writeText(
                    textToCopy
                );


                const originalText =
                    button.textContent;


                button.textContent =
                    "Copied";


                setTimeout(() => {

                    button.textContent =
                        originalText;

                }, 2000);


            } catch (error) {

                console.error(
                    "Unable to copy text:",
                    error
                );

            }

        });

    });


});