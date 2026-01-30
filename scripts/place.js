// Static weather values (matching the HTML display)
const temperature = 8; // °C
const windSpeed = 10; // km/h

/**
 * Calculate wind chill factor using the metric formula
 * Formula: 13.12 + 0.6215×T - 11.37×V^0.16 + 0.3965×T×V^0.16
 * where T = temperature (°C) and V = wind speed (km/h)
 * @param {number} temp - Temperature in Celsius
 * @param {number} wind - Wind speed in km/h
 * @returns {number} - Wind chill factor rounded to 1 decimal place
 */
function calculateWindChill(temp, wind) {
    return 13.12 + 0.6215 * temp - 11.37 * Math.pow(wind, 0.16) + 0.3965 * temp * Math.pow(wind, 0.16);
}

/**
 * Check if conditions are viable for wind chill calculation
 * Metric conditions: Temperature <= 10°C and Wind speed > 4.8 km/h
 * @param {number} temp - Temperature in Celsius
 * @param {number} wind - Wind speed in km/h
 * @returns {boolean} - True if conditions are viable
 */
function isViableWindChill(temp, wind) {
    return temp <= 10 && wind > 4.8;
}

/**
 * Update the wind chill display in the weather section
 */
function updateWindChill() {
    const windChillElement = document.getElementById('windchill');
    
    if (isViableWindChill(temperature, windSpeed)) {
        const windChill = calculateWindChill(temperature, windSpeed);
        windChillElement.textContent = `${windChill.toFixed(1)}°C`;
    } else {
        windChillElement.textContent = 'N/A';
    }
}

/**
 * Update footer with current year and last modified date
 */
function updateFooter() {
    // Set current year
    const currentYearElement = document.getElementById('currentyear');
    const currentYear = new Date().getFullYear();
    currentYearElement.textContent = currentYear;
    
    // Set last modified date
    const lastModifiedElement = document.getElementById('lastmodified');
    const lastModified = document.lastModified;
    lastModifiedElement.textContent = lastModified;
}

/**
 * Initialize page when DOM is fully loaded
 */
function init() {
    updateWindChill();
    updateFooter();
}

// Run initialization when page loads
init();