// ===== TEMPLE DATA =====
// Array of temple objects
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "Salt Lake",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 253015,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake-city-utah/2018/400x250/slctemple7.jpg"
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 41010,
    imageUrl:
    "https://churchofjesuschristtemples.org/assets/img/temples/rome-italy-temple/rome-italy-temple-2642-main.jpg"
  },
  {
    templeName: "Provo City Center",
    location: "Provo, Utah, United States",
    dedicated: "2016, March, 20",
    area: 85084,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/provo-city-center/400x250/provo-city-center-temple-1572517-wallpaper.jpg"
  }
];

// ===== TEMPLE CARD FUNCTIONS =====
// Function to create temple cards
function createTempleCard(temple) {
  return `
    <figure>
      <img src="${temple.imageUrl}" alt="${temple.templeName} Temple" loading="lazy" width="400" height="300">
      <figcaption>
        <h3>${temple.templeName}</h3>
        <p><strong>Location:</strong> ${temple.location}</p>
        <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
        <p><strong>Area:</strong> ${temple.area.toLocaleString()} sq ft</p>
      </figcaption>
    </figure>
  `;
}

// Function to display temples
function displayTemples(templeList) {
  const container = document.querySelector('main');
  
  // Clear existing content except the h1
  const h1 = container.querySelector('h1');
  container.innerHTML = '';
  container.appendChild(h1);
  
  // Add temple cards
  templeList.forEach(temple => {
    container.innerHTML += createTempleCard(temple);
  });
}

// Function to get year from dedication date
function getDedicationYear(dedicatedDate) {
  return parseInt(dedicatedDate.split(',')[0]);
}

// Function to filter temples
function filterTemples(filter) {
  let filteredTemples = [];
  
  switch(filter) {
    case 'old':
      // Temples built before 1900
      filteredTemples = temples.filter(temple => getDedicationYear(temple.dedicated) < 1900);
      break;
    case 'new':
      // Temples built after 2000
      filteredTemples = temples.filter(temple => getDedicationYear(temple.dedicated) > 2000);
      break;
    case 'large':
      // Temples larger than 90,000 square feet
      filteredTemples = temples.filter(temple => temple.area > 90000);
      break;
    case 'small':
      // Temples smaller than 10,000 square feet
      filteredTemples = temples.filter(temple => temple.area < 10000);
      break;
    case 'home':
    default:
      // Display all temples
      filteredTemples = temples;
      break;
  }
  
  displayTemples(filteredTemples);
}

// ===== FOOTER DATES =====
// Footer: Get current year for copyright
const currentYearSpan = document.querySelector('#currentyear');
const currentYear = new Date().getFullYear();
currentYearSpan.textContent = currentYear;

// Footer: Get last modified date
const lastModifiedParagraph = document.querySelector('#lastModified');
const lastModified = document.lastModified;
lastModifiedParagraph.textContent = `Last Modified: ${lastModified}`;

// ===== HAMBURGER MENU =====
// Hamburger Menu: Get references to menu button and navigation
const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

// Hamburger Menu: Add click event listener to toggle menu
hamButton.addEventListener('click', () => {
  navigation.classList.toggle('open');
  hamButton.classList.toggle('open');
});

// ===== NAVIGATION FILTERING =====
// Display all temples on initial load
displayTemples(temples);

// Add click event listeners to navigation links
const navLinks = document.querySelectorAll('.navigation a');
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Get filter from link ID or text content
    const filter = link.id || link.textContent.toLowerCase();
    filterTemples(filter);
    
    // Close mobile menu after selection
    if (navigation.classList.contains('open')) {
      navigation.classList.remove('open');
      hamButton.classList.remove('open');
    }
  });
});
