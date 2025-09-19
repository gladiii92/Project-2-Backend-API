require('dotenv').config()

let express = require('express');
let app = express();

app.get('/', function(req, res) {
    const absolutePath = __dirname + '/views/index.html';
    res.sendFile(absolutePath);    
});

app.get('/json',(req,res)=>{
  let response="Hello json";

  if(process.env.MESSAGE_STYLE==='uppercase'){
    response = response.toUpperCase();
  }
  
  res.json({ message: response});
  
});

app.use('/public', express.static(__dirname + '/public'))

console.log("Hello World");


































module.exports = app;
