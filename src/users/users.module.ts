import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entity/user.entity';
import {
  TypeOrmModule,
  getDataSourceToken,
  getRepositoryToken,
} from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserRepository } from './repository/user.repository';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    {
      provide: getRepositoryToken(User),
      inject: [getDataSourceToken()],
      useFactory(datasource: DataSource) {
        return datasource.getRepository(User).extend(UserRepository);
      },
    },
    UsersService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
