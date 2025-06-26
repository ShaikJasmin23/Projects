let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let history = JSON.parse(localStorage.getItem("history")) || [];

function saveData() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("history", JSON.stringify(history));
}

function addTask() {
  const title = document.getElementById("taskTitle").value.trim();
  const priority = document.getElementById("taskPriority").value;
  const dueDate = document.getElementById("taskDueDate").value;

  if (!title) {
    alert("Task title cannot be empty.");
    return;
  }

  tasks.push({ title, priority, dueDate, completed: false });
  saveData();
  document.getElementById("taskTitle").value = "";
  renderTasks();
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  if (tasks.length === 0) {
    list.innerHTML = "<li><em>No current tasks.</em></li>";
    return;
  }

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${index + 1}. ${task.completed ? "✔️ " : ""}<strong>${task.title}</strong> 
      [${task.priority}] ${task.dueDate ? "📅 " + task.dueDate : ""} 
      <br>
      <button onclick="toggleComplete(${index})">${task.completed ? "Undo" : "Mark Completed"}</button>
      <button onclick="deleteTask(${index})">Delete</button>
    `;
    list.appendChild(li);
  });
}

function renderHistory() {
  const list = document.getElementById("historyList");
  list.innerHTML = "";

  if (history.length === 0) {
    list.innerHTML = "<li><em>No deleted tasks.</em></li>";
    return;
  }

  history.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${index + 1}. <strong>${task.title}</strong> [${task.priority}]
      <br>
      <button onclick="restoreTask(${index})">Restore</button>
    `;
    list.appendChild(li);
  });

  document.getElementById("historySection").style.display = "block";
}

function deleteTask(index) {
  const deleted = tasks.splice(index, 1)[0];
  history.unshift(deleted);
  saveData();
  renderTasks();
}

function restoreTask(index) {
  const restored = history.splice(index, 1)[0];
  tasks.push(restored);
  saveData();
  renderTasks();
  renderHistory();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveData();
  renderTasks();
}

function openOptions() {
  let running = true;
  while (running) {
    const choice = prompt(
      "📋 Options Menu:\n\n" +
      "1. View Tasks\n" +
      "2. Delete Task\n" +
      "3. View Deleted Tasks\n" +
      "4. Restore a Task\n" +
      "5. Exit\n\n" +
      "Enter your choice (1–5):"
    );

    switch (choice) {
      case "1":
        renderTasks();
        break;
      case "2":
        if (tasks.length === 0) return alert("No tasks to delete.");
        const del = prompt("Enter task number to delete:");
        const delIndex = parseInt(del) - 1;
        if (tasks[delIndex]) {
          deleteTask(delIndex);
          alert("Task deleted.");
        }
        break;
      case "3":
        renderHistory();
        document.getElementById("historySection").scrollIntoView();
        break;
      case "4":
        if (history.length === 0) return alert("No deleted tasks.");
        const res = prompt("Enter deleted task number to restore:");
        const resIndex = parseInt(res) - 1;
        if (history[resIndex]) {
          restoreTask(resIndex);
          alert("Task restored.");
        }
        break;
      case "5":
        running = false;
        break;
      default:
        alert("Invalid input. Please enter 1–5.");
    }
  }
}

window.onload = () => {
  renderTasks();
  renderHistory();
};











function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  const filter = document.getElementById("priorityFilter").value;
  const filteredTasks = filter === "All" ? tasks : tasks.filter(t => t.priority === filter);

  if (filteredTasks.length === 0) {
    list.innerHTML = "<li><em>No tasks found.</em></li>";
    return;
  }

  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");

    // Countdown logic
    let countdown = "";
    if (task.dueDate) {
      const daysLeft = Math.ceil((new Date(task.dueDate) - new Date()) / (1000 * 60 * 60 * 24));
      countdown = daysLeft >= 0 ? `⏳ ${daysLeft} day(s) left` : "❗ Overdue";
    }

    li.innerHTML = `
      ${task.completed ? "✔️ " : ""}<strong>${task.title}</strong> 
      [${task.priority}] ${task.dueDate ? "📅 " + task.dueDate : ""} 
      ${countdown ? "<br>" + countdown : ""}
      <br>
      <button onclick="toggleComplete(${index})">${task.completed ? "Undo" : "Mark Completed"}</button>
      <button onclick="deleteTask(${index})">Delete</button>
    `;

    list.appendChild(li);
  });
}

