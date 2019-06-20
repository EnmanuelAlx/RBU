var Sequelize = require('sequelize');
var task = require('./task');
var sequelize = new Sequelize('test2', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

var db = {};

db.task = sequelize.define("Task", task);

db.sequelize = sequelize;
module.exports = db;