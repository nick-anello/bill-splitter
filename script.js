/**
 * @fileOverview logic for the bill splitter
 */

//store page elements as variables
const personInput = document.getElementById('person-input'),
    addPersonButton = document.getElementById('add-person-button'),
    peopleList = document.getElementById('people-list'),
    itemNameInput = document.getElementById('item-name-input'),
    itemCostInput = document.getElementById('item-cost-input'),
    itemOwnerInput = document.getElementById('item-owner-input'),
    addItemButton = document.getElementById('add-item-button'),
    itemList = document.getElementById('item-list'),
    chargeInput = document.getElementById('charge-input'),
    addTaxButton = document.getElementById('add-tax-button'),
    taxList = document.getElementById('charge-list'),
    totalsList = document.getElementById('totals-list');

// ==============================
// Section 2: State
// ==============================
// Define the state (data store) for your application
const state = {
    people: [],
    items: [],
    charges: []
}

// ==============================
// Section 3: Utility Functions
// ==============================
// Reusable helper functions to keep your code DRY (Don't Repeat Yourself)


// ==============================
// Section 4: DOM Manipulation
// ==============================
// Functions to update the DOM based on the application state
/**
 * Update the people list in the DOM
 */
function renderPeopleList() {
    peopleList.innerHTML = state.people.map(person =>
        `<li class="list-group-item d-flex justify-content-between">
            <span class="person-name text-truncate">${person}</span>
            <button class="btn btn-sm btn-danger">Remove</button>
        </li>`
    ).join('');
}


// ==============================
// Section 5: Event Handlers
// ==============================
// Define functions to handle user interactions

/**
 * Handle input for the add person field
 */
function handlePersonInput(event) {
    addPersonButton.disabled = !personInput.value.trim();
}

/**
 * Handle click for the add person button
 */
function addPerson() {
    addPersonButton.disabled = true;
    state.people.unshift(personInput.value.trim());
    personInput.value = '';
    renderPeopleList();
}

// ==============================
// Section 6: Initialization
// ==============================
// Set up event listeners and perform any setup tasks
personInput.addEventListener('input', handlePersonInput);
addPersonButton.addEventListener('click', addPerson)

// Call the init function to start the app
