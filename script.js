let input = document.getElementById('todo-input');
let addBtn = document.getElementById('add-btn');
let list = document.getElementById('todo-list');

let saved = localStorage.getItem('todos');
let todos = saved ? JSON.parse(saved) : [];

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function createTodoNode(todo, index) {
    let li = document.createElement('li');
    li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");

    // Checkbox
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !!todo.completed;
    checkbox.classList.add("form-check-input", "me-2");

    checkbox.addEventListener("change", function() {
        todo.completed = checkbox.checked;
        textSpan.style.textDecoration = todo.completed ? 'line-through' : 'none';
        saveTodos();

        
        console.log("Todo status:", todo.completed);
    });

    // Text
    let textSpan = document.createElement("span");
    textSpan.textContent = todo.text;
    textSpan.style.margin = '0 8px';
    if (todo.completed) {
        textSpan.style.textDecoration = 'line-through';
    }

    // Double-click → Edit
    textSpan.addEventListener("dblclick", function() {
        let newText = prompt("Edit todo", todo.text);
        if (newText !== null) {
            todo.text = newText.trim();
            textSpan.textContent = todo.text;
            saveTodos();
        }
    });

    // Delete Button
    let delBtn = document.createElement('button');
    delBtn.textContent = "Delete";
    delBtn.classList.add("btn", "btn-danger", "btn-sm");
    delBtn.addEventListener('click', function() {
        todos.splice(index, 1);
        render();
        saveTodos();

    
        console.log("Todo deleted:", true);
    });

    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(delBtn);
    return li;
}

function render() {
    list.innerHTML = '';
    todos.forEach(function(todo, index) {
        let node = createTodoNode(todo, index);
        list.appendChild(node);
    });
}

function addTodo() {
    let text = input.value.trim();
    if (!text) return;

    todos.push({ text: text, completed: false });
    input.value = '';
    render();
    saveTodos();

    
    console.log("Todo added:", true);
}

addBtn.addEventListener("click", addTodo);

input.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addTodo();
    }
});

render();
