var textInput = document.getElementById("taskInput");
var addButton = document.getElementById("addButton");


addButton.addEventListener("click", function() {
    addTask(taskInput.value);
});

document.addEventListener("DOMContentLoaded", function() {
    displayTasks();
});

document.addEventListener("keypress", function(event) {
    if (event.key === "Enter" || event.code === 13) {
        addTask(taskInput.value);
    }
});

function retrieveTasks()
{
    var tasks = localStorage.getItem("tasks");
    try 
    {
        if (tasks === null)
        {
            return [];
        }
        else 
        {
            return JSON.parse(tasks);
        }
    }
    catch (error)
    {
        console.log(`Error occured: ${error}`);
        return null;
    }
}

function displayTasks()
{
    clearTasks();
    var tasks = retrieveTasks();
    var taskList = document.getElementById("taskList");

    if (tasks === null || tasks.length === 0)
    {
        return;
    }
    else
    {
        tasks.forEach(function (task) {
            var listItem = document.createElement("li");

            var textContainer = document.createElement("span");
            textContainer.textContent = task;
            textContainer.className = "taskItemContainer"

            listItem.appendChild(textContainer);
            listItem.className = 'taskItem';

            var deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete"
            deleteButton.id = "deleteButton"
            deleteButton.className = "itemButtons"
            deleteButton.addEventListener("click", deleteTask);

            var editButton = document.createElement("button");
            editButton.textContent = "Edit"
            editButton.id = "editButton"
            editButton.className = "itemButtons"
            editButton.addEventListener("click", editTask);

            listItem.appendChild(deleteButton);
            listItem.appendChild(editButton);
    
            taskList.appendChild(listItem);
        });
    }
}

function clearTasks()
{
    var taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
}

function addTask(taskInput)
{
    var tasks = retrieveTasks();
    try
    {
        if (taskInput != "")
        {
            tasks.push(taskInput);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            textInput.value = "";
            displayTasks();
        }
    }
    catch (error)
    {
        console.log(`Error occured: ${error}`);
    }
}

function deleteTask(event)
{
    var tasks = retrieveTasks();
    var taskListItem = event.target.parentElement;
    var taskText = taskListItem.querySelector('.taskItemContainer').textContent;

    var updatedList = tasks.filter(function(task){
        return task !== taskText; // Keep tasks that are not equal to the deleted task
    });

    localStorage.setItem("tasks", JSON.stringify(updatedList));

    displayTasks();
}

function editTask(event) 
{
    var tasks = retrieveTasks();
    var listItem = event.target.parentElement;
    var text = listItem.querySelector('.taskItemContainer').textContent;

    var newText = prompt("Edit task", text);
    if (newText != ""){
        var index = tasks.indexOf(text);
        tasks[index] = newText;
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}