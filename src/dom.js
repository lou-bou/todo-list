const addTodoButton = document.querySelector(".add-todo");
const submitTodoButton = document.querySelector("#todo-form .submit");
const cancelTodoButton = document.querySelector("#todo-form .cancel");
const todoDialog = document.querySelector("#todo-dialog");

addTodoButton.addEventListener("click", () => {
    todoDialog.showModal();
});

cancelTodoButton.addEventListener("click", () => {
    todoDialog.close();
});

