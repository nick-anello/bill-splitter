/**
 * @fileOverview logic for the bill splitter
 */

//add handler to add a person to the list
document.getElementById('add-person').addEventListener('click', () => {
    const peopleList = document.getElementById('people-list');

    //prepend peopleList
    peopleList.innerHTML = `
        <li class="list-group-item d-flex justify-content-between">
            ${document.getElementById('person-name').value.trim()}
            <button class="btn btn-sm btn-danger">Remove</button>
        </li>`
        + peopleList.innerHTML;
});