import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { UserRepository } from './repository/user.repository';
import { User } from './entity/user.entity';
import { LoginDto } from 'src/auth/dto/login.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly UserRepository: UserRepository,
  ) {}

  async createUser(CreateUserDto: CreateUserDto) {
    return await this.UserRepository.createUser(CreateUserDto);
  }

  async validateUser(LoginDto: LoginDto) {
    return await this.UserRepository.validateUser(LoginDto);
  }
}
