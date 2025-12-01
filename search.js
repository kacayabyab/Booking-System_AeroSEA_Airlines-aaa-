let paxCabinConfirmed = false; // Track if user confirmed selection

// When user clicks "Continue" inside the pax popup
document.getElementById("paxContinueBtn").addEventListener("click", function() {
    // Check if at least 1 passenger is selected
    const paxCounts = document.querySelectorAll("#paxCabinPopup .paxCount");
    let totalPax = 0;
    paxCounts.forEach(span => totalPax += parseInt(span.textContent));

    if(totalPax === 0) {
        alert("Please select at least 1 passenger.");
        return;
    }

    // Check cabin selection
    const cabinRadios = document.querySelectorAll('input[name="cabin"]');
    let cabinSelected = false;
    cabinRadios.forEach(radio => {
        if(radio.checked) cabinSelected = true;
    });

    if(!cabinSelected){
        alert("Please select a cabin.");
        return;
    }

    // If all OK, mark confirmed and close popup
    paxCabinConfirmed = true;
    document.getElementById("paxCabinPopup").style.display = "none";
    alert("Passengers and cabin confirmed!");
});

// Search flights button
document.getElementById("searchBtn").addEventListener("click", function() {
    const departure = document.getElementById("departureInput").value.trim();
    const destination = document.getElementById("destinationInput").value.trim();
    const departureDate = document.getElementById("departureDate").value;

    if(!departure){
        alert("Please select a departure location.");
        return;
    }
    if(!destination){
        alert("Please select a destination.");
        return;
    }
    if(!departureDate){
        alert("Please select a departure date.");
        return;
    }
    if(!paxCabinConfirmed){
        alert("Please select passengers and cabin first!");
        return;
    }

    // All fields are valid, proceed
    window.location.href = "Booking-details.html";
});
