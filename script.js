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
    taxList = document.getElementById('tax-list'),
    totalsList = document.getElementById('totals-list');

//define globals
let people = [],
    items = [],
    taxes = [],
    cost = '',
    tax = '';

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

itemCost.addEventListener('keydown', (event) => {
    event.preventDefault();
    const key = event.key;
    if (/[0-9]/.test(key)) {
        event.preventDefault();
        cost += key;
        if (cost === '0') cost = '';
        displayNum(itemCost, cost);
    }
    else if (key === 'Backspace') {
        event.preventDefault();
        cost = cost.slice(0, -1);
        displayNum(itemCost, cost);
    }
    //enable/disable add item button
    addItemButton.disabled = 
        !itemName.value.trim()
        || !cost
        || !itemOwner.value.trim();
});

//handle the Add Item button
addItemButton.addEventListener('click', () => {
    //disable the add button
    addItemButton.disabled = true;
    //prepend the new item to the list
    const nameVal = itemName.value.trim(),
        costVal = itemCost.value.trim(),
        ownerVal = itemOwner.value.trim();
    itemList.insertAdjacentHTML('afterbegin', `
        <li class="list-group-item">
            <div class="row align-items-center">
                <div class="col-3 border-end pe-3">${nameVal}</div>
                <div class="col-3 border-end pe-3">${costVal}</div>
                <div class="col-4 border-end pe-3">${ownerVal}</div>
                <div class="col-2 text-end">
                    <button class="btn btn-sm btn-danger">Remove</button>
                </div>
            </div>
        </li>`
    );
    //push item to item list
    items.push({name: nameVal, cost: parseFloat(costVal.replace(/[$,]/g, '')), owner: ownerVal});
    //clear the input fields
    itemName.value = '';
    itemCost.value = '';
    itemOwner.value = '';
    cost = '';
    //update totals
    calculate();
});

//disable the Add Item button if any of the item fields are empty
[itemName, itemOwner].forEach((field) => {
    field.addEventListener('input', () => {
        addItemButton.disabled = 
            !itemName.value.trim()
            || !cost
            || !itemOwner.value.trim();
    });
});

//handle the Delete buttons in the itemList
itemList.addEventListener('click', (event) => {
    //check if the clicked element is a Remove button
    if (event.target.textContent === 'Remove') {
        //delete the item from the list
        const li = event.target.closest('li');
        if (li) {
            li.remove();
        }
    }
});

taxCost.addEventListener('keydown', (event) => {
    event.preventDefault();
    const key = event.key;
    if (/[0-9]/.test(key)) {
        event.preventDefault();
        tax += key;
        if (tax === '0') tax = '';
        displayNum(taxCost, tax);
    }
    else if (key === 'Backspace') {
        event.preventDefault();
        tax = tax.slice(0, -1);
        displayNum(taxCost, tax);
    }
    //enable/disable add item button
    addTaxButton.disabled = !tax;
});

//handle the Add Tax/Tip/Fee button
addTaxButton.addEventListener('click', () => {
    //disable the add Tax/Tip/Fee button
    addTaxButton.disabled = true;
    //prepend the Tax/Tip/Fee list
    const taxVal = taxCost.value.trim();
    taxList.insertAdjacentHTML('afterbegin', `
        <li class="list-group-item d-flex justify-content-between">
            <span class="tax-cost">${taxVal}</span>
            <button class="btn btn-sm btn-danger">Remove</button>
        </li>`
    );
    //push the Tax/Tip/Fee to the taxes list
    taxes.push(parseFloat(taxVal.replace(/[$,]/g, '')));
    //clear the input field,
    taxCost.value = '';
    tax = '';
    //update totals
    calculate();
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
    itemOwner.innerHTML = '<option value="" disabled selected>Person</option>';
    people.forEach((person) => {
        itemOwner.innerHTML += `<option value="${person}">${person}</option>`;
    });
    addItemButton.disabled = true;
}

function displayNum(elem, string) {
    const length = string.length;
    //add zeros to the right of the decimal if necessary
    if (length <= 2) {
        const decimal = '0'.repeat(2 - length) + string;
        elem.value = `$0.${decimal}`;
    }
    else {
        //split into whole part and decimal part
        const leftDecimal = string.slice(0, length - 2),
            rightDecimal = string.slice(length - 2);
        elem.value = `$${leftDecimal.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}.${rightDecimal}`;
    }
}

function calculate() {
    const totals = {};
    let total = 0;
    items.forEach((item) => {
        if (!totals[item.owner]) totals[item.owner] = 0;
        totals[item.owner] += item.cost;
        total += item.cost;
    });
    taxes.forEach((tax) => {
        const taxPercent = tax/total;
        for (const person in totals) {
            totals[person] += totals[person]*taxPercent;
        }
    });
    totalsList.replaceChildren();
    for (const person in totals) {
        totalsList.insertAdjacentHTML('afterbegin', `
            <li class="list-group-item">
                <div class="row align-items-center">
                    <div class="col-9 border-end pe-3">${person}</div>
                    <div class="col-3 text-end pe-3">$${totals[person].toFixed(2)}</div>
                </div>
            </li>`
        );
    }
}