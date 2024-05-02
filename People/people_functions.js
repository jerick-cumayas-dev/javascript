var addButton = document.getElementById('add-person-button');
addButton.addEventListener('click', addPerson);

document.addEventListener('DOMContentLoaded', function () {
    displayPeople();
});

function retrievePeople()
{
    var people = localStorage.getItem("people");
    if (people != null){
        return JSON.parse(people);
    } else {
        return []
    }
}

function createTableBodyColumn(textName)
{
    var column = document.createElement("td");
    column.className = "columns"

    if (!isNaN(textName)) {
        column.id = "id"; // Parse as integer
    } else {
        column.id = textName; // Use textName as is
    }

    var textContainer = document.createElement("span");
    textContainer.textContent = textName;
    textContainer.className = "text-container"

    column.appendChild(textContainer);

    return column;
}

function createRecordActions()
{
    var column = document.createElement('td');
    column.className = "columns"

    var deleteButton = document.createElement('button');
    deleteButton.className = 'record-action-button'
    deleteButton.textContent = "Delete"
    deleteButton.addEventListener('click', deletePerson);

    var editButton = document.createElement('button');
    editButton.className = 'record-action-button'
    editButton.textContent = "Edit"
    editButton.addEventListener('click', editPerson);

    column.appendChild(deleteButton);
    column.appendChild(editButton);

    return column;
}

function displayPeople()
{
    clearPeople();
    var people = retrievePeople();
    var tableBody = document.getElementById("people-table-body");
    people.forEach(function(person){
        var record = document.createElement("tr");
        record.className = "records"

        record.appendChild(createTableBodyColumn(person.id));
        record.appendChild(createTableBodyColumn(person.firstName));
        record.appendChild(createTableBodyColumn(person.middleName));
        record.appendChild(createTableBodyColumn(person.lastName));   
        record.appendChild(createRecordActions());

        tableBody.appendChild(record);    
    })
}

function clearPeople()
{
    var tableBody = document.getElementById("people-table-body");
    var records = tableBody.querySelectorAll(".columns");
    records.forEach(function (record) {
        record.remove();
    })
}

function addPerson()
{
    var people = retrievePeople();
    var count = 1;

    if (people.length !== 0){
        count = people[people.length-1].id + 1
    }
    
    var firstName = document.getElementById('firstName').value;
    var middleName = document.getElementById('middleName').value;
    var lastName = document.getElementById('lastName').value;

    var person = {
        id: count,
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
    };

    people.push(person);
    localStorage.setItem('people', JSON.stringify(people));
}

function deletePerson(event)
{
    var people = retrievePeople();
    var column = event.target.parentNode;
    var parentRow = column.parentNode;

    var id = parseInt(parentRow.querySelector("#id").textContent);
    var updated = people.filter(function(person) {
        return person.id !== id;
    });
    localStorage.setItem("people", JSON.stringify(updated));
    displayPeople();
}

function editPerson()
{

}