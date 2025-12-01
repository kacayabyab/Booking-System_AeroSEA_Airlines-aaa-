const paxCabinBar = document.getElementById("paxCabinBar");
const paxPopup = document.getElementById("paxCabinPopup");
const continueBtn = document.getElementById("paxContinueBtn");
const paxCloseBtn = document.getElementById("paxCloseBtn");
const rows = document.querySelectorAll(".paxRow");
const maxPax = 4;
let tempCounts = {};

paxCabinBar.addEventListener("click", (e) => {
    e.stopPropagation();
    rows.forEach(row => {
        const type = row.dataset.type;
        tempCounts[type] = parseInt(row.querySelector(".paxCount").textContent) || 0;
    });
    paxPopup.style.display = "block";
    paxPopup.setAttribute("aria-hidden", "false");
});

paxPopup.addEventListener("click", (e) => e.stopPropagation());

rows.forEach(row => {
    const minus = row.querySelector(".minusBtn");
    const plus = row.querySelector(".plusBtn");
    const countEl = row.querySelector(".paxCount");

    minus.addEventListener("click", () => {
        let count = parseInt(countEl.textContent) || 0;
        if (count > 0) count--;
        countEl.textContent = count;
    });

    plus.addEventListener("click", () => {
        let total = getTotalPassengers();
        if (total >= maxPax) return;
        let count = parseInt(countEl.textContent) || 0;
        count++;
        countEl.textContent = count;
    });
});

function getTotalPassengers() {
    let sum = 0;
    rows.forEach(row => {
        sum += parseInt(row.querySelector(".paxCount").textContent) || 0;
    });
    return sum;
}

continueBtn.addEventListener("click", () => {
    let total = getTotalPassengers();
    let cabin = document.querySelector("input[name='cabin']:checked").value;
    if (total === 0) {
        alert("Please choose at least 1 passenger.");
        return;
    }
    paxCabinBar.textContent = total + " Passenger(s) • " + cabin;
    paxPopup.style.display = "none";
    paxPopup.setAttribute("aria-hidden", "true");
});

paxCloseBtn.addEventListener("click", () => {
    rows.forEach(row => {
        const type = row.dataset.type;
        row.querySelector(".paxCount").textContent = tempCounts[type] || 0;
    });
    paxPopup.style.display = "none";
    paxPopup.setAttribute("aria-hidden", "true");
});

document.addEventListener("click", (e) => {
    if (paxPopup.style.display === "block" && e.target !== paxCabinBar && !paxPopup.contains(e.target)) {
        rows.forEach(row => {
            const type = row.dataset.type;
            row.querySelector(".paxCount").textContent = tempCounts[type] || 0;
        });
        paxPopup.style.display = "none";
        paxPopup.setAttribute("aria-hidden", "true");
    }
});
