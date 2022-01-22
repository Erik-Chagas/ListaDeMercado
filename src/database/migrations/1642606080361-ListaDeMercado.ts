import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class ListaDeMercado1642606080361 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'Lista',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        generationStrategy: 'increment',
                        isGenerated: true
                    },
                    {
                        name: 'item',
                        type: 'varchar',
                    },
                    {
                        name: 'preco',
                        type: 'decimal'
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('Lista')
    }

}
