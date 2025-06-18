const fs = require('fs');
const prompt = require("prompt-sync")({ sigint: true });

const path = prompt("enter the full path of the file");

function sumFile(path) {
    fs.readFile(path, "utf-8", (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        const lines = data.split("\n");
        const fileSum = lines.reduce((acc, line) => {
            const lineNumericValue = parseInt(line);
            if (isNaN(lineNumericValue)) {
                console.error("the file contains non numeric values");
                return;
            }
            return acc + lineNumericValue;
        }, 0)
        console.log(fileSum);
    })
}

sumFile(path);
