import "reflect-metadata"
import{DataSource} from "typeorm"
import { User1698358561900 } from "./migration/1698358561900-user"
import { User } from "./models/User"


export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "1234",
    database: "tatoo-studio",
    entities: [User],
    migrations: [User1698358561900
         
    ],
    synchronize: false,
    logging: false,
   })