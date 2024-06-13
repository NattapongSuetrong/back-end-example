import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async create(createTodoDto: CreateTodoDto, userId: number) {
    const user = await this.usersRepository.findOneByOrFail({ id: userId });
    const todo = new Todo();
    todo.text = createTodoDto.text;
    todo.createdBy = user;
    return this.todosRepository.save(todo);
  }

  findAll() {
    return this.todosRepository.find();
  }

  findAllByUserId(userId: number) {
    return this.todosRepository.find({ where: { createdBy: { id: userId } } });
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const todo = await this.todosRepository.findOneBy({ id });
    const updatedTodo = this.todosRepository.merge(todo, updateTodoDto);

    return this.todosRepository.save(updatedTodo);
  }

  async remove(id: number) {
    const todo = await this.todosRepository.findOneBy({ id });

    return this.todosRepository.delete(todo);
  }
}
