const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");

const listContainer = document.getElementById("listContainer");
const todo =  document.getElementById('todo');

const noElementDiv = document.querySelector(".no-element")

const initialItems = ['JavaScript', 'HTML', 'CSS', 'React', 'Angular', 'Zustand', 'NextJS', 'TypeScript'];

todoForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const todoItem = todoInput.value;
    if(todoItem){
        addTodoItem(todoItem);
        checkEmptyList();
    }
});

const checkEmptyList = () => {
    if (listContainer.children.length === 0){
        noElementDiv.style.display = 'block';
        noElementDiv.style.fontSize = '2rem';
    } else {
        noElementDiv.style.display = 'none'
    }
}

function addTodoItem(todoItem) {
    const todoElement = todo.content.cloneNode(true);
    todoElement.querySelector('.text').textContent = todoItem;
    
    listContainer.appendChild(todoElement);
    todoInput.value = '';
};

listContainer.addEventListener('click', (e) => {
    if(e.target.classList.contains('delete')){
        e.target.parentElement.remove();
        checkEmptyList();
    } else if(e.target.classList.contains('edit')){
        const edit = e.target;
        const text = e.target.parentElement.querySelector('.text');
        const input = document.createElement('input');
        input.value = text.textContent;
        e.target.parentElement.replaceChild(input, text);
        edit.textContent = '💾';
        edit.classList.remove('edit')
        edit.classList.add('save');
    } 
    else if(e.target.classList.contains('save')){
        const save = e.target;
        const span = document.createElement('span');
        const text = e.target.parentElement.querySelector('input');
        span.className = 'text';
        span.textContent = text.value;
        e.target.parentElement.replaceChild(span,text);
        save.textContent = '✏️';
        save.classList.remove('save');
        save.classList.add('edit');
    }
})



initialItems.forEach( (item) => {
    addTodoItem(item);
});

checkEmptyList()