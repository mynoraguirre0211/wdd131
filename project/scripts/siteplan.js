const currentYearSpan = document.getElementById('currentyear');
const lastModified = document.getElementById('lastModified');

const currentYear = new Date().getFullYear();

currentYearSpan.textContent = currentYear;
lastModified.textContent = `Last Modified: ${document.lastModified}`;