// Footer: Get current year for copyright
const currentYearSpan = document.querySelector('#currentyear');
const currentYear = new Date().getFullYear();
currentYearSpan.textContent = currentYear;

// Footer: Get last modified date
const lastModifiedParagraph = document.querySelector('#lastModified');
const lastModified = document.lastModified;
lastModifiedParagraph.textContent = `Last Modified: ${lastModified}`;

// Hamburger Menu: Get references to menu button and navigation
const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

// Hamburger Menu: Add click event listener to toggle menu
hamButton.addEventListener('click', () => {
  navigation.classList.toggle('open');
  hamButton.classList.toggle('open');
});