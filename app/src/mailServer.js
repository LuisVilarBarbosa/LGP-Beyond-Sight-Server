var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mailer  = require('./Mailer');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.get('*', (req, res) => {
  res.send('Server is working. Please post at "/email" to submit a message.')
});

app.post('http://localhost:4000/email', (req, res) => {
  console.log("here");
  mailer.sendContactForm('lgpbeyondsight@gmail.com', req.body.name, req.body.email, req.body.message);
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

