import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  users = [
    {
      id: 1,
      login: 'user01',
      name: 'User 1',
      password: 'password',
      gender: 'male',
      age: 18,
    },
    {
      id: 2,
      login: 'user02',
      name: 'User 2',
      password: 'password',
      gender: 'female',
      age: 40,
    },
  ];
  lastId = 3;
  create(createUserDto: CreateUserDto) {
    const newUser = new User();
    newUser.login = createUserDto.login;
    newUser.name = createUserDto.name;
    newUser.password = createUserDto.password;
    newUser.gender = createUserDto.gender;
    newUser.age = createUserDto.age;
    this.usersRepository.save(newUser);
    return newUser;
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOneByOrFail({ id: id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOneByOrFail({ id });
    const updatedUser = this.usersRepository.merge(user, updateUserDto);
    return this.usersRepository.save(updatedUser);
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOneByOrFail({ id });
    return this.usersRepository.delete(user);
  }
}
