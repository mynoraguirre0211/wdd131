const hamButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

hamButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
    hamButton.classList.toggle("open");
});

const currentYearSpan = document.getElementById('currentyear');
const lastModified = document.getElementById('lastModified');

const currentYear = new Date().getFullYear();

currentYearSpan.textContent = currentYear;
lastModified.textContent = `Last Modified: ${document.lastModified}`; 