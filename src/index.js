import { format } from "date-fns";
import "./todoDOM.js";
import "./projectDOM.js";
import "./general.css";
import "./projects.css";
import "./todos.css";

class Project {
    id;
    type;
    todos; // string
    title; // string
    description; // string

    constructor(title, description) {
        this.id = crypto.randomUUID();
        this.type = "project";
        this.title = title;
        this.description = description;
        this.todos = [];
    }

    update(title, description) {
        this.title = title;
        this.description = description;
    }

    delete() {
        // probably delete it from localStorage
    }

    addTodo(todo) {
        this.todos.push(todo);
    }

    deleteTodo(todo) {
        this.todos.splice(this.todos.indexOf(todo), 1);
    }
}

export function createProjectObject(title, description) { // only used for new projects, not loading projects in localStorage
    let newProject = new Project(title, description);
    localStorage.setItem(newProject.id, JSON.stringify(newProject));
    return newProject;
}

class Todo {
    id;
    type;
    title; // string
    description; // string
    dueDate; // string (formatted date)
    priority; // string ("High", "Medium" or "Low")
    notes; // string
    check; // boolean (false for unchecked and true for checked)

    constructor(title, description, dueDate, priority, notes) {
        this.id = crypto.randomUUID();
        this.type = "todo";
        this.title = title;
        this.description = description;
        this.dueDate = dueDate; // use format(new Date(XXXX, YY, ZZ), "MM/dd/yyyy")
        this.priority = priority;
        this.notes = notes;
        this.check = false;
    }

    update(title, description, dueDate, priority, notes) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
    }

    delete() {
        defaultProject.deleteTodo(this);
        // probably delete it from localStorage
    }
}

export function createTodoObject(project, title, description, dueDate, priority, notes) {
    let newTodo = new Todo(title, description, dueDate, priority, notes);

    defaultProject.addTodo(newTodo);
    localStorage.removeItem(defaultProject.id);
    localStorage.setItem(defaultProject.id, JSON.stringify(defaultProject));

    if (project && project != defaultProject) {
        project.addTodo(newTodo);
        localStorage.removeItem(project.id);
        localStorage.setItem(project.id, JSON.stringify(project));
    }
    
    return newTodo;
}

import { createDefaultProjectDOM } from "./projectDOM.js";

let defaultProject = new Project("Default", "The default project that contains all todos.");
defaultProject.id = "defaultProject";
if (!localStorage.getItem(defaultProject.id)) {
    localStorage.setItem(defaultProject.id, JSON.stringify(defaultProject));
}

createDefaultProjectDOM(defaultProject);

// Loading data from localStorage. Using this in a different module and importing necessary functions/vars causes a circular dependency problem, and the only solution I found to this is putting everything related to loading data from localStorage in this module.
// This data is loaded when the site is loaded.

import { createProjectDOM } from "./projectDOM.js";
import { createTodoDOM } from "./todoDOM.js";

const projectIDs = Object.keys(localStorage);

projectIDs.forEach((projectID) => {
    let projectData = JSON.parse(localStorage.getItem(projectID));
    let projectObject;

    if (projectID != "defaultProject") {
        projectObject = new Project(projectData.title, projectData.description);
        projectObject.id = projectData.id; // since creating the object creates a new id for it, i reset that id to the original id of the project object when it was first created
        createProjectDOM(projectObject, projectObject.title, projectObject.description);
    } else {
        projectObject = defaultProject;
    }

    projectData.todos.forEach((todo) => {
        let todoObject = new Todo(todo.title, todo.description, todo.dueDate, todo.priority, todo.notes);
        projectObject.addTodo(todoObject);
        createTodoDOM(todoObject, todoObject.title, todoObject.description, todoObject.dueDate, todoObject.priority, todoObject.notes);
    })

    console.log(projectData);
    console.log(projectObject);

    console.log("\n");
});

console.log(localStorage);