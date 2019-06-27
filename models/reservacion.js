var Sequelize = require('sequelize');

module.exports = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_sala: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  fecha: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  hora_entrada: {
    type: Sequelize.TIME,
    allowNull: false
  },
  hora_salida: {
    type: Sequelize.TIME,
    allowNull: false
  }
}
