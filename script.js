/**
 * @fileOverview Logic for the bill splitter app
 */

// State of the bill splitter app
const state = {
    people: [], // List of people splitting the bill
    items: [], // List of items purchased
    charges: [] // List of taxes, tips, and/or fees
};

/**
 * Renders a single-field list.
 * 
 * @param {string} list - List to render.
 * @returns {void}
 */
function renderSingleFieldList(list) {
    document.getElementById(list).innerHTML = state[list].map((value, index) => `
        <li class="list-group-item d-flex justify-content-between">
            <span class="text-truncate">${value}</span>
            <button class="btn btn-sm btn-danger" data-action="delete" data-list="${list}" data-index="${index}">Remove</button>
        </li>
    `).join('');
}

/**
 * Renders the items list.
 * 
 * @returns {void}
 */
function renderItemsList() {
    document.getElementById('items').innerHTML = state.items.map((item, index) => `
        <li class="list-group-item">
            <div class="row align-items-center">
                <div class="col-3 border-end pe-3 text-truncate">${item[0]}</div>
                <div class="col-3 border-end pe-3 text-truncate">${item[1]}</div>
                <div class="col-3 border-end pe-3 text-truncate">${item[2]}</div>
                <div class="col-3 text-end">
                    <button class="btn btn-sm btn-danger" data-action="delete" data-list="items" data-index="${index}">Remove</button>
                </div>
            </div>
        </li>
    `).join('');
}

/**
 * Delegates rendering a list.
 * 
 * @param {string} list - List to render.
 * @returns {void}
 */
function renderList(list) {
    switch (list) {
        case 'people': 
        case 'charges':
            renderSingleFieldList(list);
            break;
        case 'items':
            renderItemsList();
            break;
    }
}

/**
 * Adds values from related input fields to the corresponding list, clears the fields, and renders the list.
 * 
 * @param {HTMLElement} target The Add button that was clicked.
 * @returns {void}
 */
function addToList(target) {
    const list = target.dataset.list,
        fields = target.closest('.row').querySelectorAll('input, select'),
        data = [];

    fields.forEach(field => {
        data.push(field.value.trim());
        field.value = '';
    });
    state[list].unshift(data.length === 1 ? data[0] : data);
    renderList(list);
}

/**
 * Deletes a value from a list and renders it.
 * 
 * @param {string} list - List to delete from.
 * @param {number} index - Index to delete.
 * @returns {void}
 */
function deleteFromList(list, index) {
    state[list].splice(index, 1);
    renderList(list);
}

/**
 * Handles the click event.
 * 
 * @param {Event} event - Click event.
 * @returns {void}
 */
function handleClick(event) {
    const target = event.target,
        dataset = target.dataset;
    switch (dataset.action) {
        case 'add': addToList(target); break;
        case 'delete': deleteFromList(dataset.list, dataset.index); break;
        default:
    }
}

/**
 * Handles the Input event.
 * Enable the corresponding add button when all related fields contain a value.
 * 
 * @param {Event} event - Input event.
 * @returns {void}
 */
function handleInput(event) {
    const target = event.target,
        row = target.closest('.row');
    if (row) {
        row.querySelector('button').disabled = 
            [...row.querySelectorAll('input, select')].some(element => !element.value.trim());
    }
}

// Add event listeners to the page container.
document.getElementById('container').addEventListener('click', handleClick);
document.getElementById('container').addEventListener('input', handleInput);