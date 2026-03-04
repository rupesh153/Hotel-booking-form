document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const checkinInput = document.getElementById("checkin");
  const checkoutInput = document.getElementById("checkout");
  const guestsInput = document.getElementById("guests");

  // Set minimum check-in date to today
  const today = new Date().toISOString().split("T")[0];
  checkinInput.setAttribute("min", today);

  checkinInput.addEventListener("change", function () {
    if (checkinInput.value) {
      checkoutInput.setAttribute("min", checkinInput.value);
      // Clear checkout if invalid
      if (checkoutInput.value && checkoutInput.value <= checkinInput.value) {
        checkoutInput.value = "";
      }
    }
  });

  form.addEventListener("submit", function (e) {
    let isValid = true;

    // Clear previous errors
    document.querySelectorAll(".error").forEach((el) => el.remove());

    // Name validation (only letters and spaces)
    const namePattern = /^[A-Za-z\s]+$/;
    if (!namePattern.test(nameInput.value.trim())) {
      showError(nameInput, "Enter valid name (letters only)");
      isValid = false;
    }

    // Date validation
    const checkinDate = new Date(checkinInput.value);
    const checkoutDate = new Date(checkoutInput.value);

    if (checkoutDate <= checkinDate) {
      showError(checkoutInput, "Check-out must be after check-in date");
      isValid = false;
    }

    // Guests validation
    if (guestsInput.value < 1 || guestsInput.value > 10) {
      showError(guestsInput, "Guests must be between 1 and 10");
      isValid = false;
    }

    if (!isValid) {
      e.preventDefault();
    } else {
      alert("Booking Successful!");
    }
  });

  function showError(input, message) {
    const error = document.createElement("small");
    error.className = "error";
    error.style.color = "red";
    error.textContent = message;
    input.parentElement.appendChild(error);
  }
});
