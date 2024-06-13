import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from "typeorm"
import { Profile } from "./Profile"
import { Photo } from "./Photo"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column({ default: "male" })
    gender: string

    @Column()
    age: number

    @OneToOne(() => Profile)
    @JoinColumn()
    profile: Profile

    @OneToMany(() => Photo, (photo) => photo.user)
    photos: Photo[]

}
