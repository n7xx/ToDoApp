// Assuming you have the following HTML structure:
// <input type="text" id="taskInput" placeholder="Enter task...">
// <button id="delete-btn">Add Task</button>
// <ul id="tasksList"></ul>

// Get references to the input field and button
let inputTask = document.getElementById("taskInput");
let btnAddTask = document.getElementById("delete-btn");
let tasksList = document.getElementById("tasksList");

// Load tasks from local storage (if any)
const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to save tasks to local storage
function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(savedTasks));
}

// Event listener for the "Add Task" button
function handleAddBtnClick(event) {
  event.preventDefault();

  if (inputTask.value === "") return; // Don't add empty tasks

  // Create a new list item (li) element
  let li = document.createElement("li");
  li.innerText = `${inputTask.value}.`; // Set the task text
  tasksList.appendChild(li); // Add the li to the ul

  // Create a delete button for each task
  let delBtn = document.createElement("button");
  delBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`; // Add trash icon
  delBtn.classList.add("delete-btn"); // Apply CSS class
  li.appendChild(delBtn); // Add the delete button to the li

  // Save the task to local storage
  savedTasks.push(inputTask.value);
  saveTasksToLocalStorage();

  // Clear the input field
  inputTask.value = "";
}

// Event listener for deleting tasks
tasksList.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-btn")) {
    // Remove the parent li when delete button is clicked
    const listItem = event.target.parentElement;
    const taskText = listItem.innerText;
    savedTasks.splice(savedTasks.indexOf(taskText), 1);
    saveTasksToLocalStorage();
    tasksList.removeChild(listItem);
  }
});

// Load saved tasks on page load
function loadSavedTasks() {
  savedTasks.forEach((task) => {
    let li = document.createElement("li");
    li.innerText = task;
    tasksList.appendChild(li);

    let delBtn = document.createElement("button");
    delBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    delBtn.classList.add("delete-btn");
    li.appendChild(delBtn);
  });
}

loadSavedTasks();
