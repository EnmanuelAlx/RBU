var Sequelize = require('sequelize');
task = {
  keep: {
    type: Sequelize.STRING(200),
    allowNull: false
  }
}

module.exports = task
