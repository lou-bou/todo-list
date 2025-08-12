import { format } from "date-fns";
import "./dom.js";

class Project {
    todos; // string
    title; // string
    description; // string

    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.todos = [];
    }

    addTodo(todo) {
        this.todos.push(todo);
    }
}

class Todo {
    title; // string
    description; // string
    dueDate; // string (formatted date)
    priority; // string ("High", "Medium" or "Low")
    notes; // string
    check; // boolean (flase for unchecked and true for checked)

    constructor(title, description, dueDate, priority, notes) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate; // use format(new Date(XXXX, YY, ZZ), "MM/dd/yyyy")
        this.priority = priority;
        this.notes = notes;
        this.check = false;
    }
}

let defaultProject = new Project("Default", "The default project");