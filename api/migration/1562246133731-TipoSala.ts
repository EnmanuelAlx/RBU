import {MigrationInterface, QueryRunner} from "typeorm";

export class TipoSala1562246133731 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
// tslint:disable-next-line: max-line-length
        await queryRunner.query("CREATE TABLE `tipo_sala` (`id` int NOT NULL AUTO_INCREMENT, `tipo` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP TABLE `tipo_sala`");
    }

}
