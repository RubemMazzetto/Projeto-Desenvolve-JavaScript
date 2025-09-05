let tasks = [];

const addTask = (description) => {
  if (!description.trim()) {
    alert("A descrição da tarefa não pode estar vazia");
    return;
  }
  tasks.push({ description, status: false });
  renderTasks();
};

const toggleTaskStatus = (index) => {
  tasks[index].status = !tasks[index].status;
  renderTasks();
};

const renderTasks = () => {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `flex items-center p-2 rounded ${
      task.status ? "bg-green-100 line-through text-gray-500" : "bg-gray-50"
    }`;
    
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.status;
    checkbox.className = "mr-2";
    checkbox.addEventListener("change", () => toggleTaskStatus(index));
    
    const description = document.createElement("span");
    description.textContent = task.description;
    
    li.appendChild(checkbox);
    li.appendChild(description);
    taskList.appendChild(li);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const addTaskButton = document.getElementById("addTaskButton");
  
  addTaskButton.addEventListener("click", () => {
    addTask(taskInput.value);
    taskInput.value = "";
  });
  
  taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addTask(taskInput.value);
      taskInput.value = "";
    }
  });
});