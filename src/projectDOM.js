const addProjectButton = document.querySelector(".add-project");
const submitProjectButton = document.querySelector("#project-dialog .submit");
const cancelProjectButton = document.querySelector("#project-dialog .cancel");
const projectDialog = document.querySelector("#project-dialog");
const projectForm = document.querySelector("#project-form");

addProjectButton.addEventListener("click", () => {
    projectDialog.showModal();
});

cancelProjectButton.addEventListener("click", () => {
    projectDialog.close();
});

submitProjectButton.addEventListener("click", () => {
    let title = projectForm.projectTitle.value;
    let description = projectForm.projectDescription.value;
});