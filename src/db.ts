import "reflect-metadata"
import{DataSource} from "typeorm"
import { User } from "./models/User"
import { Tattoo_artist } from "./models/Tattoo_artist"
import { User1698358561900 } from "./migration/1698358561900-user"
import { TattooArtist1698360789256 } from "./migration/1698360789256-tattoo_artist"
import { Works1698362019143 } from "./migration/1698362019143-works"


export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "1234",
    database: "tatoo-studio",
    entities: [User, Tattoo_artist],
    migrations: [User1698358561900,
        TattooArtist1698360789256,
        Works1698362019143
             ],
    synchronize: false,
    logging: false,
   })