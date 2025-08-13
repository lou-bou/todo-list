// Problem:
/* 
Creation form data is saved even after submit, to solve this set the value attributes of all input elements to ""

Same problem in projectDOM.js
*/

import { createTodoObject } from "./index.js";

const addTodoButton = document.querySelector(".add-todo");
const submitTodoButton = document.querySelector("#todo-form .submit");
const cancelTodoButton = document.querySelector("#todo-form .cancel");
const todoDialog = document.querySelector("#todo-dialog");
export const todoForm = document.querySelector("#todo-form");

const submitEditTodoButton = document.querySelector("#todo-edit-form .edit");
const cancelEditTodoButton = document.querySelector("#todo-edit-form .cancel");
const todoEditDialog = document.querySelector("#todo-edit-dialog");
const todoEditForm = document.querySelector("#todo-edit-form");


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

    let priority;
    if (document.querySelector("#low").checked) {
        priority = "Low";
    } else if (document.querySelector("#medium").checked) {
        priority = "Medium";
    } else if (document.querySelector("#high").checked) {
        priority = "High";
    } else {
        priority = null; // this will be deleted later when i apply form validiations
    }

    let notes = todoForm.notes.value;

    if (title && dueDate && priority) {
        console.log(title);
        let todoObject = createTodoObject(title, description, dueDate, priority, notes);
        createTodoDOM(todoObject, title, description, dueDate, priority, notes);
    }
});

const createTodoDOM = (todoObject, title, description, dueDate, priority, notes) => {
    const todosContainer = document.querySelector("#todos");
    const todoContainer = document.createElement("div");
    todoContainer.setAttribute("data-todo-id", `${todoObject.id}`);
    todoContainer.setAttribute("class", "todo-container");

    todosContainer.appendChild(todoContainer);

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

    const todoStatus = document.createElement("input"); // not yet styled. this should be next to the todo title or something.
    todoStatus.setAttribute("type", "checkbox");
    todoStatus.setAttribute("id", "todoStatus");
    todoStatus.setAttribute("name", "todoStatus");

    const todoEdit = document.createElement("button");
    todoEdit.setAttribute("class", "edit-todo");
    todoEdit.textContent = "Edit Todo";

    const todoDelete = document.createElement("button");
    todoEdit.setAttribute("class", "delete-todo");
    todoDelete.textContent = "Delete Todo";

    todoContainer.appendChild(todoTitle);
    todoContainer.appendChild(todoDescription);
    todoContainer.appendChild(todoDueDate);
    todoContainer.appendChild(todoPriority);
    todoContainer.appendChild(todoNotes);
    todoContainer.appendChild(todoStatus);
    todoContainer.appendChild(todoEdit);
    todoContainer.appendChild(todoDelete);

    todoStatus.addEventListener("click", () => {
        changeStatus(todoStatus, todoObject); // this controls the application logic (changing todo object check bool value). this should be in index.js but i couldn't figure out how to do it.
    });

    todoEdit.addEventListener("click", () => {
        prepareEditForm(todoTitle.textContent, todoDescription.textContent, todoDueDate.textContent, todoNotes.textContent);
        todoEditDialog.showModal();
    });

    cancelEditTodoButton.addEventListener("click", () => {
        todoEditDialog.close();
    });

    submitEditTodoButton.addEventListener("click", () => {
        let newTitle = todoEditForm.title.value;
        let newDescription = todoEditForm.description.value;
        let newDueDate = todoEditForm.dueDate.value;
        
        let newPriority;
        if (document.querySelector("#new-low").checked) {
            newPriority = "Low";
        } else if (document.querySelector("#new-medium").checked) {
            newPriority = "Medium";
        } else if (document.querySelector("#new-high").checked) {
            newPriority = "High";
        } else {
            newPriority = null;
        }

        let newNotes = todoEditForm.notes.value;

        if (newTitle && newDueDate && newPriority) {
            todoObject.update(newTitle, newDescription, newDueDate, newPriority, newNotes);

            todoTitle.textContent = newTitle;
            todoDescription.textContent = newDescription;
            todoDueDate.textContent = newDueDate;
            todoPriority.textContent = newPriority;
            todoNotes.textContent = newNotes;
        }
    });

    todoDelete.addEventListener("click", () => {
        todosContainer.removeChild(todoContainer);
        todoObject.delete();
    });
};

const changeStatus = (todoStatusCheckbox, todoObject) => {
    if (todoStatusCheckbox.checked) {
        todoObject.check = true;
    } else {
        todoObject.check = false;
    }
    console.log(todoObject);
}

const prepareEditForm = (currentTitle, currentDescription, currentDueDate, currentNotes) => {
    const newTitleInput = document.querySelector("#todo-edit-form #new-title");
    newTitleInput.setAttribute("value", currentTitle);

    const newDescriptionInput = document.querySelector("#new-description");
    newDescriptionInput.setAttribute("value", currentDescription);

    const newDueDateInput = document.querySelector("#new-dueDate");
    newDueDateInput.setAttribute("value", currentDueDate);

    if (document.querySelector("#low").checked) {
        document.querySelector("#new-low").setAttribute("checked", "");
    } else if (document.querySelector("#medium").checked) {
        document.querySelector("#new-medium").setAttribute("checked", "");
    } else if (document.querySelector("#high").checked) {
        document.querySelector("#new-high").setAttribute("checked", "");
    }

    const newNotesInput = document.querySelector("#new-notes");
    newNotesInput.setAttribute("value", currentNotes);
}