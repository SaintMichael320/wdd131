// ─── Track Review Count in localStorage ──────────────────────────────────────
// Each time this confirmation page loads, increment the review counter.
const STORAGE_KEY = 'reviewCount';

let reviewCount = parseInt(localStorage.getItem(STORAGE_KEY)) || 0;
reviewCount += 1;
localStorage.setItem(STORAGE_KEY, reviewCount);

// ─── Read URL Parameters from the Form Submission ────────────────────────────
// The form uses method="get" so all field values are in the URL query string.
const params = new URLSearchParams(window.location.search);

// ─── Product Name Lookup ──────────────────────────────────────────────────────
// Map product ids back to display names for a readable confirmation
const productNames = {
  'fc-1888': 'Flux Capacitor',
  'ps-2618': 'Power Shake',
  'to-4812': 'Top Notch',
  'ms-1975': 'Mr. Steam',
  'cj-1938': 'Chic Jacket',
  'tf-1987': 'Turbo Fan',
  'ul-2000': 'Ultra Lamp',
  'sb-3001': 'Solar Blaster',
};

// ─── Star Display Helper ──────────────────────────────────────────────────────
function buildStars(rating) {
  const n = parseInt(rating);
  if (isNaN(n)) return '—';
  return '★'.repeat(n) + '☆'.repeat(5 - n);
}

// ─── Build Confirmation Table ─────────────────────────────────────────────────
// Each row maps a field label to the submitted value.
const tbody = document.querySelector('#reviewBody');

// Helper to create a table row
function addRow(label, value) {
  if (!value || value.trim() === '') return; // skip empty optional fields
  const tr = document.createElement('tr');

  const tdLabel = document.createElement('td');
  tdLabel.textContent = label;

  const tdValue = document.createElement('td');
  tdValue.textContent = value;

  tr.appendChild(tdLabel);
  tr.appendChild(tdValue);
  tbody.appendChild(tr);
}

// ── Product ──
const productId   = params.get('product') || '';
const productName = productNames[productId] || productId || '—';
addRow('Product', productName);

// ── Rating ──
const rating = params.get('rating') || '';
if (rating) {
  const tr = document.createElement('tr');
  const tdLabel = document.createElement('td');
  tdLabel.textContent = 'Rating';
  const tdValue = document.createElement('td');
  tdValue.textContent = buildStars(rating) + `  (${rating}/5)`;
  tr.appendChild(tdLabel);
  tr.appendChild(tdValue);
  tbody.appendChild(tr);
}

// ── Install Date ──
const rawDate = params.get('installDate') || '';
if (rawDate) {
  // Format from YYYY-MM-DD to a more readable form
  const [year, month, day] = rawDate.split('-');
  const months = ['January','February','March','April','May','June',
                  'July','August','September','October','November','December'];
  const formatted = `${months[parseInt(month, 10) - 1]} ${parseInt(day, 10)}, ${year}`;
  addRow('Installed On', formatted);
}

// ── Features ──
// Multiple checkboxes share the name "features"; getAll() returns an array
const features = params.getAll('features');
if (features.length > 0) {
  addRow('Useful Features', features.join(', '));
}

// ── Written Review ──
const review = params.get('review') || '';
addRow('Review', review);

// ── User Name ──
const username = params.get('username') || '';
addRow('Submitted By', username || 'Anonymous');

// ─── Review Count Message ─────────────────────────────────────────────────────
const countMsg = document.querySelector('#reviewCountMsg');
const ordinal  = reviewCount === 1 ? '1st' :
                 reviewCount === 2 ? '2nd' :
                 reviewCount === 3 ? '3rd' :
                 `${reviewCount}th`;

countMsg.innerHTML =
  `This is your <strong>${ordinal}</strong> review submitted this session. ` +
  `Thank you for helping the community!`;