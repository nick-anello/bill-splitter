/**
 * @fileOverview logic for the bill splitter
 */

// store page elements as variables
const addButton = document.getElementById('add-person'),
    personName = document.getElementById('person-name'),
    peopleList = document.getElementById('people-list');

// disable the Add button if input field is blank
personName.addEventListener('input', () => {
    addButton.disabled = !personName.value.trim();
});

// prevent form submission on Enter keypress
// and add the new person
personName.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        if (personName.value.trim()) addPerson();
    }
});

// add a person to the list
addButton.addEventListener('click', () => { addPerson(); });

// clear the input field,
// prepend the people list with the new person,
// and disable the add button
function addPerson() {
    peopleList.innerHTML = `
        <li class="list-group-item d-flex justify-content-between">
            ${personName.value.trim()}
            <button class="btn btn-sm btn-danger">Remove</button>
        </li>`
        + peopleList.innerHTML;
    personName.value = '';
    addButton.disabled = true;
}