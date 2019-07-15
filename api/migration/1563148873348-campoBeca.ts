import { MigrationInterface, QueryRunner } from "typeorm";

export class campoBeca1563148873348 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
            'ALTER TABLE `biblioteca`.`reservacion` ADD COLUMN `beca` varchar(255) NULL;'
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
            'ALTER TABLE `biblioteca`.`reservacion` DROP COLUMN `beca`;'
        );
    }

}
