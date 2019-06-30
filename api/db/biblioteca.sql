/*
Navicat MySQL Data Transfer

Source Server         : biblio
Source Server Version : 50726
Source Host           : localhost:3336
Source Database       : biblioteca

Target Server Type    : MYSQL
Target Server Version : 50726
File Encoding         : 65001

Date: 2019-06-28 12:52:08
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for categorias
-- ----------------------------
DROP TABLE IF EXISTS `categorias`;
CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for estado_sala
-- ----------------------------
DROP TABLE IF EXISTS `estado_sala`;
CREATE TABLE `estado_sala` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for oferta_academica
-- ----------------------------
DROP TABLE IF EXISTS `oferta_academica`;
CREATE TABLE `oferta_academica` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `id_tipo` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_oferta_academica_tipo_oferta_academica_1` (`id_tipo`),
  CONSTRAINT `fk_oferta_academica_tipo_oferta_academica_1` FOREIGN KEY (`id_tipo`) REFERENCES `tipo_oferta_academica` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for persona
-- ----------------------------
DROP TABLE IF EXISTS `persona`;
CREATE TABLE `persona` (
  `id` int(11) NOT NULL,
  `nombres` varchar(255) DEFAULT NULL,
  `apellidos` varchar(255) DEFAULT NULL,
  `id_oferta_academica` int(11) DEFAULT NULL,
  `id_categoria` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_personas_categorias_1` (`id_categoria`),
  KEY `fk_personas_oferta_academica_1` (`id_oferta_academica`),
  CONSTRAINT `fk_personas_categorias_1` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id`),
  CONSTRAINT `fk_personas_oferta_academica_1` FOREIGN KEY (`id_oferta_academica`) REFERENCES `oferta_academica` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for personas_reservacion
-- ----------------------------
DROP TABLE IF EXISTS `personas_reservacion`;
CREATE TABLE `personas_reservacion` (
  `id` int(11) NOT NULL,
  `id_reservacion` int(11) DEFAULT NULL,
  `id_persona` int(255) DEFAULT NULL,
  `esResponsable` tinyint(255) DEFAULT NULL,
  `estaEnSala` tinyint(4) DEFAULT NULL,
  `hora_inicio` time DEFAULT NULL,
  `hora_fin` time DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_personas_reservacion_personas_1` (`id_persona`),
  KEY `fk_personas_reservacion_reservaciones_1` (`id_reservacion`),
  CONSTRAINT `fk_personas_reservacion_personas_1` FOREIGN KEY (`id_persona`) REFERENCES `persona` (`id`),
  CONSTRAINT `fk_personas_reservacion_reservaciones_1` FOREIGN KEY (`id_reservacion`) REFERENCES `reservacion` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for piso
-- ----------------------------
DROP TABLE IF EXISTS `piso`;
CREATE TABLE `piso` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for reservacion
-- ----------------------------
DROP TABLE IF EXISTS `reservacion`;
CREATE TABLE `reservacion` (
  `id` int(11) NOT NULL,
  `id_sala` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `hora_inicio` time DEFAULT NULL,
  `hora_fin` time DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_reservaciones_salas_1` (`id_sala`),
  CONSTRAINT `fk_reservaciones_salas_1` FOREIGN KEY (`id_sala`) REFERENCES `sala` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for sala
-- ----------------------------
DROP TABLE IF EXISTS `sala`;
CREATE TABLE `sala` (
  `id` int(11) NOT NULL,
  `id_piso` int(11) DEFAULT NULL,
  `id_estado` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_salas_pisos_1` (`id_piso`),
  KEY `fk_salas_estados_salas_1` (`id_estado`),
  CONSTRAINT `fk_salas_estados_salas_1` FOREIGN KEY (`id_estado`) REFERENCES `estado_sala` (`id`),
  CONSTRAINT `fk_salas_pisos_1` FOREIGN KEY (`id_piso`) REFERENCES `piso` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for sancion
-- ----------------------------
DROP TABLE IF EXISTS `sancion`;
CREATE TABLE `sancion` (
  `id` int(11) NOT NULL,
  `id_persona_reservacion` int(11) DEFAULT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  `descripcion` varchar(0) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_sanciones_personas_reservacion_1` (`id_persona_reservacion`),
  CONSTRAINT `fk_sanciones_personas_reservacion_1` FOREIGN KEY (`id_persona_reservacion`) REFERENCES `personas_reservacion` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for tipo_oferta_academica
-- ----------------------------
DROP TABLE IF EXISTS `tipo_oferta_academica`;
CREATE TABLE `tipo_oferta_academica` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
