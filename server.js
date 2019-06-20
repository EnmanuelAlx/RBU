var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var http = require ('http');

var db = require('./models/index');

var app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());

app.get('/api/tasks', function(req, res){
    db.task.findAll()
    .then(tasks=>{
        console.log(tasks)
        res.send(tasks)
    })
});
db.sequelize.sync().then(runServer);

function runServer(){
    var server = http.createServer(app);
    server.listen(8000, function(){
        console.log('escuchando en el puerto 8000');
    })
}