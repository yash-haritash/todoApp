let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];

const addButton = document.getElementById('add');

const addTask = ()=>{
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({text:text, completed: false});
        updateTaskList();
        taskInput.value = '';
    }
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

const updateStats = ()=>{
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progress = completedTasks / totalTasks * 100;
    const progressBar = document.querySelector('#progress');
    progressBar.style.width = `${progress}%`;
    const numbers = document.querySelector('#numbers');
    numbers.innerHTML = `
        <p>${completedTasks} / ${totalTasks}</p>
    `;
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

    updateStats();
    
    localStorage.setItem('tasks', JSON.stringify(tasks));

}
addButton.addEventListener('click', (e) => {
    e.preventDefault();
    addTask();
}
);

updateTaskList();
