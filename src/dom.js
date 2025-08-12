import { createTodoObject } from "./index.js";

const addTodoButton = document.querySelector(".add-todo");
const submitTodoButton = document.querySelector("#todo-form .submit");
const cancelTodoButton = document.querySelector("#todo-form .cancel");
const todoDialog = document.querySelector("#todo-dialog");
export const todoForm = document.querySelector("#todo-form");

const todoDOM = (function () {
    addTodoButton.addEventListener("click", () => {
        todoDialog.showModal();
    });

    cancelTodoButton.addEventListener("click", () => {
        todoDialog.close();
    });

    submitTodoButton.addEventListener("click", () => {
        let title = todoForm.title.value;
        let description = todoForm.description.value;
        let dueDate = todoForm.dueDate.value;
        let priority = todoForm.priority.value;
        let notes = todoForm.notes.value;
        createTodoObject(title, description, dueDate, priority, notes);
        createTodoDOM(title, description, dueDate, priority, notes);
    });

    const createTodoDOM = (title, description, dueDate, priority, notes) => {
        const body = document.querySelector("body");
        const todoContainer = document.createElement("div");
        todoContainer.setAttribute("class", "todo-container");

        body.appendChild(todoContainer);

        const todoTitle = document.createElement("p");
        todoTitle.textContent = title;

        const todoDescription = document.createElement("p");
        todoDescription.textContent = description;

        const todoDueDate = document.createElement("p");
        todoDueDate.textContent = dueDate;

        const todoPriority = document.createElement("p");
        todoPriority.textContent = priority;

        const todoNotes = document.createElement("p");
        todoNotes.textContent = notes;

        const todoStatus = document.createElement("p");
        todoStatus.textContent = "unchecked"; // the default value of Todo.check is false | apply a check logic later, for now it's just text

        todoContainer.appendChild(todoTitle);
        todoContainer.appendChild(todoDescription);
        todoContainer.appendChild(todoDueDate);
        todoContainer.appendChild(todoPriority);
        todoContainer.appendChild(todoNotes);
    };
})();