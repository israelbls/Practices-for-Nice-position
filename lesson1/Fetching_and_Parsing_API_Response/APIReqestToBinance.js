const prompt = require("prompt-sync")({ sigint: true });
const symbol = prompt("enter a valid symbol or press ENTER");

function getSymbolPrice(symbol) {
    if (!symbol) symbol = "BTCUSDT";
    fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`)
        .then(response => response.json())
        .then(data => console.log(`Symbol ${data.symbol} - Price ${data.price}`))
        .catch(err => console.error(err))
}

getSymbolPrice(symbol);

