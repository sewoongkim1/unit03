const firebaseConfig = {
    apiKey: "AIzaSyBRsI9j1LujGuRRG9jrd0OYwjm6hKt8-3U",
    authDomain: "fir-dbconnecting-project.firebaseapp.com",
    databaseURL: "https://fir-dbconnecting-project-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "fir-dbconnecting-project",
    storageBucket: "fir-dbconnecting-project.firebasestorage.app",
    messagingSenderId: "806288037508",
    appId: "1:806288037508:web:87d2f42e79d8c17f16d4d1"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref('todos');

const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

let todos = {};

// Firebase에서 실시간 데이터 수신
db.on('value', (snapshot) => {
    todos = snapshot.val() || {};
    renderTodos();
});

function renderTodos() {
    todoList.innerHTML = '';
    const keys = Object.keys(todos);

    keys.forEach((key) => {
        const todo = todos[key];
        const li = document.createElement('li');
        li.className = 'todo-item' + (todo.completed ? ' completed' : '');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', () => toggleComplete(key));

        const span = document.createElement('span');
        span.className = 'todo-text';
        span.textContent = todo.text;

        const btnGroup = document.createElement('div');
        btnGroup.className = 'btn-group';

        const editBtn = document.createElement('button');
        editBtn.className = 'btn-edit';
        editBtn.textContent = '수정';
        editBtn.addEventListener('click', () => startEdit(key));

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn-delete';
        deleteBtn.textContent = '삭제';
        deleteBtn.addEventListener('click', () => deleteTodo(key));

        btnGroup.appendChild(editBtn);
        btnGroup.appendChild(deleteBtn);

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(btnGroup);
        todoList.appendChild(li);
    });
}

function addTodo() {
    const text = todoInput.value.trim();
    if (!text) return;
    db.push({ text, completed: false });
    todoInput.value = '';
    todoInput.focus();
}

function deleteTodo(key) {
    db.child(key).remove();
}

function toggleComplete(key) {
    db.child(key).update({ completed: !todos[key].completed });
}

function startEdit(key) {
    const keys = Object.keys(todos);
    const index = keys.indexOf(key);
    const li = todoList.children[index];
    const span = li.querySelector('.todo-text');
    const btnGroup = li.querySelector('.btn-group');

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'edit-input';
    input.value = todos[key].text;

    const saveBtn = document.createElement('button');
    saveBtn.className = 'btn-save';
    saveBtn.textContent = '저장';

    function save() {
        const newText = input.value.trim();
        if (newText) {
            db.child(key).update({ text: newText });
        } else {
            renderTodos();
        }
    }

    saveBtn.addEventListener('click', save);
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') save();
        if (e.key === 'Escape') renderTodos();
    });

    span.replaceWith(input);
    btnGroup.innerHTML = '';
    btnGroup.appendChild(saveBtn);
    input.focus();
    input.select();
}

addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addTodo();
});
