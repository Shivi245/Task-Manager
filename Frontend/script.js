const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

let tasks = [];

taskForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;

    const task = {
        id: Date.now(),
        title,
        description,
        status: "Pending"
    };

    tasks.push(task);
    renderTasks();
    taskForm.reset();
});

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const div = document.createElement("div");
        div.className = "task";
        if (task.status === "Completed") div.classList.add("completed");

        div.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <p><strong>Status:</strong> ${task.status}</p>
            <div class="task-actions">
                <button class="complete-btn" onclick="toggleStatus(${task.id})">
                    ${task.status === "Pending" ? "Mark Complete" : "Undo"}
                </button>
                <button class="delete-btn" onclick="deleteTask(${task.id})">
                    Delete
                </button>
            </div>
        `;
        taskList.appendChild(div);
    });
}

function toggleStatus(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.status = task.status === "Pending" ? "Completed" : "Pending";
        }
        return task;
    });
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}
