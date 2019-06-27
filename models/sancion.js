var Sequelize = require('sequelize');

module.exports = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_persona_reservacion: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  fecha_inicio: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  fecha_fin: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  descripcion: {
    type: Sequelize.STRING(200),
    allowNull: false
  }
}
