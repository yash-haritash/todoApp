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
    const completedTasks = tasks.filter(task => task.completed).length;
    if(tasks.length === completedTasks){
        blastConfetti();
    }
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

const blastConfetti = () => {
    const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
        Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
        })
    );
    }

    fire(0.25, {
    spread: 26,
    startVelocity: 55,
    });

    fire(0.2, {
    spread: 60,
    });

    fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    });

    fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    });

    fire(0.1, {
    spread: 120,
    startVelocity: 45,
});

}



// Dark Mode

const lightTheme = {
  '--background': '#ffffff',
  '--secondaryBackground': '#f0f0f0',
  '--text': '#000000',
  '--purple': '#6c63ff',
  '--teal': '#00d1b2'
};

const darkTheme = {
  '--background': '#000430',
  '--secondaryBackground': '#171c48',
  '--text': '#ffffff',
  '--purple': '#828dff',
  '--teal': '#24feee'
};

function applyTheme(theme) {
  const root = document.documentElement;
  for (const variable in theme) {
    root.style.setProperty(variable, theme[variable]);
  }
}

let darkMode = true;

document.getElementById('themeToggle').addEventListener('click', () => {
  darkMode = !darkMode;
  applyTheme(darkMode ? darkTheme : lightTheme);
});

