import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Photo{
    @PrimaryColumn()
    id: number

    @Column()
    url: string

    @ManyToOne(() => User, (user) => user.photos)
    user: User

}