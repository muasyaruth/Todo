let todosContainer = document.querySelector('.todos');//the container of the items in the array
let todos = [];//the array list

let todoform = document.querySelector('#todoform');//get input from the user
let newtodo = document.getElementById("createtodo");//the item to be added to the array from the input

todoform.addEventListener("submit", (e) => {
    e.preventDefault();

    if (newtodo.value.trim() !== "") {
        let todo = {//todo is the task
            taskname: newtodo.value.trim(),
            status: false
        };

        todos.push(todo);

        console.log(todos);

        localStorage.setItem('todos', JSON.stringify(todos));

        displayTodos();
    }
    else{
        alert("Fill the field")
    }
});

let displayTodos = function () {
    let taskItems = localStorage.getItem("todos");
    taskItems = JSON.parse(taskItems) || [];

    todosContainer.innerHTML = ''; // Clear existing content

    taskItems.forEach((el, index) => {
        let todo = document.createElement('div');
        todo.className = "todo";

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "checkbox";
        checkbox.checked = el.status;

        let taskname = document.createElement('div');
        taskname.textContent = el.taskname;

        todo.appendChild(checkbox);
        todo.appendChild(taskname);

        if (el.status) {
            todo.classList.add('completed'); // Apply strikethrough for completed tasks
        }

        todosContainer.appendChild(todo);

        // Add event listener for checkbox change
        checkbox.addEventListener('change', function () {
            el.status = checkbox.checked;
            if (checkbox.checked) {
                todo.classList.add('completed');
            } else {
                todo.classList.remove('completed');
            }

            localStorage.setItem('todos', JSON.stringify(taskItems));
        });
    });

    let remaining = taskItems.filter(el => !el.status).length;
    document.getElementById('remaining').textContent = `${remaining} Remaining tasks`;
};

// Function to display only completed tasks
let displayCompletedTasks = function () {
    let taskItems = localStorage.getItem("todos");
    taskItems = JSON.parse(taskItems) || [];

    todosContainer.innerHTML = ''; // Clear existing content

    taskItems.forEach((el, index) => {
        if (el.status) {
            let todo = document.createElement('div');
            todo.className = "todo completed"; // Add 'completed' class directly for completed tasks

            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.className = "checkbox";
            checkbox.checked = el.status;

            let taskname = document.createElement('div');
            taskname.textContent = el.taskname;

            todo.appendChild(checkbox);
            todo.appendChild(taskname);

            todosContainer.appendChild(todo);
        }
    });
};

// Function to display only active tasks
let displayActiveTasks = function () {
    let taskItems = localStorage.getItem("todos");
    taskItems = JSON.parse(taskItems) || [];

    todosContainer.innerHTML = ''; // Clear existing content

    taskItems.forEach((el, index) => {
        if (!el.status) {
            let todo = document.createElement('div');
            todo.className = "todo"; // No 'completed' class for active tasks

            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.className = "checkbox";
            checkbox.checked = el.status;

            let taskname = document.createElement('div');
            taskname.textContent = el.taskname;

            todo.appendChild(checkbox);
            todo.appendChild(taskname);

            todosContainer.appendChild(todo);

            // Add event listener for checkbox change
            checkbox.addEventListener('change', function () {
                el.status = checkbox.checked;
                if (checkbox.checked) {
                    todo.classList.add('completed');
                } else {
                    todo.classList.remove('completed');
                }

                localStorage.setItem('todos', JSON.stringify(taskItems));
            });
        }
    });

    let remaining = taskItems.filter(el => !el.status).length;
    document.getElementById('remaining').textContent = `${remaining} Remaining tasks`;
};

// Function to clear checked items
let clearCheckedItems = function () {
    let taskItems = localStorage.getItem("todos");
    taskItems = JSON.parse(taskItems) || [];

    // Remove checked items
    taskItems = taskItems.filter(el => !el.status);

    localStorage.setItem('todos', JSON.stringify(taskItems));

    // Display remaining tasks
    displayTodos();
};

// Function to display all tasks
let displayAllTasks = function () {
    let taskItems = localStorage.getItem("todos");
    taskItems = JSON.parse(taskItems) || [];

    todosContainer.innerHTML = ''; // Clear existing content

    taskItems.forEach((el, index) => {
        let todo = document.createElement('div');
        todo.className = "todo";

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "checkbox";
        checkbox.checked = el.status;

        let taskname = document.createElement('div');
        taskname.textContent = el.taskname;

        todo.appendChild(checkbox);
        todo.appendChild(taskname);

        if (el.status) {
            todo.classList.add('completed'); // Apply strikethrough for completed tasks
        }

        todosContainer.appendChild(todo);

        // Add event listener for checkbox change
        checkbox.addEventListener('change', function () {
            el.status = checkbox.checked;
            if (checkbox.checked) {
                todo.classList.add('completed');
            } else {
                todo.classList.remove('completed');
            }

            localStorage.setItem('todos', JSON.stringify(taskItems));
        });
    });

    let remaining = taskItems.filter(el => !el.status).length;
    document.getElementById('remaining').textContent = `${remaining} Remaining tasks`;
};

// Event listener for the "Active" paragraph element
document.getElementById('active').addEventListener('click', function () {
    displayActiveTasks(); // Display only active tasks
});

// Event listener for the "Completed" button
document.getElementById('completed').addEventListener('click', function () {
    displayCompletedTasks(); // Display only completed tasks
});

// Event listener for the "All Tasks" button
document.getElementById('alltasks').addEventListener('click', function () {
    displayAllTasks(); // Display all tasks
});

// Event listener for the "Clear" button
document.getElementById('clear').addEventListener('click', function () {
    clearCheckedItems(); // Clear checked items
});

// Initial display
displayTodos();
