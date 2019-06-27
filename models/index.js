var Sequelize = require('sequelize');
var task = require('./task');
var sequelize = new Sequelize('test', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

var piso = require('./piso');
var sala = require('./sala');
var reservacion = require('./reservacion');
var persona_reservacion = require('./persona_reservacion');
var sancion = require('./sancion');
var persona = require('./persona');
var oferta_academica = require('./oferta_academica');
var categoria_oferta_academica = require('./categoria_oferta_academica');
var categoria_persona = require('./categoria_persona');
var estado_sala = require('./estado_sala');

var db = {};

piso = sequelize.define("piso", piso);
sala = sequelize.define("sala", sala);
reservacion = sequelize.define("reservacion", reservacion);
persona_reservacion = sequelize.define("persona_reservacion", persona_reservacion);
sancion = sequelize.define("sancion", sancion);
persona = sequelize.define("persona", persona);
oferta_academica = sequelize.define("oferta_academica", oferta_academica);
categoria_oferta_academica = sequelize.define("categoria_oferta_academica", categoria_oferta_academica);
categoria_persona = sequelize.define("categoria_persona", categoria_persona);
estado_sala = sequelize.define("estado_sala", estado_sala);

piso.hasMany(sala, {
  foreignKey: 'id_piso'
});
sala.belongsTo(piso, {
  foreignKey: 'id_piso'
});
sala.hasMany(reservacion, {
  foreignKey: 'id_sala'
});
reservacion.belongsTo(sala, {
  foreignKey: 'id_sala'
});
reservacion.hasMany(persona_reservacion, {
  foreignKey: 'id_reservacion'
});
persona_reservacion.belongsTo(reservacion, {
  foreignKey: 'id_reservacion'
});
persona_reservacion.hasOne(sancion, {
  foreignKey: 'id_persona_reservacion'
});
persona_reservacion.belongsTo(reservacion, {
  foreignKey: 'id_persona'
});
persona.hasMany(persona_reservacion, {
  foreignKey: 'id_persona'
});
oferta_academica.hasMany(persona, {
  foreignKey: 'id_oferta_academica'
});
categoria_oferta_academica.hasMany(oferta_academica, {
  foreignKey: 'id_categoria'
});
oferta_academica.belongsTo(categoria_oferta_academica, {
  foreignKey: 'id_categoria'
});
categoria_persona.hasMany(persona, {
  foreignKey: 'id_categoria'
});
persona.belongsTo(categoria_persona, {
  foreignKey: 'id_categoria'
});
estado_sala.hasMany(sala, {
  foreignKey: 'id_estado'
});
sala.belongsTo(estado_sala, {
  foreignKey: 'id_estado'
});


db.task = sequelize.define("Task", task);
db.piso = piso;
db.sala = sala;
db.reservacion = reservacion;
db.persona_reservacion = persona_reservacion;
db.sancion = sancion;
db.persona = persona;
db.oferta_academica = oferta_academica;
db.categoria_oferta_academica = categoria_oferta_academica;
db.categoria_persona = categoria_persona;
db.estado_sala = estado_sala;
db.sequelize = sequelize;

module.exports = db;
