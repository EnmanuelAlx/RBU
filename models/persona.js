var Sequelize = require('sequelize');

module.exports = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombres: {
    type: Sequelize.STRING(200),
    allowNull: false
  },
  nombres: {
    type: Sequelize.STRING(200),
    allowNull: false
  },
  id_oferta_academica: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  id_categoria: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}
