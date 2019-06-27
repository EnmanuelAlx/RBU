var Sequelize = require('sequelize');

module.exports = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_reservacion: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  id_persona: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  esResponsable: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  estaEnSala: {
    type: Sequelize.BOOLEAN,
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
