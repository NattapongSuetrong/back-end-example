import { Column, Entity, PrimaryColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Profile{
    @PrimaryColumn()
    id: number

    @Column()
    gender: string

    @Column()
    photo: string
}