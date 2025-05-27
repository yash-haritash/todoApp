let tasks = []

const addButton = document.getElementById('add');

const addTask = ()=>{
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({text:text, completed: false});
        updateTaskList();
        taskInput.value = '';
    }
    console.log(tasks);
}

const toggleCompleteTask = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
}

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTaskList();
}

const editTask = (index) => {
    const taskInput = document.getElementById('taskInput');
    taskInput.value = tasks[index].text;
    tasks.splice(index, 1);
    updateTaskList();
}

const updateTaskList = () => {
    const taskList = document.querySelector('.task-list');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="taskItem ${task.completed ? 'completed' : ''}">
                <div class="task">
                    <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}/>
                    <p>${task.text}</p>
                </div>
                <div class="icons">
                    <img src="./img/edit.png" onclick="editTask(${index})">
                    <img src="./img/bin.png" onclick="deleteTask(${index})">
                </div>
            </div>
        `;
        li.addEventListener('change', () => toggleCompleteTask(index));
        taskList.append(li);
    });

}
addButton.addEventListener('click', (e) => {
    e.preventDefault();
    addTask();
}
);
