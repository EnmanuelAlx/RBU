var Sequelize = require('sequelize');

module.exports = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_piso: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  id_estado: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
}
