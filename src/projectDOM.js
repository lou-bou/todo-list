import { createProjectObject } from "./index.js";

const addProjectButton = document.querySelector(".add-project");
const submitProjectButton = document.querySelector("#project-dialog .submit");
const cancelProjectButton = document.querySelector("#project-dialog .cancel");
const projectDialog = document.querySelector("#project-dialog");
const projectForm = document.querySelector("#project-form");

const submitEditProjectButton = document.querySelector("#project-edit-form .edit");
const cancelEditProjectButton = document.querySelector("#project-edit-form .cancel");
const projectEditDialog = document.querySelector("#project-edit-dialog");
const projectEditForm = document.querySelector("#project-edit-form");

addProjectButton.addEventListener("click", () => {
    projectDialog.showModal();
});

cancelProjectButton.addEventListener("click", () => {
    projectDialog.close();
});

submitProjectButton.addEventListener("click", () => {
    let title = projectForm.projectTitle.value;
    let description = projectForm.projectDescription.value;

    if (title) {
        let projectObject = createProjectObject(title, description);
        createProjectDOM(projectObject, title, description);
    }
});

function createProjectDOM(projectObject, title, description) {
    const projectsContainer = document.querySelector("#projects");
    const projectContainer = document.createElement("div");
    projectContainer.setAttribute("data-project-id", `${projectObject.id}`);
    projectContainer.setAttribute("class", "project-container");

    projectsContainer.appendChild(projectContainer);

    const projectTitle = document.createElement("p");
    projectTitle.textContent = title;

    const projectDescription = document.createElement("p");
    projectDescription.textContent = description;

    const projectEdit = document.createElement("button");
    projectEdit.textContent = "Edit Project";

    projectContainer.appendChild(projectTitle);
    projectContainer.appendChild(projectDescription);
    projectContainer.appendChild(projectEdit);

    projectEdit.addEventListener("click", () => {
        projectEditDialog.showModal();
    });

    cancelEditProjectButton.addEventListener("click", () => {
        projectEditDialog.close();
    });
}