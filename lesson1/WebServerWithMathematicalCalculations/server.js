const express = require('express');
const app = express();

app.get("/calculate", (req, res) => {
    const { mum1, num2, op } = req.params;
    res.status(200).json(calculator(num1, num2, op));
})

function calculator(num1, num2, operation) {
    switch (operation) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            return num1 / num2;
        default:
            return "invalid operation"
    }
}