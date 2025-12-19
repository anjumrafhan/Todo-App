document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let input = document.getElementById("taskInput");
    let task = input.value.trim();
    const taskDateTime = document.getElementById("taskDateTime").value;

    if (task === "") return alert("Please enter a task!");

    let tasks = getTasks();
    tasks.push({ text: task, completed: false });
    saveTasks(tasks);

    input.value = "";
    loadTasks();
}

function loadTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    let tasks = getTasks();

    tasks.forEach((task, index) => {
        let li = document.createElement("li");

        let span = document.createElement("span");
        span.textContent = task.text;
        if (task.completed) span.classList.add("completed");
        span.onclick = () => toggleTask(index);

        let btn = document.createElement("button");
        btn.textContent = "Delete";
        btn.className = "delete-btn";
        btn.onclick = () => deleteTask(index);

        li.appendChild(span);
        li.appendChild(btn);
        list.appendChild(li);
    });
}

function toggleTask(index) {
    let tasks = getTasks();
    tasks[index].completed = !tasks[index].completed;
    saveTasks(tasks);
    loadTasks();
}

function deleteTask(index) {
    let tasks = getTasks();
    tasks.splice(index, 1);
    saveTasks(tasks);
    loadTasks();
}

function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
