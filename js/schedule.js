document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("scheduleForm");
  const taskList = document.getElementById("taskList");

  const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem("petTasks")) || [];
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
      const card = document.createElement("div");
      card.className = "pet-card";
      card.innerHTML = `
        <h3>${task.name}</h3>
        <p>⏰ Time: ${task.time}</p>
        <p>📌 Type: ${task.type}</p>
        <button onclick="deleteTask(${index})" class="delete-btn">🗑 Remove</button>
      `;
      taskList.appendChild(card);
    });
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("taskName").value;
    const time = document.getElementById("taskTime").value;
    const type = document.getElementById("taskType").value;

    const tasks = JSON.parse(localStorage.getItem("petTasks")) || [];
    tasks.push({ name, time, type });
    localStorage.setItem("petTasks", JSON.stringify(tasks));
    form.reset();
    loadTasks();
  });

  window.deleteTask = (index) => {
    const tasks = JSON.parse(localStorage.getItem("petTasks")) || [];
    tasks.splice(index, 1);
    localStorage.setItem("petTasks", JSON.stringify(tasks));
    loadTasks();
  };

  loadTasks();
});
