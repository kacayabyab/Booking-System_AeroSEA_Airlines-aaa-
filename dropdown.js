const airports = [
    { code: "BWN", city: "Bandar Seri Begawan", country: "Brunei", name: "Brunei International Airport" },
    { code: "PNH", city: "Phnom Penh", country: "Cambodia", name: "Techo International Airport" },
    { code: "CGK", city: "Jakarta", country: "Indonesia", name: "Soekarno-Hatta International Airport" },
    { code: "VTE", city: "Vientiane", country: "Laos", name: "Wattay International Airport" },
    { code: "KUL", city: "Kuala Lumpur", country: "Malaysia", name: "Kuala Lumpur International Airport" },
    { code: "NYT", city: "Nay Pyi Taw", country: "Myanmar", name: "Nay Pyi Taw International Airport" },
    { code: "MNL", city: "Manila", country: "Philippines", name: "Ninoy Aquino International Airport" },
    { code: "SIN", city: "Singapore", country: "Singapore", name: "Singapore Changi Airport" },
    { code: "BKK", city: "Bangkok", country: "Thailand", name: "Suvarnabhumi Airport / Don Mueang International Airport" },
    { code: "DIL", city: "Dili", country: "Timor-Leste", name: "Presidente Nicolau Lobato International Airport" },
    { code: "HAN", city: "Hanoi", country: "Vietnam", name: "Noi Bai International Airport" }
];

function populateDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    dropdown.innerHTML = "";
    airports.forEach(a => {
        const div = document.createElement("div");
        div.innerHTML = `<b>${a.city} (${a.code}) - ${a.country}</b><br>${a.name}`;
        dropdown.appendChild(div);
    });
}

populateDropdown("departureDropdown");
populateDropdown("destinationDropdown");

function setupDropdown(inputId, dropdownId, clearBtnId) {
    const input = document.getElementById(inputId);
    const dropdown = document.getElementById(dropdownId);
    const clearBtn = document.getElementById(clearBtnId);
    const container = input.parentElement;

    input.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdown.style.display = "block";
    });

    input.addEventListener("input", () => {
        dropdown.style.display = "block";
        const filter = input.value.toUpperCase();
        dropdown.querySelectorAll("div").forEach(opt => {
            opt.style.display = opt.textContent.toUpperCase().includes(filter) ? "" : "none";
        });
    });

    dropdown.addEventListener("click", (e) => e.stopPropagation());

    dropdown.querySelectorAll("div").forEach(opt => {
        opt.addEventListener("click", function() {
            const cityLine = this.querySelector("b").innerText;
            const airportName = this.childNodes[1].textContent.trim();
            input.value = `${cityLine} • ${airportName}`;
            dropdown.style.display = "none";
        });
    });

    clearBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        input.value = "";
        dropdown.querySelectorAll("div").forEach(opt => opt.style.display = "");
        input.focus();
    });

    document.addEventListener("click", () => {
        dropdown.style.display = "none";
    });
}

setupDropdown("departureInput", "departureDropdown", "departureclearBtn");
setupDropdown("destinationInput", "destinationDropdown", "destinationclearBtn");
