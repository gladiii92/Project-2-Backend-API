require('dotenv').config();

let express = require('express');
let app = express();

// ✅ Root-Level Middleware zuerst
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// ✅ static middleware als nächstes
app.use('/public', express.static(__dirname + '/public'));

// ✅ dann die Routen
app.get('/', function(req, res) {
  const absolutePath = __dirname + '/views/index.html';
  res.sendFile(absolutePath);    
});

app.get("/json", (req, res) => {
  let response = "Hello json";
  if (process.env.MESSAGE_STYLE === "uppercase") {
    response = response.toUpperCase();
  }
  res.json({ "message": response });
});

console.log("Hello World");

module.exports = app;
