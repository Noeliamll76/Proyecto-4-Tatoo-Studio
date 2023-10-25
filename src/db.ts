import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource ({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "1234",
    database: "tatoo-studio",
    entities: [],
    migrations: [    ],
    synchronize: false,
    logging: false
})