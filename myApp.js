require('dotenv').config();

let express = require('express');
let app = express();
let bodyParser = require('body-parser');


app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});


app.use('/public', express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false}));

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

app.get('/name', function(req, res){
  const first = req.query.first;
  const last = req.query.last;
  res.json({ name: `${first} ${last}` });
});

app.get('/:word/echo', function(req, res){
  let word = req.params.word;
  res.json({ echo: word});
})

app.post('/name', function(req,res){
  const first = req.body.first;
  const last = req.body.last;
  res.json({ name: `${first} ${last}` });
});



console.log("Hello World");

module.exports = app;
