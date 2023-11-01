import "reflect-metadata"
import { DataSource } from "typeorm"

import { User } from "./models/User"
import { Tattoo_artist } from "./models/Tattoo_artist"
import { User1698697480984 } from "./migration/1698697480984-user"
import { TattooArtist1698697121006 } from "./migration/1698697121006-tattoo_artist"
import { Works1698848725255 } from "./migration/1698848725255-works"
import { Appointment1698847448435 } from "./migration/1698847448435-appointment"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "1234",
    database: "tattoo-studio",
    entities: [User, Tattoo_artist],
    migrations: [User1698697480984,
        TattooArtist1698697121006,
        Works1698848725255,
        Appointment1698847448435
             ],
    synchronize: false,
    logging: false,
   })