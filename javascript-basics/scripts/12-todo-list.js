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

document.querySelector('.js-add-button').addEventListener('click', () => {
    addTodo();
})
document.querySelector('.js-name-input').addEventListener('keyup', (event) => {
    addOnEnter(event.key);
})

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

    todoList.forEach((element, index) => {
        const todo = element;
        todoListHTML += `
        <div>${todo.name}</div>
        <div>${todo.date}</div>   
        <div>
        <button class='js-delete-todo-button todo-button delete-button'">Delete</button>
        </div>
            `;
    });


    document.querySelector('.js-todo-list-output').innerHTML = todoListHTML;

    document.querySelectorAll('.js-delete-todo-button')
        .forEach((element, index) => {
            element.addEventListener('click', () => deleteTodo(index));
        });

}

function addOnEnter(key) {
    if (key === "Enter") {
        addTodo();
    }
}

