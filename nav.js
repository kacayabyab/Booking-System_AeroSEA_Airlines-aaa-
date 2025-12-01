const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        if (this.getAttribute('href') !== "#Home") {
            event.preventDefault();
            alert("Kindly fill out all the required fields before proceeding.");
        }
    });
});
