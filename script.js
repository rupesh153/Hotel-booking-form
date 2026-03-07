document.addEventListener("DOMContentLoaded", function () {

  const form = document.querySelector("form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const checkinInput = document.getElementById("checkin");
  const checkoutInput = document.getElementById("checkout");
  const guestsInput = document.getElementById("guests");
  const roomType = document.getElementById("room-type");

  const nightsText = document.getElementById("nights");
  const totalText = document.getElementById("total");

  // Room prices
  const roomPrices = {
    standard: 2000,
    deluxe: 3000,
    suite: 5000
  };

  // Set minimum check-in date
  const today = new Date().toISOString().split("T")[0];
  checkinInput.setAttribute("min", today);

  // Update checkout min date
  checkinInput.addEventListener("change", function () {
    if (checkinInput.value) {
      checkoutInput.setAttribute("min", checkinInput.value);

      if (checkoutInput.value && checkoutInput.value <= checkinInput.value) {
        checkoutInput.value = "";
      }
    }

    updateSummary();
  });

  checkoutInput.addEventListener("change", updateSummary);
  roomType.addEventListener("change", updateSummary);

  // Function to calculate nights and total
  function updateSummary() {

    const checkinDate = new Date(checkinInput.value);
    const checkoutDate = new Date(checkoutInput.value);

    if (checkinInput.value && checkoutInput.value) {

      const timeDiff = checkoutDate - checkinDate;
      const nights = timeDiff / (1000 * 60 * 60 * 24);

      if (nights > 0) {

        const pricePerNight = roomPrices[roomType.value];
        const total = nights * pricePerNight;

        nightsText.textContent = "Nights: " + nights;
        totalText.textContent = "Total: ₹" + total;

      }
    }
  }

  form.addEventListener("submit", function (e) {

    let isValid = true;

    document.querySelectorAll(".error").forEach(el => el.remove());

    const namePattern = /^[A-Za-z\s]+$/;

    if (!namePattern.test(nameInput.value.trim())) {
      showError(nameInput, "Enter valid name (letters only)");
      isValid = false;
    }

    const checkinDate = new Date(checkinInput.value);
    const checkoutDate = new Date(checkoutInput.value);

    if (checkoutDate <= checkinDate) {
      showError(checkoutInput, "Check-out must be after check-in date");
      isValid = false;
    }

    if (guestsInput.value < 1 || guestsInput.value > 5) {
      showError(guestsInput, "Guests must be between 1 and 10");
      isValid = false;
    }

    if (!isValid) {
      e.preventDefault();
    } else {
  e.preventDefault();
document.getElementById("successPopup").style.display = "flex";
form.reset();

    
    
    
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
function closePopup(){
  document.getElementById("successPopup").style.display = "none";
   document.getElementById("nights").textContent = "Nights: 0";
  document.getElementById("total").textContent = "Total: ₹0";
}