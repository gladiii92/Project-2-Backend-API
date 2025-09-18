require('dotenv').config()

let express = require('express');
let app = express();

app.get('/', function(req, res) {
    const absolutePath = __dirname + '/views/index.html';
    res.sendFile(absolutePath);    
});

app.get('/json', function(req, res) {
  const message = process.env.MESSAGE_STYLE === "uppercase"
    ? "HELLO JSON"
    : "Hello json";
  res.send(`{"message": "${message}"}`);
});


app.use('/public', express.static(__dirname + '/public'))

console.log("Hello World");


































module.exports = app;
