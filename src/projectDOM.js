import { createProjectObject, defaultProject } from "./index.js";
import { createTodoDOM } from "./todoDOM.js";

const createDefaultProjectDOM = (function() { // should probably find a way to not rewrite all the code thats in createProjectDOM here
    const projectsContainer = document.querySelector("#projects");
    const projectContainer = document.createElement("div");
    projectContainer.setAttribute("class", "project-container");

    projectsContainer.appendChild(projectContainer);

    const projectTitle = document.createElement("button");
    projectTitle.textContent = "Default";

    const projectDescription = document.createElement("p");
    projectDescription.textContent = "The default project that contains all todos.";

    projectContainer.appendChild(projectTitle);
    projectContainer.appendChild(projectDescription);

    projectTitle.addEventListener("click", () => {
        const todosContainer = document.querySelector("#todos");
        todosContainer.innerHTML = "";
        
        currentProject = defaultProject;

        if (defaultProject.todos) {
            defaultProject.todos.forEach((todoObject) => {
                createTodoDOM(todoObject, todoObject.title, todoObject.description, todoObject.dueDate, todoObject.priority, todoObject.notes);
            });
        }
        
    });
})();

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

export let currentProject;

export function createProjectDOM(projectObject, title, description) {
    const projectsContainer = document.querySelector("#projects");
    const projectContainer = document.createElement("div");
    projectContainer.setAttribute("data-project-id", `${projectObject.id}`);
    projectContainer.setAttribute("class", "project-container");

    projectsContainer.appendChild(projectContainer);

    const projectTitle = document.createElement("button");
    projectTitle.textContent = title;

    const projectDescription = document.createElement("p");
    projectDescription.textContent = description;

    const projectEdit = document.createElement("button");
    projectEdit.textContent = "Edit Project";

    const projectDelete = document.createElement("button");
    projectDelete.textContent = "Delete Project";

    projectContainer.appendChild(projectTitle);
    projectContainer.appendChild(projectDescription);
    projectContainer.appendChild(projectEdit);
    projectContainer.appendChild(projectDelete);

    projectTitle.addEventListener("click", () => {
        const todosContainer = document.querySelector("#todos");
        todosContainer.innerHTML = "";

        currentProject = projectObject;

        if (projectObject.todos) {
            projectObject.todos.forEach((todoObject) => {
                createTodoDOM(todoObject, todoObject.title, todoObject.description, todoObject.dueDate, todoObject.priority, todoObject.notes);
            });
        }
        
    });

    projectEdit.addEventListener("click", () => {
        prepareEditForm(projectTitle.textContent, projectDescription.textContent);
        projectEditDialog.showModal();
    });

    cancelEditProjectButton.addEventListener("click", () => {
        projectEditDialog.close();
    });

    submitEditProjectButton.addEventListener("click", () => {
        let newTitle = projectEditForm.projectTitle.value;
        let newDescription = projectEditForm.projectDescription.value;

        if (newTitle) {
            projectObject.update(newTitle, newDescription);

            projectTitle.textContent = newTitle;
            projectDescription.textContent = newDescription;
        }
    });

    projectDelete.addEventListener("click", () => {
        projectsContainer.removeChild(projectContainer);
        projectObject.delete();
    });
}

function prepareEditForm(currentTitle, currentDescription) {
    const newTitleInput = document.querySelector("#new-projectTitle");
    newTitleInput.setAttribute("value", currentTitle);

    const newDescriptionInput = document.querySelector("#new-projectDescription");
    newDescriptionInput.setAttribute("value", currentDescription);
}