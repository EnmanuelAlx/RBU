import { MigrationInterface, QueryRunner } from 'typeorm';

export class nombreSala1562602829528 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      'ALTER TABLE `biblioteca`.`sala`  ADD COLUMN `nombre` varchar(255) NULL AFTER `id_tipo`;'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      'ALTER TABLE `biblioteca`.`sala`  DROP COLUMN `nombre`;'
    );
  }
}
