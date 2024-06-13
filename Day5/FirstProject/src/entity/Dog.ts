import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Dog {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    Name: string

    @Column()
    Color: String

}
