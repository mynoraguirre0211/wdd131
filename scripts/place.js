const currentYearSpan = document.getElementById('currentyear');
const lastModified = document.getElementById('lastModified');

const currentYear = new Date().getFullYear();

currentYearSpan.textContent = currentYear;
lastModified.textContent = `Last Modified: ${document.lastModified}`;

const temperature = 10;
const windSpeed = 5;

document.getElementById("temp").textContent = temperature;
document.getElementById("wind").textContent = windSpeed;

function calculateWindChill(temp, wind) {
    return (
        13.12 +
        0.6215 * temp -
        11.37 * Math.pow(wind, 0.16) +
        0.3965 * temp * Math.pow(wind, 0.16)
    ).toFixed(1);
}

let windChill = "N/A";
if (temperature <= 10 && windSpeed > 4.8) {
    windChill = `${calculateWindChill(temperature, windSpeed)} °C`;
}

document.getElementById("windchill").textContent = windChill;