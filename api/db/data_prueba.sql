-- TIPOS DE OFERTA ACADEMICA --
insert into tipo_oferta_academica (id, descripcion) values (1, 'Beca Completa'); 
insert into tipo_oferta_academica (id, descripcion) values (2, 'Beca Trabajo');

-- OFERTA ACADEMICA --
insert into oferta_academica (id, descripcion, id_tipo) values (1, 'Beca Completa', 1); 
insert into oferta_academica (id, descripcion, id_tipo) values (2, 'Beca Trabajo', 2); 

-- CATEGORIAS --
insert into categorias (id, descripcion) values (1, 'Categoria 1'); 
insert into categorias (id, descripcion) values (2, 'Categoria 2');
insert into categorias (id, descripcion) values (3, 'Categoria 3');

-- PISO --
insert into piso (id, descripcion) values (1, 'Psio 1'); 
insert into piso (id, descripcion) values (2, 'Piso 3'); 
insert into piso (id, descripcion) values (3, 'Mezanina'); 

-- TIPOS DE SALA --
insert into tipo_sala (id, tipo) values (1, '4 Personas'); 
insert into tipo_sala (id, tipo) values (2, '8 Personas'); 
insert into tipo_sala (id, tipo) values (3, 'Profesores');

-- ESTADO SALAS --
insert into estado_sala (id, descripcion) values (1, 'Disponble'); 
insert into estado_sala (id, descripcion) values (2, 'En Uso');
insert into estado_sala (id, descripcion) values (3, 'Ocupada');
insert into estado_sala (id, descripcion) values (4, 'Proximo Retiro');
insert into estado_sala (id, descripcion) values (5, 'Sobre Tiempo');

-- SALA --
insert into sala (id, id_piso, id_estado, id_tipo) values (1,  1, 1, 2); 
insert into sala (id, id_piso, id_estado, id_tipo) values (2,  1, 1, 2); 
insert into sala (id, id_piso, id_estado, id_tipo) values (3,  1, 1, 1); 
insert into sala (id, id_piso, id_estado, id_tipo) values (4,  1, 1, 1); 
insert into sala (id, id_piso, id_estado, id_tipo) values (5,  1, 1, 1); 
insert into sala (id, id_piso, id_estado, id_tipo) values (6,  1, 1, 1); 
insert into sala (id, id_piso, id_estado, id_tipo) values (7,  1, 1, 1); 
insert into sala (id, id_piso, id_estado, id_tipo) values (8,  1, 1, 1); 
insert into sala (id, id_piso, id_estado, id_tipo) values (9,  1, 1, 1); 
insert into sala (id, id_piso, id_estado, id_tipo) values (10, 1, 1, 1); 
insert into sala (id, id_piso, id_estado, id_tipo) values (11, 2, 1, 1); 
insert into sala (id, id_piso, id_estado, id_tipo) values (12, 2, 1, 1); 
insert into sala (id, id_piso, id_estado, id_tipo) values (13, 2, 1, 1); 
insert into sala (id, id_piso, id_estado, id_tipo) values (14, 2, 1, 1); 
insert into sala (id, id_piso, id_estado, id_tipo) values (15, 2, 1, 1); 
insert into sala (id, id_piso, id_estado, id_tipo) values (16, 2, 1, 1); 
insert into sala (id, id_piso, id_estado, id_tipo) values (17, 2, 1, 1); 
insert into sala (id, id_piso, id_estado, id_tipo) values (18, 2, 1, 1); 
insert into sala (id, id_piso, id_estado, id_tipo) values (19, 2, 1, 1); 
insert into sala (id, id_piso, id_estado, id_tipo) values (20, 2, 1, 1); 
insert into sala (id, id_piso, id_estado, id_tipo) values (21, 2, 1, 1); 
insert into sala (id, id_piso, id_estado, id_tipo) values (22, 2, 1, 1);

-- PERSONA --
insert into persona (id, nombres, apellidos, id_oferta_academica, id_categoria) values (1, 'Rhonda', 'Behnke', 2, 2); 
insert into persona (id, nombres, apellidos, id_oferta_academica, id_categoria) values (2, 'Elmore', 'Shankland', 1, 1); 
insert into persona (id, nombres, apellidos, id_oferta_academica, id_categoria) values (3, 'Faulkner', 'Simonassi', 2, 2); 
insert into persona (id, nombres, apellidos, id_oferta_academica, id_categoria) values (4, 'Genna', 'Muddimer', 1, 1); 
insert into persona (id, nombres, apellidos, id_oferta_academica, id_categoria) values (5, 'Sharon', 'Grigori', 2, 2); 
insert into persona (id, nombres, apellidos, id_oferta_academica, id_categoria) values (6, 'Clark', 'Bramont', 2, 1); 
insert into persona (id, nombres, apellidos, id_oferta_academica, id_categoria) values (7, 'Norean', 'Enstone', 1, 3); 
insert into persona (id, nombres, apellidos, id_oferta_academica, id_categoria) values (8, 'Allister', 'Ebbage', 1, 1);
insert into persona (id, nombres, apellidos, id_oferta_academica, id_categoria) values (9, 'Benjy', 'Bortolazzi', 1, 2); 
insert into persona (id, nombres, apellidos, id_oferta_academica, id_categoria) values (10, 'Ediva', 'Teasdale-Markie', 2, 1); 
insert into persona (id, nombres, apellidos, id_oferta_academica, id_categoria) values (11, 'Cathy', 'Housecroft', 2, 1); 
insert into persona (id, nombres, apellidos, id_oferta_academica, id_categoria) values (12, 'Magda', 'Beert', 1, 2); 
insert into persona (id, nombres, apellidos, id_oferta_academica, id_categoria) values (13, 'Kerby', 'Pingstone', 1, 2); 
insert into persona (id, nombres, apellidos, id_oferta_academica, id_categoria) values (14, 'Kristine', 'Bus', 1, 3); 
insert into persona (id, nombres, apellidos, id_oferta_academica, id_categoria) values (15, 'Margalo', 'MacAdam', 1, 3); 
insert into persona (id, nombres, apellidos, id_oferta_academica, id_categoria) values (16, 'Yolande', 'Tofanelli', 2, 1); 
insert into persona (id, nombres, apellidos, id_oferta_academica, id_categoria) values (17, 'Mathilde', 'Sains', 1, 1); 
insert into persona (id, nombres, apellidos, id_oferta_academica, id_categoria) values (18, 'Floris', 'Elvish', 1, 1); 
insert into persona (id, nombres, apellidos, id_oferta_academica, id_categoria) values (19, 'Wilona', 'Bolitho', 2, 3); 
insert into persona (id, nombres, apellidos, id_oferta_academica, id_categoria) values (20, 'Gregory', 'Marsh', 2, 2); 
insert into persona (id, nombres, apellidos, id_oferta_academica, id_categoria) values (21, 'Thaddeus', 'Wiffler', 1, 2); 
insert into persona (id, nombres, apellidos, id_oferta_academica, id_categoria) values (22, 'Channa', 'Shall', 2, 1); 
insert into persona (id, nombres, apellidos, id_oferta_academica, id_categoria) values (23, 'Allene', 'Cacacie', 1, 2); 
insert into persona (id, nombres, apellidos, id_oferta_academica, id_categoria) values (24, 'Olivier', 'Domoni', 2, 1); 
insert into persona (id, nombres, apellidos, id_oferta_academica, id_categoria) values (25, 'Kip', 'Tumelty', 2, 1);

-- RESERVACION --
insert into reservacion (id, fecha, hora_inicio, hora_fin, id_sala) values (1, '2019-04-01', '12:35 PM', '1:43 PM', 1); 
insert into reservacion (id, fecha, hora_inicio, hora_fin, id_sala) values (2, '2019-04-01', '1:20 PM', '1:14 PM', 2);

-- PERSONA RESERVACION --
insert into personas_reservacion (id, esResponsable, estaEnSala, hora_inicio, hora_fin, id_reservacion, id_persona) values (1, 1, 1, '12:35 PM', '1:43 PM', 1, 1); 
insert into personas_reservacion (id, esResponsable, estaEnSala, hora_inicio, hora_fin, id_reservacion, id_persona) values (2, 1, 1, '1:20 PM', '1:14 PM', 2, 2);

-- SANCION --
insert into sancion (id, fecha_inicio, fecha_fin, descripcion, id_persona_reservacion) values (1, '2019-04-01', '2019-04-03', 'Sancion 1', 7); 
insert into sancion (id, fecha_inicio, fecha_fin, descripcion, id_persona_reservacion) values (2, '2019-04-02', '2019-04-05', 'Sancion 2', 8); 
insert into sancion (id, fecha_inicio, fecha_fin, descripcion, id_persona_reservacion) values (3, '2019-04-03', '2019-04-07', 'Sancion 3', 9);
