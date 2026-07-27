/* =========================================================
   LUNEA ACCOUNT / USER PROFILE
========================================================= */


document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =====================================================
           PROFILE STORAGE KEY
        ===================================================== */

        const PROFILE_STORAGE_KEY =
            "luneaUserProfile";


        /* =====================================================
           FORM ELEMENTS
        ===================================================== */

        const profileForm =
            document.getElementById("profileForm");

        const fullNameInput =
            document.getElementById("fullName");

        const emailInput =
            document.getElementById("email");

        const phoneInput =
            document.getElementById("phone");

        const addressInput =
            document.getElementById("address");

        const cityInput =
            document.getElementById("city");

        const stateInput =
            document.getElementById("state");

        const postalCodeInput =
            document.getElementById("postalCode");

        const countryInput =
            document.getElementById("country");


        /* =====================================================
           BUTTONS
        ===================================================== */

        const clearProfileButton =
            document.getElementById("clearProfile");


        /* =====================================================
           PROFILE DISPLAY ELEMENTS
        ===================================================== */

        const profileNameDisplay =
            document.getElementById(
                "profileNameDisplay"
            );

        const profileEmailDisplay =
            document.getElementById(
                "profileEmailDisplay"
            );


        /* =====================================================
           SUCCESS MESSAGE
        ===================================================== */

        const profileSuccess =
            document.getElementById(
                "profileSuccess"
            );


        /* =====================================================
           LOAD SAVED PROFILE
        ===================================================== */

        function loadProfile() {

            const savedProfile =
                localStorage.getItem(
                    PROFILE_STORAGE_KEY
                );


            /* No saved profile */

            if (!savedProfile) {

                updateProfileDisplay();

                return;

            }


            try {

                const profile =
                    JSON.parse(savedProfile);


                /* Fill form */

                fullNameInput.value =
                    profile.fullName || "";

                emailInput.value =
                    profile.email || "";

                phoneInput.value =
                    profile.phone || "";

                addressInput.value =
                    profile.address || "";

                cityInput.value =
                    profile.city || "";

                stateInput.value =
                    profile.state || "";

                postalCodeInput.value =
                    profile.postalCode || "";

                countryInput.value =
                    profile.country || "India";


                /* Update sidebar */

                updateProfileDisplay();


            } catch (error) {

                console.error(
                    "Unable to load profile:",
                    error
                );

            }

        }


        /* =====================================================
           UPDATE PROFILE SIDEBAR
        ===================================================== */

        function updateProfileDisplay() {

            const name =
                fullNameInput.value.trim();

            const email =
                emailInput.value.trim();


            if (name) {

                profileNameDisplay.textContent =
                    name;

            } else {

                profileNameDisplay.textContent =
                    "Your Profile";

            }


            if (email) {

                profileEmailDisplay.textContent =
                    email;

            } else {

                profileEmailDisplay.textContent =
                    "Add your details below";

            }

        }


        /* =====================================================
           SAVE PROFILE
        ===================================================== */

        profileForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                /* Create profile object */

                const profile = {

                    fullName:
                        fullNameInput.value.trim(),

                    email:
                        emailInput.value.trim(),

                    phone:
                        phoneInput.value.trim(),

                    address:
                        addressInput.value.trim(),

                    city:
                        cityInput.value.trim(),

                    state:
                        stateInput.value.trim(),

                    postalCode:
                        postalCodeInput.value.trim(),

                    country:
                        countryInput.value.trim()

                };


                /* Save to localStorage */

                localStorage.setItem(

                    PROFILE_STORAGE_KEY,

                    JSON.stringify(profile)

                );


                /* Update sidebar */

                updateProfileDisplay();


                /* Show success message */

                showSuccessMessage();

            }
        );


        /* =====================================================
           SHOW SUCCESS MESSAGE
        ===================================================== */

        function showSuccessMessage() {

            profileSuccess.classList.add(
                "show"
            );


            /* Remove previous timer */

            clearTimeout(
                window.profileSuccessTimer
            );


            /* Hide after 3 seconds */

            window.profileSuccessTimer =
                setTimeout(
                    function () {

                        profileSuccess.classList.remove(
                            "show"
                        );

                    },
                    3000
                );

        }


        /* =====================================================
           CLEAR PROFILE
        ===================================================== */

        clearProfileButton.addEventListener(
            "click",
            function () {


                /* Check if profile exists */

                const savedProfile =
                    localStorage.getItem(
                        PROFILE_STORAGE_KEY
                    );


                if (!savedProfile) {

                    return;

                }


                /* Ask for confirmation */

                const confirmClear =
                    confirm(
                        "Are you sure you want to clear your saved profile details?"
                    );


                if (!confirmClear) {

                    return;

                }


                /* Remove from localStorage */

                localStorage.removeItem(
                    PROFILE_STORAGE_KEY
                );


                /* Clear form */

                profileForm.reset();


                /* Restore default country */

                countryInput.value =
                    "India";


                /* Update sidebar */

                updateProfileDisplay();


                /* Hide success */

                profileSuccess.classList.remove(
                    "show"
                );

            }
        );


        /* =====================================================
           UPDATE PROFILE WHEN USER EDITS NAME OR EMAIL
        ===================================================== */

        fullNameInput.addEventListener(
            "input",
            updateProfileDisplay
        );

        emailInput.addEventListener(
            "input",
            updateProfileDisplay
        );


        /* =====================================================
           INITIALIZE
        ===================================================== */

        loadProfile();

    }
);