import { MigrationInterface, QueryRunner, Table } from "typeorm"


export class Works1698362019143 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "works",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "createdBy_id",
                        type: "int",
                    },
                    {
                        name: "description",
                        type: "varchar",
                        length: "255",
                    },
                    {
                        name: "image",
                        type: "varchar",
                        length: "255",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                    {
                        name: "update_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                        onUpdate: "CURRENT_TIMESTAMP",
                    },
                ],
            }),
            true
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("works");

    }

}