const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static('static'));
app.use(bodyParser.json());

//Data
let users = [
  {
    name : 'Glodie',
    email : "glodie.tshimini@gmail.com",
    password : 'helloWorld2018'
  },
  {
    name : 'jean',
    email : "jean@gmail.com",
    password : 'Jean2018'
  },
  {
    name : 'paul',
    email : "paul@gmail.com",
    password : 'paul2018'
  }
];

/**
*@desc check if (email, password) from form check with users values
@param data object contains properties email && password
@return string the username or null
*/
function checkData(data){
  let userName = null;
  for (let i = 0; i < users.length; i++) {
    if(data.email == users[i].email && data.pwd == users[i].password ){
      userName = users[i].name;
      break;
    }
  }
  return userName;
}

//response
app.post('/users/check',(req,res) =>{
  let userName = checkData(req.body);
  if(userName){
    res.send('Bienvenue  ' + userName);
  }
  else {
    res.send('Le couple email et/ou le mot de passe ne sont pas reconnus');
  }
});

//Data json
app.get('/users',(req, res) =>{
  res.json(users);
});

//Test server is running
app.listen(4001,() => {
  console.log('Serveur écoutant le port 4000\n CTRL + c pour stopper le serveur');
});
