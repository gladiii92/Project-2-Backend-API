require('dotenv').config();

let express = require('express');
let app = express();


app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});


app.use('/public', express.static(__dirname + '/public'));


app.get('/', function(req, res) {
  const absolutePath = __dirname + '/views/index.html';
  res.sendFile(absolutePath);    
});

app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE === "uppercase")
    res.json({
      message: "Hello json".toUpperCase()
    });
  else
    res.json({
      message: "Hello json"
    });
});

app.get('/now', 
  function(req, res, next){
    req.time = new Date().toString();
    next();
  },
  function(req,res){
    res.json({time: req.time})
  }
);

app.get('/:word/echo', function(req, res){
  let word = req.params.word;
  res.json({ echo: word});
})



console.log("Hello World");

module.exports = app;
