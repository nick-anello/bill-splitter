/**
 * @fileOverview logic for the bill splitter
 */

//store page elements as variables
const addPersonButton = document.getElementById('add-person'),
    personName = document.getElementById('person-name'),
    peopleList = document.getElementById('people-list'),
    addItemButton = document.getElementById('add-item'),
    itemName = document.getElementById('item-name'),
    itemCost = document.getElementById('item-cost'),
    itemOwner = document.getElementById('item-owner'),
    itemList = document.getElementById('item-list'),
    addTaxButton = document.getElementById('add-tax'),
    taxCost = document.getElementById('tax-cost'),
    taxList = document.getElementById('tax-list');

//define globals
let people = [];

//handle the Add People button
addPersonButton.addEventListener('click', () => { addPerson(); });

//disable the Add People button if input field is blank
personName.addEventListener('input', () => {
    addPersonButton.disabled = !personName.value.trim();
});

//handle Enter keypress in the personName input field
personName.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        //prevent form submission
        event.preventDefault();
        //if there is input, add the person
        if (personName.value.trim()) addPerson();
    }
});

//handle the Delete buttons in the peopleList
peopleList.addEventListener('click', (event) => {
    //check if the clicked element is a Remove button
    if (event.target.textContent === 'Remove') {
        //delete the person from the list
        const li = event.target.closest('li');
        if (li) li.remove();
        //update people array
        updatePeople();        
    }
});

//handle the Add Item button
addItemButton.addEventListener('click', () => {
    //disable the add button
    addItemButton.disabled = true;
    //prepend the new item to the list
    itemList.insertAdjacentHTML('afterbegin', `
        <li class="list-group-item">
            <div class="row align-items-center">
                <div class="col-3 border-end pe-3">${itemName.value.trim()}</div>
                <div class="col-3 border-end pe-3">${itemCost.value.trim()}</div>
                <div class="col-4 border-end pe-3">${itemOwner.value.trim()}</div>
                <div class="col-2 text-end">
                    <button class="btn btn-sm btn-danger">Remove</button>
                </div>
            </div>
        </li>`
    );
    //clear the input fields
    itemName.value = '';
    itemCost.value = '';
    itemOwner.value = '';
});

//disable the Add Item button if any of the item fields are empty
[itemName, itemCost, itemOwner].forEach((field) => {
    field.addEventListener('input', () => {
        addItemButton.disabled = !itemName.value.trim()
            || !itemCost.value.trim()
            || !itemOwner.value.trim();
    });
});

//handle the Delete buttons in the itemList
itemList.addEventListener('click', (event) => {
    //check if the clicked element is a Remove button
    if (event.target.textContent === 'Remove') {
        //delete the item from the list
        const li = event.target.closest('li');
        if (li) li.remove();
    }
});

//disable the Add Tax/Tip/Fee button if input field is blank
taxCost.addEventListener('input', () => {
    addTaxButton.disabled = !taxCost.value.trim();
});

//handle the Add Tax/Tip/Fee button
addTaxButton.addEventListener('click', () => {
    //disable the add Tax/Tip/Fee button
    addTaxButton.disabled = true;
    //prepend the Tax/Tip/Fee list
    taxList.insertAdjacentHTML('afterbegin', `
        <li class="list-group-item d-flex justify-content-between">
            <span class="tax-cost">${taxCost.value.trim()}</span>
            <button class="btn btn-sm btn-danger">Remove</button>
        </li>`
    );
    //clear the input field,
    taxCost.value = '';
});

//handle the Delete buttons in the taxList
taxList.addEventListener('click', (event) => {
    //check if the clicked element is a Remove button
    if (event.target.textContent === 'Remove') {
        //delete the Tax/Tip/Fee from the list
        const li = event.target.closest('li');
        if (li) li.remove();
    }
});

/**
 * Prepend the people list with the new person
 */
function addPerson() {
    //disable the add button
    addPersonButton.disabled = true;
    //prepend the people list
    peopleList.insertAdjacentHTML('afterbegin', `
        <li class="list-group-item d-flex justify-content-between">
            <span class="person-name">${personName.value.trim()}</span>
            <button class="btn btn-sm btn-danger">Remove</button>
        </li>`
    );
    //clear the input field,
    personName.value = '';
    //update people array
    updatePeople();
}

/**
 * Update the people array
 */
function updatePeople() {
    //clear people array
    people.length = 0;
    //add each person's name to the people array
    [...peopleList.getElementsByTagName('li')].forEach((li) => {
        people.push(li.children[0].textContent);
    });
    //update Select Person dropdown
    itemOwner.innerHTML = '<option value="" disabled selected>Select person</option>';
    people.forEach((person) => {
        itemOwner.innerHTML += `<option value="${person}">${person}</option>`;
    });
    addItemButton.disabled = true;
}