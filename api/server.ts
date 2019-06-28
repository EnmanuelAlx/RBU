// import path = require('path');
import bodyParser = require('body-parser');
import cors = require('cors');
import express = require('express');
import 'reflect-metadata';

// import db = require("./models/index");

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());

app.get('/api/tasks', (req, res) => {
  // db.task.findAll()
  //   .then((tasks) => {
  //     console.log(tasks);
  res.send('tasks');
  //   });
});
// db.sequelize.sync().then(runServer);

function runServer() {
  app.listen(8000, () => {
    // tslint:disable-next-line:no-console
    console.log('escuchando en el puerto 8000');
  });
}
