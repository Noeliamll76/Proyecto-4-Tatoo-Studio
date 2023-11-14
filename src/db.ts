import "reflect-metadata"
import { DataSource } from "typeorm"

import { User } from "./models/User"
import { Tattoo_artist } from "./models/Tattoo_artist"
import { User1698697480984 } from "./migration/1698697480984-user"
import { TattooArtist1699974796285 } from "./migration/1699974796285-tattoo_artist"
import { Works1699974765451 } from "./migration/1699974765451-works"
import { Appointment1698856686137 } from "./migration/1698856686137-appointment"
import { Work } from "./models/Work"
import { Appointment } from "./models/Appointment"
import "dotenv/config"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User, Tattoo_artist, Appointment, Work],
    migrations: [User1698697480984,
        TattooArtist1699974796285,
        Works1699974765451,
        Appointment1698856686137
             ],
    synchronize: false,
    logging: false,
   })