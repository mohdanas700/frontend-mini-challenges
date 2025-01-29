// Get references to HTML elements
const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");
const listContainer = document.getElementById("listContainer");
const todo = document.getElementById('todo');
const noElementDiv = document.querySelector(".no-element");

// Initial list items to be loaded in the todo list
const initialItems = ['JavaScript', 'HTML', 'CSS', 'React', 'Angular', 'Zustand', 'NextJS', 'TypeScript'];

// Event listener for the todo form submission
todoForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent page reload on form submit

    const todoItem = todoInput.value; // Get the value of the input field
    if (todoItem) {
        addTodoItem(todoItem); // Add the todo item if not empty
        checkEmptyList(); // Check if the list is empty and show/hide the "No element" message
    }
});

// Function to check if the list is empty and show/hide the message
const checkEmptyList = () => {
    if (listContainer.children.length === 0) {
        noElementDiv.style.display = 'block'; // Show the "No element" message
        noElementDiv.style.fontSize = '2rem'; // Adjust the font size of the message
    } else {
        noElementDiv.style.display = 'none'; // Hide the message if list is not empty
    }
};

// Function to add a new todo item to the list
function addTodoItem(todoItem) {
    const todoElement = todo.content.cloneNode(true); // Clone the template to create a new todo element
    todoElement.querySelector('.text').textContent = todoItem; // Set the todo item text
    
    listContainer.appendChild(todoElement); // Append the new todo item to the list
    todoInput.value = ''; // Clear the input field
};

// Event listener for click events on the todo list items (event delegation)
listContainer.addEventListener('click', (e) => {
    // If the clicked element is the delete button
    if (e.target.classList.contains('delete')) {
        e.target.parentElement.remove(); // Remove the parent todo item
        checkEmptyList(); // Check if the list is empty and update the "No element" message
    } 
    // If the clicked element is the edit button
    else if (e.target.classList.contains('edit')) {
        const edit = e.target;
        const text = e.target.parentElement.querySelector('.text'); // Get the current todo item text
        const input = document.createElement('input'); // Create an input field to edit the text
        input.value = text.textContent; // Set the input field's value to the current todo item text
        e.target.parentElement.replaceChild(input, text); // Replace the text with the input field
        edit.textContent = '💾'; // Change the edit button to a save button
        edit.classList.remove('edit');
        edit.classList.add('save'); // Change the button class to 'save'
    } 
    // If the clicked element is the save button
    else if (e.target.classList.contains('save')) {
        const save = e.target;
        const span = document.createElement('span'); // Create a span to replace the input field
        const text = e.target.parentElement.querySelector('input'); // Get the input field value
        span.className = 'text'; // Add the 'text' class to the span
        span.textContent = text.value; // Set the span's text to the input field's value
        e.target.parentElement.replaceChild(span, text); // Replace the input field with the span
        save.textContent = '✏️'; // Change the save button back to an edit button
        save.classList.remove('save');
        save.classList.add('edit'); // Change the button class back to 'edit'
    }
});

// Add the initial items to the list
initialItems.forEach((item) => {
    addTodoItem(item);
});

// Check the list and show/hide the "No element" message on initial load
checkEmptyList();
