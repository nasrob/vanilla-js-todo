// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Event listners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteOrCheck);
filterOption.addEventListener('click', filterTodo);


// Functions
function addTodo(event) {
    event.preventDefault();

    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    saveTodoInLocalStorage(todoInput.value);

    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    todoInput.value = '';

    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add('delete-btn');
    todoDiv.appendChild(deleteButton);

    todoList.appendChild(todoDiv);

}

function deleteOrCheck(event) {
    const item = event.target;
    const todo = item.parentElement;

    if (item.classList[0] === 'delete-btn') {

        // animation before deleting an item
        todo.classList.add('fall');
        removeFromLocalStorage(todo);
        todo.addEventListener('transitionend', function () {
            todo.remove();
        });
    }

    if (item.classList[0] === 'complete-btn') {
        todo.classList.toggle('completed');
    }
}

function filterTodo(event) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (event.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                // break;
        }

    });
}

function saveTodoInLocalStorage(todo) {
    let todos;
    // Checking localStorage and instanciate todos
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function (todo) {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        todoInput.value = "";

        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add('delete-btn');
        todoDiv.appendChild(deleteButton);

        todoList.appendChild(todoDiv);
    });

}

function removeFromLocalStorage(todo) {
    let todos;
    // Checking localStorage and instanciate todos
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoInnerText = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoInnerText), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}