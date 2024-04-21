document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Function to render tasks
    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span class="${task.completed ? 'completed' : ''}">${task.name}</span>
                <div>
                    <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
                    <button onclick="toggleCompleted(${index})">${task.completed ? 'Mark Uncompleted' : 'Mark Completed'}</button>
                </div>
            `;
            taskList.appendChild(li);
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Add Task
    addTaskBtn.addEventListener("click", function() {
        const taskName = taskInput.value.trim();
        if (taskName !== "") {
            tasks.push({ name: taskName, completed: false });
            renderTasks();
            taskInput.value = "";
        }
    });

    // Delete Task
    window.deleteTask = function(index) {
        tasks.splice(index, 1);
        renderTasks();
    };

    // Toggle Completed
    window.toggleCompleted = function(index) {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    };

    // Initial render
    renderTasks();
});
