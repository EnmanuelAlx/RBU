import { MigrationInterface, QueryRunner } from 'typeorm';

export class createForeignsAndCedula1562806171312
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      'ALTER TABLE `biblioteca`.`persona` ADD COLUMN `cedula` int(255) NULL AFTER `id_categoria`;'
    );
    await queryRunner.query(
      'ALTER TABLE `biblioteca`.`oferta_academica` ADD CONSTRAINT `fk_oferta_academica_tipo_oferta_academica_1` FOREIGN KEY (`id_tipo`) REFERENCES `biblioteca`.`tipo_oferta_academica` (`id`);'
    );
    await queryRunner.query(
      'ALTER TABLE `biblioteca`.`persona` ADD CONSTRAINT `fk_persona_categorias_1` FOREIGN KEY (`id_categoria`) REFERENCES `biblioteca`.`categorias` (`id`);'
    );
    await queryRunner.query(
      'ALTER TABLE `biblioteca`.`persona` ADD CONSTRAINT `fk_persona_oferta_academica_1` FOREIGN KEY (`id_oferta_academica`) REFERENCES `biblioteca`.`oferta_academica` (`id`);'
    );
    await queryRunner.query(
      'ALTER TABLE `biblioteca`.`personas_reservacion` ADD CONSTRAINT `fk_personas_reservacion_persona_1` FOREIGN KEY (`id_persona`) REFERENCES `biblioteca`.`persona` (`id`);'
    );
    await queryRunner.query(
      'ALTER TABLE `biblioteca`.`personas_reservacion` ADD CONSTRAINT `fk_personas_reservacion_reservacion_1` FOREIGN KEY (`id_reservacion`) REFERENCES `biblioteca`.`reservacion` (`id`);'
    );
    await queryRunner.query(
      'ALTER TABLE `biblioteca`.`reservacion` ADD CONSTRAINT `fk_reservacion_sala_1` FOREIGN KEY (`id_sala`) REFERENCES `biblioteca`.`sala` (`id`);'
    );
    await queryRunner.query(
      'ALTER TABLE `biblioteca`.`sala` ADD CONSTRAINT `fk_sala_piso_1` FOREIGN KEY (`id_piso`) REFERENCES `biblioteca`.`piso` (`id`);'
    );
    await queryRunner.query(
      'ALTER TABLE `biblioteca`.`sala` ADD CONSTRAINT `fk_sala_estado_sala_1` FOREIGN KEY (`id_estado`) REFERENCES `biblioteca`.`estado_sala` (`id`);'
    );
    await queryRunner.query(
      'ALTER TABLE `biblioteca`.`sala` ADD CONSTRAINT `fk_sala_tipo_sala_1` FOREIGN KEY (`id_tipo`) REFERENCES `biblioteca`.`tipo_sala` (`id`);'
    );
    await queryRunner.query(
      'ALTER TABLE `biblioteca`.`sancion` ADD CONSTRAINT `fk_sancion_personas_reservacion_1` FOREIGN KEY (`id_persona_reservacion`) REFERENCES `biblioteca`.`personas_reservacion` (`id`);'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      'ALTER TABLE `biblioteca`.`persona` DROP COLUMN `cedula`;'
    );

    await queryRunner.query(
      'ALTER TABLE `biblioteca`.`oferta_academica` DROP FOREIGN KEY `fk_oferta_academica_tipo_oferta_academica_1`;'
    );
    await queryRunner.query(
      'ALTER TABLE `biblioteca`.`persona` DROP FOREIGN KEY `fk_persona_categorias_1`;'
    );
    await queryRunner.query(
      'ALTER TABLE `biblioteca`.`persona` DROP FOREIGN KEY `fk_persona_oferta_academica_1`;'
    );
    await queryRunner.query(
      'ALTER TABLE `biblioteca`.`personas_reservacion` DROP FOREIGN KEY `fk_personas_reservacion_persona_1`;'
    );
    await queryRunner.query(
      'ALTER TABLE `biblioteca`.`personas_reservacion` DROP FOREIGN KEY `fk_personas_reservacion_reservacion_1`;'
    );
    await queryRunner.query(
      'ALTER TABLE `biblioteca`.`reservacion` DROP FOREIGN KEY `fk_reservacion_sala_1`;'
    );
    await queryRunner.query(
      'ALTER TABLE `biblioteca`.`sala` DROP FOREIGN KEY `fk_sala_estado_sala_1`;'
    );
    await queryRunner.query(
      'ALTER TABLE `biblioteca`.`sala` DROP FOREIGN KEY `fk_sala_piso_1`;'
    );
    await queryRunner.query(
      'ALTER TABLE `biblioteca`.`sala` DROP FOREIGN KEY `fk_sala_tipo_sala_1`;'
    );
    await queryRunner.query(
      'ALTER TABLE `biblioteca`.`sancion` DROP FOREIGN KEY `fk_sancion_personas_reservacion_1`;'
    );
  }
}
