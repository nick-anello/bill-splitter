/**
 * @fileOverview logic for the bill splitter
 */

//store page elements as variables


// ==============================
// Section 2: State
// ==============================
// Define the state (data store) for your application
const state = {
    people: [],
    items: [],
    charges: []
};

/*
// ==============================
// Section 3: rendering
// ==============================
// Reusable helper functions to keep your code DRY (Don't Repeat Yourself)
function buildListElement(list, item, index) {
    switch (list) {
        case 'people':
        case 'charges':
            return `
                <li class="list-group-item d-flex justify-content-between">
                    <span class="text-truncate">${item}</span>
                    <button class="btn btn-sm btn-danger" data-list="${list}" data-index="${index}">Remove</button>
                </li>
            `;
        case 'items':
            return `
                <li class="list-group-item">
                    <div class="row align-items-center">
                        <div class="col-3 border-end pe-3 text-truncate">${item.name}</div>
                        <div class="col-3 border-end pe-3 text-truncate">${item.cost}</div>
                        <div class="col-3 border-end pe-3 text-truncate">${item.owner}</div>
                        <div class="col-3 text-end">
                            <button class="btn btn-sm btn-danger" data-list="${list}" data-index="${index}>Remove</button>
                        </div>
                    </div>
                </li>
            `;
        default: return '';
    }
}*/
function renderSingleFieldList(list) {
    document.getElementById(list).innerHTML = state[list].map((value, index) => `
        <li class="list-group-item d-flex justify-content-between">
            <span class="text-truncate">${value}</span>
            <button class="btn btn-sm btn-danger" data-list="${list}" data-index="${index}">Remove</button>
        </li>
    `).join('');
}

function renderItemsList() {
    document.getElementById('items').innerHTML = state.items.map((item, index) => `
        <li class="list-group-item">
            <div class="row align-items-center">
                <div class="col-3 border-end pe-3 text-truncate">${item[0]}</div>
                <div class="col-3 border-end pe-3 text-truncate">${item[1]}</div>
                <div class="col-3 border-end pe-3 text-truncate">${item[2]}</div>
                <div class="col-3 text-end">
                    <button class="btn btn-sm btn-danger data-list="items" data-index="${index}">Remove</button>
                </div>
            </div>
        </li>
    `).join('');
}

function renderList(list) {
    
    switch (list) {
        case 'people': 
        case 'charges':
            renderSingleFieldList(list);
        case 'items':
            renderItemsList();
    }
}



/*// ==============================
// Section 4: functions
// ==============================
// Functions to update the DOM based on the application state
function renderList(list) {
    peopleList.innerHTML = state[list].map((item, index) => buildListElement(list, item, index)).join('');
}*/

function addToList(target) {
    const list = target.dataset.list,
        fields = target.closest('.row').querySelectorAll('.form-control, .form-select'),
        data = [];

    fields.forEach(field => {
        data.push(field.value.trim())
        field.value = '';
    });
    state[list].unshift(data.length === 1 ? data[0] : data);
    renderList(list);
}

function deleteFromList(list, index) {

}

/*// ==============================
// Section 5: Event Handlers
// ==============================
// Define functions to handle user interactions

function handlePersonInput(event) {
    addPersonButton.disabled = !personInput.value.trim();
}

function handleAddButton() {
    addPersonButton.disabled = true;
    state.people.unshift(personInput.value.trim());
    personInput.value = '';
    renderList('people');
}
function handleListRemoveClick(event) {
    if (target && target.classList.contains('btn-danger')) {
        const target = event.target,
            list = target.getAttribute('data-list');
        state[list].splice(target.getAttribute('data-index'), 1);
        renderList(list);
    }
}
*/
function handleClick(event) {
    const target = event.target;
    switch (target.dataset.action) {
        case 'add': addToList(target); break;
        case 'delete': deleteFromList(list, dataset.index); break;
        default:
    }
}

// ==============================
// Section 6: Initialization
// ==============================
// Set up event listeners and perform any setup tasks
document.getElementById('container').addEventListener('click', handleClick);

// Call the init function to start the app
