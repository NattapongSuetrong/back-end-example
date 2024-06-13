import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Dog } from "./entity/Dog"
import { Profile } from "./entity/Profile"
import { Photo } from "./entity/Photo"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [User, Dog, Profile, Photo],
    migrations: [],
    subscribers: [],
})
