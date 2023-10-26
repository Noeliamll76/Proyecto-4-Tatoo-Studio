import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class TattooArtist1698360789256 implements MigrationInterface {
      
        public async up(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.createTable(
                new Table({
                    name: "tattoo_artist",
                    columns: [
                        {
                            name: "id",
                            type: "int",
                            isPrimary: true,
                            isGenerated: true,
                            generationStrategy: "increment",
                        },
                        {
                            name: "name",
                            type: "varchar",
                            length: "255",
                        },
                        {
                            name: "email",
                            type: "varchar",
                            length: "50",
                            isUnique: true,
                        },
                        {
                            name: "password",
                            type: "varchar",
                            length: "255",
                        },
                        {
                            name: "phone",
                            type: "varchar",
                            length: "15",
                        },
                        {
                            name: "work_id",
                            type: "int",
                        },
                        {
                            name: "role",
                            type: "enum",
                            enum: ["admin", "super_admin"],
                            default: '"admin"',
                        },
                        {
                            name: "is_active",
                            type: "boolean",
                            default: true,
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
            await queryRunner.dropTable("tattoo_artist");
    
        }
    
    }
    