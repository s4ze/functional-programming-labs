document.addEventListener('DOMContentLoaded', () => {
    let tasks = [];

    const renderTasks = (tasksToRender) => {
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';
        tasksToRender.forEach(task => {
            const li = document.createElement('li');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.onclick = (e) => {
                e.stopPropagation();
                tasks = tasks.map(t => t === task ? {...t, completed: !t.completed} : t);
                renderTasks(tasks);
            };

            const taskText = document.createElement('span');
            taskText.textContent = task.text;
            taskText.className = task.completed ? 'completed' : '';

            li.appendChild(checkbox);
            li.appendChild(taskText);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Удалить';
            deleteButton.onclick = (e) => {
                e.stopPropagation(); 
                tasks = tasks.filter(t => t !== task);
                renderTasks(tasks);
            };

            li.appendChild(deleteButton);
            taskList.appendChild(li);
        });
    };

    const addTask = (text) => {
        tasks = [...tasks, { text, completed: false }];
        renderTasks(tasks);
    };

    document.getElementById('add-task').onclick = () => {
        const newTaskInput = document.getElementById('new-task');
        const text = newTaskInput.value.trim();
        if (text) {
            addTask(text);
            newTaskInput.value = '';
        }
    };

    document.getElementById('filter-all').onclick = () => renderTasks(tasks);
    document.getElementById('filter-active').onclick = () => renderTasks(tasks.filter(task => !task.completed));
    document.getElementById('filter-completed').onclick = () => renderTasks(tasks.filter(task => task.completed));
});
