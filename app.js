document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');

    const getTasks = () => JSON.parse(localStorage.getItem('tasks')) || [];

    const saveTasks = (tasks) => localStorage.setItem('tasks', JSON.stringify(tasks));

    const renderTasks = () => {
        taskList.innerHTML = '';
        const tasks = getTasks();
        tasks.forEach(({ id, content, completed }) => {
            const taskItem = document.createElement('li');
            taskItem.className = completed ? 'completed' : '';
            taskItem.innerHTML = `
                <span contenteditable="true" onblur="updateTaskContent(${id}, this.innerText)">${content}</span>
                <div>
                    <button class="complete-btn" onclick="completeTask(${id})">Complete</button>
                    <button class="edit-btn" onclick="editTask(${id})">Edit</button>
                    <button class="delete-btn" onclick="deleteTask(${id})">Delete</button>
                </div>
            `;
            taskList.appendChild(taskItem);
        });
    };

    window.addTask = (content) => {
        const tasks = getTasks();
        const id = new Date().getTime();
        tasks.push({ id, content, completed: false });
        saveTasks(tasks);
        renderTasks();
    };

    window.completeTask = (id) => {
        const tasks = getTasks();
        const task = tasks.find(task => task.id === id);
        const confirmComplete = confirm('Task completed! Do you want to delete it?');
        if (confirmComplete) {
            deleteTask(id);
        } else {
            task.completed = true;
            saveTasks(tasks);
            renderTasks();
        }
    };

    window.editTask = (id) => {
        const tasks = getTasks();
        const task = tasks.find(task => task.id === id);
        const newContent = prompt('Edit your task', task.content);
        if (newContent) {
            task.content = newContent;
            saveTasks(tasks);
            renderTasks();
            alert('Edit successfully completed');
        }
    };

    window.updateTaskContent = (id, content) => {
        const tasks = getTasks();
        const task = tasks.find(task => task.id === id);
        task.content = content;
        saveTasks(tasks);
        renderTasks();
    };

    window.deleteTask = (id) => {
        const tasks = getTasks().filter(task => task.id !== id);
        saveTasks(tasks);
        renderTasks();
    };

    addTaskBtn.addEventListener('click', () => {
        const content = taskInput.value.trim();
        if (content) {
            addTask(content);
            taskInput.value = '';
        }
    });

    renderTasks();
});
