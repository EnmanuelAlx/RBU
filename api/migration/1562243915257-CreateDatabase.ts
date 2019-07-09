import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDatabase1562243915257 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
// tslint:disable-next-line: max-line-length
      'CREATE TABLE `tipo_oferta_academica` (`id` int NOT NULL AUTO_INCREMENT, `descripcion` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB'
    );
    await queryRunner.query(
// tslint:disable-next-line: max-line-length
      'CREATE TABLE `oferta_academica` (`id` int NOT NULL AUTO_INCREMENT, `descripcion` varchar(255) NULL, `id_tipo` int NULL, INDEX `IDX_9baa1b614061848787353399aa` (`id_tipo`), INDEX `fk_oferta_academica_tipo_oferta_academica_1` (`id_tipo`), PRIMARY KEY (`id`)) ENGINE=InnoDB'
    );
    await queryRunner.query(
// tslint:disable-next-line: max-line-length
      'CREATE TABLE `estado_sala` (`id` int NOT NULL AUTO_INCREMENT, `descripcion` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB'
    );
    await queryRunner.query(
// tslint:disable-next-line: max-line-length
      'CREATE TABLE `piso` (`id` int NOT NULL AUTO_INCREMENT, `descripcion` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB'
    );
    await queryRunner.query(
// tslint:disable-next-line: max-line-length
      'CREATE TABLE `sala` (`id` int NOT NULL AUTO_INCREMENT, `id_piso` int NULL, `id_estado` int NULL,`id_tipo` int NULL, INDEX `fk_salas_estados_salas_1` (`id_estado`), INDEX `fk_salas_pisos_1` (`id_piso`), PRIMARY KEY (`id`)) ENGINE=InnoDB'
    );
    await queryRunner.query(
// tslint:disable-next-line: max-line-length
      'CREATE TABLE `reservacion` (`id` int NOT NULL AUTO_INCREMENT, `fecha` date NULL, `hora_inicio` time NULL, `hora_fin` time NULL, `id_sala` int NULL, INDEX `fk_reservaciones_salas_1` (`id_sala`), PRIMARY KEY (`id`)) ENGINE=InnoDB'
    );
    await queryRunner.query(
// tslint:disable-next-line: max-line-length
      'CREATE TABLE `sancion` (`id` int NOT NULL AUTO_INCREMENT, `fecha_inicio` date NULL, `fecha_fin` date NULL, `descripcion` varchar(255) NULL, `id_persona_reservacion` int NULL, INDEX `fk_sanciones_personas_reservacion_1` (`id_persona_reservacion`), PRIMARY KEY (`id`)) ENGINE=InnoDB'
    );
    await queryRunner.query(
// tslint:disable-next-line: max-line-length
      'CREATE TABLE `personas_reservacion` (`id` int NOT NULL AUTO_INCREMENT, `esResponsable` tinyint NULL, `estaEnSala` tinyint NULL, `hora_inicio` time NULL, `hora_fin` time NULL, `id_reservacion` int NULL, `id_persona` int NULL, INDEX `fk_personas_reservacion_reservaciones_1` (`id_reservacion`), INDEX `fk_personas_reservacion_personas_1` (`id_persona`), PRIMARY KEY (`id`)) ENGINE=InnoDB'
    );
    await queryRunner.query(
// tslint:disable-next-line: max-line-length
      'CREATE TABLE `persona` (`id` int NOT NULL AUTO_INCREMENT, `nombres` varchar(255) NULL, `apellidos` varchar(255) NULL, `id_oferta_academica` int NULL, `id_categoria` int NULL, INDEX `fk_personas_oferta_academica_1` (`id_oferta_academica`), INDEX `fk_personas_categorias_1` (`id_categoria`), PRIMARY KEY (`id`)) ENGINE=InnoDB'
    );
    await queryRunner.query(
// tslint:disable-next-line: max-line-length
      'CREATE TABLE `categorias` (`id` int NOT NULL AUTO_INCREMENT, `descripcion` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('DROP TABLE `categorias`');
    await queryRunner.query(
      'DROP INDEX `fk_personas_categorias_1` ON `persona`'
    );
    await queryRunner.query(
      'DROP INDEX `fk_personas_oferta_academica_1` ON `persona`'
    );
    await queryRunner.query('DROP TABLE `persona`');
    await queryRunner.query(
      'DROP INDEX `fk_personas_reservacion_personas_1` ON `personas_reservacion`'
    );
    await queryRunner.query(
      'DROP INDEX `fk_personas_reservacion_reservaciones_1` ON `personas_reservacion`'
    );
    await queryRunner.query('DROP TABLE `personas_reservacion`');
    await queryRunner.query(
      'DROP INDEX `fk_sanciones_personas_reservacion_1` ON `sancion`'
    );
    await queryRunner.query('DROP TABLE `sancion`');
    await queryRunner.query(
      'DROP INDEX `fk_reservaciones_salas_1` ON `reservacion`'
    );
    await queryRunner.query('DROP TABLE `reservacion`');
    await queryRunner.query('DROP INDEX `fk_salas_pisos_1` ON `sala`');
    await queryRunner.query('DROP INDEX `fk_salas_estados_salas_1` ON `sala`');
    await queryRunner.query('DROP TABLE `sala`');
    await queryRunner.query('DROP TABLE `piso`');
    await queryRunner.query('DROP TABLE `estado_sala`');
    await queryRunner.query(
      'DROP INDEX `fk_oferta_academica_tipo_oferta_academica_1` ON `oferta_academica`'
    );
    await queryRunner.query(
      'DROP INDEX `IDX_9baa1b614061848787353399aa` ON `oferta_academica`'
    );
    await queryRunner.query('DROP TABLE `oferta_academica`');
    await queryRunner.query('DROP TABLE `tipo_oferta_academica`');
  }
}
