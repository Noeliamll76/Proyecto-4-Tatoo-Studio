import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm"

export class Appointment1698847448435 implements MigrationInterface {

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
                        type: "date"
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
        await queryRunner.createIndex('appointment', new TableIndex({
            name: 'unique_user_artist_date_shift',
            columnNames: [ 'user_id', 'artist_id','date', 'shift'],
            isUnique: true,
          }));
}
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("appointment");
    }

}