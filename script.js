let tasks = []

const addButton = document.getElementById('add');

const addTask = ()=>{
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({text:text, completed: false});
        updateTaskList();
    }
    console.log(tasks);
}

const updateTaskList = () => {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="taskItem {${task.completed ? 'completed' : ''}">
                <div class="task">
                    <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}/>
                    <p>${task.text}</p>
                </div>
                <div class="icons">
                    <img src="./img/edit.png" onclick="editTask(${index})">
                    <img src="./img/save.png" onclick="saveTask(${index})">
                </div>
            </div>
        `
        li.addEventListener('change', ()=> toggleComplete(index));
        taskList.append(li);
    });
}
addButton.addEventListener('click', (e) => {
    e.preventDefault();
    addTask();
}
);
