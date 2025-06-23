// Question number 1
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
delay(20000).then(() => console.log("Done!"))

const { error } = require("console");

// Question number 2
//const fs = require("fs");
async function printFileContent() {
    try {
        const path = "data.txt";
        if (!fs.existsSync) {
            console.log("File Not Found!");
            return;
        }
        const fileContent = await fs.readFileSync()
        console.log(fileContent)
    } catch (error) {
        console.error(error)
    }
}
printFileContent();

// Question number 3
const getRandom = new Promise(resolve => setTimeout(() => resolve(Math.floor(Math.random() * 11)), 50))
getRandom.then(num => console.log(num));

//3.1
const multiplyByThree = num => new Promise(resolve => setTimeout((num) => resolve(num * 3)), 50);
multiplyByThree(8).then(num => console.log(num));

// Question number 4
const checkEven = num => new Promise((resolve, reject) =>
    num % 2 === 0 ? resolve() : reject());
checkEven(4).then(() => console.log("even")).catch(() => console.log("odd"));

// Question number 5
Promise.all([fetch("https://jsonplaceholder.typicode.com/users/1 "),
fetch("https://jsonplaceholder.typicode.com/posts?userId=1")])
    .then((values) => console.log(values)).catch(error => console.log(error))

// Question number 6
const fs = require('fs/promises');

function printFile(filename) {
    fs.readFile(filename, 'utf8')
        .then(data => console.log(data.toUppercase())) //1. toUpperCase() instead of toUppercase() 
        .catch(console.log('An error occurred')); //2. a callback fn () => console.log(...)
}

printFile('example.txt');

// Question number 7
const fetch = require('node-fetch');

fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.json) // 1. response.json() with fn execution  
    .then(data => {
        console.log("Title:", data.title)
    })
    .catch(err => {
        console.log('Error:', err)
    });

// Question number 8

function asyncDivide(a, b) {
    return new Promise((resolve, reject) => {
        if (b === 0) {
            reject('Cannot divide by zero');
        }
        resolve(a / b);
    });
}

asyncDivide(10, 0)
    .then(result => console.log(result))
    .catch(error => console.log(error));
