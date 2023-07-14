import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { RefreshToken } from 'src/auth/entity/refresh-token.entity';
import { Book } from 'src/books/entity/book.entity';
import { User } from 'src/users/entity/user.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'database',
  port: 5432,
  username: 'admin',
  password: 'admin',
  database: 'books_api',
  entities: [Book, User, RefreshToken],
  synchronize: true,
  logging: true,
};
