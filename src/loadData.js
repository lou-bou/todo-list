import { createProjectObject } from "./index.js";
import { createProjectDOM } from "./projectDOM";

const projectIDs = Object.keys(localStorage);

projectIDs.forEach((projectID) => {
    let project = JSON.parse(localStorage.getItem(projectID));
    createProjectObject(project.title, project.description);
});

console.log(localStorage);