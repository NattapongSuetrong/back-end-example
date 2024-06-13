import { Todo } from 'src/todos/entities/todo.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  login: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  gender: string;

  @Column()
  age: number;

  @Column({
    default: 'no-image.png',
  })
  image: string;

  @OneToMany(() => Todo, (todo) => todo.createdBy)
  todos: Todo[];
}
