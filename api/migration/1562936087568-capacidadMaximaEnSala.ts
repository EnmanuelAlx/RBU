import { MigrationInterface, QueryRunner } from 'typeorm';

export class capacidadMaximaEnSala1562936087568 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      'ALTER TABLE `biblioteca`.`sala` ADD COLUMN `capacidad_maxima` int(11) NULL AFTER `nombre`;'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      'ALTER TABLE `biblioteca`.`sala` DROP COLUMN `capacidad_maxima`;'
    );
  }
}
