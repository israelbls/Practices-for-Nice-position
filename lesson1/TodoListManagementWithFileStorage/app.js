const fs = require('fs');

const args = process.argv.slice(2);
const command = args[0];
const parameter = args.length > 0 ? args[1] : null;

let tasks = [];

loadTasksFromFile();

function loadTasksFromFile() {
    try {
        const data = fs.readFileSync("tasks.json", "utf-8");
        tasks.push(...JSON.parse(data));
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log("No tasks file found, starting with an empty task list.");
        } else {
            console.error("Error reading tasks file:", error);
        }
    }
}

function updateTasks() {
    fs.writeFile("tasks.json", JSON.stringify(tasks), (error) => {
        console.error(error)
    });
}

function addTask(parameter) {
    tasks.push({ task: parameter, completed: false });
    updateTasks();
}

function deleteTask(parameter) {
    tasks = tasks.filter((element, index) => index != parameter);
    updateTasks();
}
function completeTask(parameter) {
    tasks = tasks.map((element, index) => {
        if (index == parameter) return { task: element.task, completed: true };
        return element;
    })
    updateTasks();
}
function displayTasks() {
    console.log("Tasks:");
    tasks().forEach((element, index) => {
        console.log(`${index}: ${element.task} - ${element.completed ? "Completed" : "Not Completed"}`);
    });
}

switch (command) {
    case "add":
        if (!parameter) {
            console.error("Please provide a task to add.");
            process.exit(1);
        }
        addTask(parameter);
        console.log(`Task added: ${parameter}`);
        break;
    case "delete":
        if (parameter === null || isNaN(parameter)) {
            console.error("Please provide a valid task index to delete.");
            process.exit(1);
        }
        deleteTask(parameter);
        console.log(`Task deleted: ${parameter}`);
        break;
    case "complete":
        if (parameter === null || isNaN(parameter)) {
            console.error("Please provide a valid task index to complete.");
            process.exit(1);
        }
        completeTask(parameter);
        console.log(`Task completed: ${parameter}`);
        break;
    case "display":
        displayTasks();
        break;
    default:
        console.error("Unknown command.");
        process.exit(1);
}