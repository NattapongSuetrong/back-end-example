import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
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
    const newUser = { id: this.lastId, ...createUserDto };
    this.users.push(newUser);
    this.lastId++;
    return newUser;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((item) => item.id === id);
    if (!user) {
      throw new NotFoundException('Index ' + id + ' not found');
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index < 0) {
      throw new NotFoundException('Index ' + ' not found');
    }
    const user = this.users[index];
    this.users[index] = { ...user, ...updateUserDto };
    return this.users[index];
  }

  remove(id: number) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index < 0) {
      throw new NotFoundException('Index ' + ' not found');
    }
    const user = this.users[index];
    this.users.splice(index, 1);
    return user;
  }
}
