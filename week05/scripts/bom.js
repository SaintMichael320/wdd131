// Declare variables that hold references to the input, button, and list elements
const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('.list');

// Declare chaptersArray and assign it the stored list OR an empty array on first visit
let chaptersArray = getChapterList() || [];

// Populate the displayed list on page load from whatever was saved in localStorage
chaptersArray.forEach(chapter => {
  displayList(chapter);
});

// Create a click event listener for the Add Chapter button
button.addEventListener('click', () => {
  if (input.value != '') {          // make sure the input is not empty
    displayList(input.value);       // call the function that outputs the submitted chapter
    chaptersArray.push(input.value); // add the chapter to the array
    setChapterList();               // update the localStorage with the new array
    input.value = '';               // clear the input
    input.focus();                  // set the focus back to the input
  }
});

// displayList — builds and appends a list item for a given chapter name
function displayList(item) {
  let li = document.createElement('li');
  let deleteButton = document.createElement('button');

  li.textContent = item;             // use the displayList parameter 'item'
  deleteButton.textContent = '❌';
  deleteButton.classList.add('delete'); // references CSS rule .delete { width: fit-content; }
  deleteButton.ariaLabel = `Remove ${item}`; // accessibility label

  li.append(deleteButton);
  list.append(li);

  deleteButton.addEventListener('click', function () {
    list.removeChild(li);
    deleteChapter(li.textContent);   // remove the chapter from the array and localStorage
    input.focus();                   // set the focus back to the input
  });
}

// setChapterList — saves the current chaptersArray to localStorage as a JSON string
function setChapterList() {
  localStorage.setItem('myFavBOMList', JSON.stringify(chaptersArray));
}

// getChapterList — retrieves and parses the saved chapter list from localStorage
function getChapterList() {
  return JSON.parse(localStorage.getItem('myFavBOMList'));
}

// deleteChapter — removes a chapter from the array and updates localStorage
function deleteChapter(chapter) {
  chapter = chapter.slice(0, chapter.length - 1); // slice off the trailing ❌ character
  chaptersArray = chaptersArray.filter(item => item !== chapter); // rebuild array without deleted item
  setChapterList(); // persist the updated array to localStorage
}