const TASKS_KEY = "tasks";

const loadTasks = () => {
  const stored = localStorage.getItem(TASKS_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveTasks = (tasks) => {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};

const addTask = (description, tasks) => {
  if (!description.trim()) {
    alert("A descrição da tarefa não pode estar vazia");
    return false;
  }
  tasks.push({ description, status: false });
  saveTasks(tasks);
  renderTasks(tasks);
  return true;
};

const toggleTaskStatus = (index, tasks) => {
  tasks[index].status = !tasks[index].status;
  saveTasks(tasks);
  renderTasks(tasks);
};

const deleteTask = (index, tasks) => {
  tasks.splice(index, 1);
  saveTasks(tasks);
  renderTasks(tasks);
};

const renderTasks = (tasks) => {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `flex items-center justify-between p-2 rounded ${
      task.status ? "bg-green-100 line-through text-gray-500" : "bg-gray-50"
    }`;
    
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.status;
    checkbox.className = "mr-2";
    checkbox.addEventListener("change", () => toggleTaskStatus(index, tasks));
    
    const description = document.createElement("span");
    description.textContent = task.description;
    description.className = "flex-1";
    
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Excluir";
    deleteButton.className = "bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600";
    deleteButton.addEventListener("click", () => deleteTask(index, tasks));
    
    li.appendChild(checkbox);
    li.appendChild(description);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  const tasks = loadTasks();
  const taskInput = document.getElementById("taskInput");
  const addTaskButton = document.getElementById("addTaskButton");

  renderTasks(tasks);
  
  addTaskButton.addEventListener("click", () => {
    if (addTask(taskInput.value, tasks)) {
      taskInput.value = "";
    }
  });
  
  taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && addTask(taskInput.value, tasks)) {
      taskInput.value = "";
    }
  });
});