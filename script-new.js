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


// ==============================
// Section 5: Event Handlers
// ==============================
// Define functions to handle user interactions

// ==============================
// Section 6: Initialization
// ==============================
// Set up event listeners and perform any setup tasks

// Call the init function to start the app
