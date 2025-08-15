import { format } from "date-fns";
import "./todoDOM.js";
import "./projectDOM.js";
import "./loadData.js";
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

export function createProjectObject(title, description) {
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
    check; // boolean (flase for unchecked and true for checked)

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

export let defaultProject = new Project("Default", "The default project");
defaultProject.id = "defaultProject";
localStorage.setItem(defaultProject.id, JSON.stringify(defaultProject));