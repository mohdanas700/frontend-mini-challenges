const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");

const listContainer = document.getElementById("listContainer");
const todo =  document.getElementById('todo');


const initialItems = ['JavaScript', 'HTML', 'CSS', 'React', 'Angular', 'Zustand', 'NextJS', 'TypeScript'];

todoForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const todoItem = todoInput.value;
    if(todoItem){
        addTodoItem(todoItem);
    }
});


function addTodoItem(todoItem) {
    const todoElement = todo.content.cloneNode(true);
    todoElement.querySelector('.text').textContent = todoItem;
    
    listContainer.appendChild(todoElement);
    todoInput.value = '';
};

initialItems.forEach( (item) => {
    addTodoItem(item);
});