// ─── Product Data ────────────────────────────────────────────────────────────
// Array of product objects used to dynamically populate the select element
const products = [
  { id: 'fc-1888', name: 'Flux Capacitor' },
  { id: 'ps-2618', name: 'Power Shake' },
  { id: 'to-4812', name: 'Top Notch' },
  { id: 'ms-1975', name: 'Mr. Steam' },
  { id: 'cj-1938', name: 'Chic Jacket' },
  { id: 'tf-1987', name: 'Turbo Fan' },
  { id: 'ul-2000', name: 'Ultra Lamp' },
  { id: 'sb-3001', name: 'Solar Blaster' },
];

// ─── Populate Product Select ─────────────────────────────────────────────────
// Use the product array to build option elements dynamically.
// The product name is the display text; the product id is the value.
const productSelect = document.querySelector('#product');

products.forEach(product => {
  const option = document.createElement('option');
  option.value = product.id;          // id used as the option value
  option.textContent = product.name;  // name used as the display text
  productSelect.appendChild(option);
});

// ─── Star Rating Live Label ───────────────────────────────────────────────────
// Show a text description next to the stars when a rating is selected
const ratingLabels = {
  '1': '1 Star — Poor',
  '2': '2 Stars — Fair',
  '3': '3 Stars — Good',
  '4': '4 Stars — Great',
  '5': '5 Stars — Outstanding',
};

const ratingInputs = document.querySelectorAll('input[name="rating"]');
const ratingLabel  = document.querySelector('#ratingLabel');

ratingInputs.forEach(input => {
  input.addEventListener('change', () => {
    ratingLabel.textContent = ratingLabels[input.value] || '';
  });
});