// To-Do List Functions
let tasks = [];
let completedTasks = [];
let totalTasks = 0;

function addTask() {
  const taskInput = document.getElementById("new-task-input");
  const prioritySelect = document.getElementById("task-priority");

  if (taskInput.value.trim() !== "") {
    const newTask = {
      name: taskInput.value,
      priority: prioritySelect.value,
      date: new Date(),
    };
    tasks.push(newTask);
    totalTasks++;
    renderTasks();
    taskInput.value = "";
    updateHabitChart(); // Add this line to update the chart
  }
}

function formatDate(date) {
  const options = { weekday: "short" };
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear().toString().slice(-2); // Get last two digits of the year
  const weekday = date.toLocaleDateString(undefined, options);
  return `${weekday}, ${day}/${month}/${year}`;
}

function completeTask(index) {
  completedTasks.push(tasks.splice(index, 1)[0]);
  renderTasks();
  renderCompletedTasks();
  updateHabitChart();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  totalTasks--;
  renderTasks();
  updateHabitChart();
}

function renderTasks() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");

    const priorityElement = document.createElement("div");
    priorityElement.classList.add("task-priority", task.priority);
    priorityElement.textContent = task.priority;

    const nameElement = document.createElement("div");
    nameElement.classList.add("task-name");
    nameElement.textContent = task.name;

    const dateElement = document.createElement("div");
    dateElement.classList.add("task-date");
    dateElement.textContent = formatDate(new Date(task.date));

    const actionsElement = document.createElement("div");
    actionsElement.classList.add("task-actions");

    const completeButton = document.createElement("button");
    completeButton.classList.add("complete-task");
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.onclick = () => completeTask(index);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-task");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.onclick = () => deleteTask(index);

    actionsElement.appendChild(completeButton);
    actionsElement.appendChild(deleteButton);

    taskElement.appendChild(priorityElement);
    taskElement.appendChild(nameElement);
    taskElement.appendChild(dateElement);
    taskElement.appendChild(actionsElement);

    taskList.appendChild(taskElement);
  });
}

function renderCompletedTasks() {
  const completedTaskList = document.getElementById("completed-task-list");
  completedTaskList.innerHTML = "";

  completedTasks.forEach((task) => {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");

    const priorityElement = document.createElement("div");
    priorityElement.classList.add("task-priority", task.priority);
    priorityElement.textContent = task.priority;

    const nameElement = document.createElement("div");
    nameElement.classList.add("task-name");
    nameElement.textContent = task.name;

    const dateElement = document.createElement("div");
    dateElement.classList.add("task-date");
    dateElement.textContent = formatDate(new Date(task.date));

    taskElement.appendChild(priorityElement);
    taskElement.appendChild(nameElement);
    taskElement.appendChild(dateElement);

    completedTaskList.appendChild(taskElement);
  });
}

function updateHabitChart() {
  const completedTasksCount = completedTasks.length;
  const pendingTasksCount = totalTasks - completedTasksCount;

  habitChart.data.datasets[0].data = [completedTasksCount, pendingTasksCount];
  habitChart.update();
}

// Clear completed tasks at midnight
function clearCompletedTasksAtMidnight() {
  const now = new Date();
  const millisTillMidnight =
    new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0) -
    now;
  setTimeout(() => {
    completedTasks = [];
    totalTasks = tasks.length;
    renderCompletedTasks();
    updateHabitChart();
    clearCompletedTasksAtMidnight(); // Reset the timeout for the next midnight
  }, millisTillMidnight);
}

// Call the function to set the initial timeout
clearCompletedTasksAtMidnight();

// Habit Progress Visualization
const habitData = {
  labels: ["Completed", "Pending"],
  datasets: [
    {
      label: "Task Completion",
      data: [0, 0], // Initial data
      backgroundColor: ["rgba(76, 175, 80, 0.5)", "rgba(255, 99, 132, 0.5)"],
      borderColor: ["rgba(76, 175, 80, 1)", "rgba(255, 99, 132, 1)"],
      borderWidth: 1,
    },
  ],
};

const ctx = document.getElementById("habitChart").getContext("2d");
const habitChart = new Chart(ctx, {
  type: "pie", // Changed from 'bar' to 'pie'
  data: habitData,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.raw;
            const total = context.chart._metasets[0].total;
            const percentage = ((value / total) * 100).toFixed(2);
            return `${label}: ${percentage}% (${value})`;
          },
        },
      },
    },
  },
});