/**
 * Created by hazarin on 12.04.18.
 */
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(express.static(__dirname + '/dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const credentials = {
  login: 'admin@admin.com',
  password: 'admin',
};

const jwt_token = 'I am f...ing jwt!!!';

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html')
});

app.post('/api/login', (req, res) => {
  if (req.get('Authorization') === `JWT ${jwt_token}`) {
    res.send({
      message: 'Already logged in',
      errors: []
    });
  } else {
    let response = {
      errors: []
    };
    if (req.body.login !== credentials.login) {
      response.errors.push({login: 'Invalid login'});
    } else {
      if (req.body.password !== credentials.password) {
        response.errors.push({password:'Invalid password'});
      }
    }
    if (response.errors.length === 0) {
      response['token'] = jwt_token;
      res.send(response);
    } else {
      res.status(401).send(response);
    }
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(3000, function () {
  console.log('Backend listening on port 3000!');
});
module.exports = app;