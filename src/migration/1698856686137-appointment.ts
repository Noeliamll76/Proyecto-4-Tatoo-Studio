import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Appointment1698856686137 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "appointment",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "user_id",
                        type: "int"
                    },
                    {
                        name: "artist_id",
                        type: "int"
                    },
                    {
                        name: "date",
                        type: "varchar",
                        length: "255"
                    },
                    {
                        name: "shift",
                        type: "enum",
                        enum: ["mañana", "tarde"],
                    },
                    {
                        name: "type_work",
                        type: "enum",
                        enum: ["piercing", "tattoo"]
                    },
                    {
                        name: "description",
                        type: "varchar",
                        length: "255"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",                        
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                        onUpdate: "CURRENT_TIMESTAMP"                 
                    },
                ],
                foreignKeys: [
                    {
                        columnNames: ["user_id"],
                        referencedTableName: "user",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE",
                    },
                    {
                        columnNames: ["artist_id"],
                        referencedTableName: "tattoo_artist",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE",
                 }
                ]
            }),
            true
        );
       }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("appointment");
    }

}
