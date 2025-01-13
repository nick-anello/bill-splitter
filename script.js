/**
 * @fileOverview logic for the bill splitter
 */

//store page elements as variables
const addButton = document.getElementById('add-person'),
    personName = document.getElementById('person-name'),
    peopleList = document.getElementById('people-list');

//define globals
let people = [];

//disable the Add button if input field is blank
personName.addEventListener('input', () => {
    addButton.disabled = !personName.value.trim();
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

//handle the Add People button
addButton.addEventListener('click', () => { addPerson(); });

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

/**
 * Prepend the people list with the new person
 */
function addPerson() {
    //disable the add button
    addButton.disabled = true;
    //prepend the people list
    peopleList.innerHTML = `
        <li class="list-group-item d-flex justify-content-between">
            ${personName.value.trim()}
            <button class="btn btn-sm btn-danger">Remove</button>
        </li>`
        + peopleList.innerHTML;
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
        people.push(li.firstChild.textContent.trim());
    });
}