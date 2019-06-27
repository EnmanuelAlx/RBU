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
  },
  id_categoria: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}
