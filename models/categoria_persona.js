var Sequelize = require('sequelize');

module.exports = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  descripcion: {
    type: Sequelize.STRING(200),
    allowNull: false
  }
}
