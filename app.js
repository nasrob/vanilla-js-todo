// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');


// Event listners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteOrCheck)


// Functions
function addTodo(event) {
    event.preventDefault();

    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');

    todoDiv.appendChild(newTodo);

    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add('delete-btn');
    todoDiv.appendChild(deleteButton);

    todoList.appendChild(todoDiv);

    todoInput.value = '';

}

function deleteOrCheck(event) {
    const item = event.target;
    const todo = item.parentElement;

    if (item.classList[0] === 'delete-btn') {

        // animation before deleting an item
        todo.classList.add('fall');
        todo.addEventListener('transitionend', function () {
            todo.remove();
        });
    }

    if (item.classList[0] === 'complete-btn') {
        todo.classList.toggle('completed');
    }
}