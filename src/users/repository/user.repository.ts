import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '../dto/createUser.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { LoginDto } from 'src/auth/dto/login.dto';

export interface UserRepository extends Repository<User> {
  createUser(CreateUserDto: CreateUserDto): Promise<void>;
  validateUser(LoginDto: LoginDto): Promise<User>;
}

export const UserRepository: Pick<UserRepository, any> = {
  async createUser(CreateUserDto: CreateUserDto) {
    const { name, email, password } = CreateUserDto;

    const user = this.create();
    user.name = name;
    user.email = email;
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(password, user.salt);

    try {
      await user.save();
    } catch (error) {
      console.error('Error create user:', error);
      if (error.code == '23505') {
        throw new ConflictException(`Email ${email} already used`);
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  },

  async validateUser(LoginDto: LoginDto) {
    const { email, password } = LoginDto;

    const user = await this.findOne({ where: { email } });

    if (user && (await user.validatePassword(password))) {
      return user;
    } else {
      return null;
    }
  },
};
