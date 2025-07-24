const todoList = JSON.parse(localStorage.getItem('todolist')) || [];

renderTodoList();

function deleteTodo(todoElementId) {
    todoList.splice(todoElementId, 1);
    saveInLocalStorage();
    renderTodoList();
}

function saveInLocalStorage() {
    localStorage.setItem('todolist', JSON.stringify(todoList));
}

function addTodo() {
    const inputElement = document.querySelector('.js-name-input');
    const name = inputElement.value;

    const dateElement = document.querySelector('.js-date-input');
    const date = dateElement.value;

    todoList.push({ name, date });

    inputElement.value = '';
    dateElement.value = '';
    saveInLocalStorage();
    renderTodoList();
}

function renderTodoList() {

    let todoListHTML = '';

    for (let i = 0; i < todoList.length; i++) {
        const todo = todoList[i];
        todoListHTML += `
        <div>${todo.name}</div>
        <div>${todo.date}</div>   
        <div>
        <button class = 'todo-button delete-button' onclick="deleteTodo(${i})">Delete</button>
        </div>
            `;
    }

    document.querySelector('.js-todo-list-output').innerHTML = todoListHTML;

}

function addOnEnter(key) {
    if (key === "Enter") {
        addTodo();
    }
}

