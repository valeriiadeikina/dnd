import Task from "./Task.js";

const columns = document.querySelectorAll(".column");
const addCardBtns = document.querySelectorAll(".add-card-btn");

function loadBoardState() {
  const boardState = JSON.parse(localStorage.getItem("boardState")) || {
    column1: [],
    column2: [],
    column3: [],
  };
  Object.keys(boardState).forEach((columnId) => {
    const column = document.getElementById(columnId);
    const taskContainer = column.querySelector(".tasks");
    boardState[columnId].forEach((taskText) => {
      const task = createTask(taskText);
      taskContainer.appendChild(task);
    });
  });
}

function createTask(text) {
  const task = new Task(text);
  const taskElement = task.createTask();
  taskElement.setAttribute("draggable", true);
  return taskElement;
}

function saveBoardState() {
  const boardState = {};
  columns.forEach((column) => {
    const columnId = column.id;
    const taskElements = column.querySelectorAll(".task_container");
    boardState[columnId] = Array.from(taskElements).map(
      (taskElement) => taskElement.querySelector("p").innerText
    );
  });
  localStorage.setItem("boardState", JSON.stringify(boardState));
}

addCardBtns.forEach((button) => {
  button.addEventListener("click", (e) => {
    const columnId = e.target.closest(".column").id;
    const taskText = prompt("Введите текст задания");
    if (taskText) {
      const task = createTask(taskText, columnId);
      e.target.closest(".column").querySelector(".tasks").appendChild(task);
      saveBoardState();
    }
  });
});

columns.forEach((column) => {
  column.addEventListener("dragover", (e) => {
    e.preventDefault();
    column.classList.add("drag-over");
  });

  column.addEventListener("dragleave", () => {
    column.classList.remove("drag-over");
  });

  column.addEventListener("drop", (e) => {
    e.preventDefault();
    const draggingTask = document.querySelector(".dragging");
    const targetColumn = column.querySelector(".tasks");
    targetColumn.appendChild(draggingTask);
    column.classList.remove("drag-over");
    saveBoardState();
  });
});

loadBoardState();
