export default class Task {
  constructor(text) {
    this.text = text;
  }

  createTask() {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task_container");
    taskElement.innerHTML = `<p>${this.text}</p>`;

    this.addEventListeners(taskElement);
    return taskElement;
  }

  addEventListeners(taskElement) {
    taskElement.addEventListener("mouseenter", () => {
      this.showCloseButton(taskElement);
    });

    taskElement.addEventListener("mouseleave", () => {
      this.hideCloseButton(taskElement);
    });

    taskElement.addEventListener("dragstart", this.onDragStart);
    taskElement.addEventListener("dragend", this.onDragEnd);
  }

  showCloseButton(taskElement) {
    const closeButton = document.createElement("button");
    closeButton.innerHTML = "&#x2717";
    closeButton.classList.add("close_button");

    closeButton.addEventListener("click", () => {
      this.removeTask(taskElement);
    });

    taskElement.appendChild(closeButton);
  }

  hideCloseButton(taskElement) {
    const closeButton = taskElement.querySelector(".close_button");
    if (closeButton) {
      closeButton.remove();
    }
  }

  onDragStart(e) {
    e.target.classList.add("dragging");
    setTimeout(() => (e.target.style.display = "none"), 0);
  }

  onDragEnd(e) {
    e.target.classList.remove("dragging");
    e.target.style.display = "block";
  }

  removeTask(taskElement) {
    taskElement.remove();
  }
}
