const API_URL = "http://127.0.0.1:5000/tasks";
const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description })
    });

    taskForm.reset();
    loadTasks();
});

async function loadTasks() {
    const res = await fetch(API_URL);
    const tasks = await res.json();
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
                <button class="complete-btn" onclick="toggleStatus(${task.id}, '${task.status}')">
                    ${task.status === "Pending" ? "Mark Complete" : "Undo"}
                </button>
                <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        taskList.appendChild(div);
    });
}

async function toggleStatus(id, currentStatus) {
    const newStatus = currentStatus === "Pending" ? "Completed" : "Pending";

    await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
    });

    loadTasks();
}

async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    loadTasks();
}

loadTasks();
