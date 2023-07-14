import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import {
  TypeOrmModule,
  getDataSourceToken,
  getRepositoryToken,
} from '@nestjs/typeorm';
import { Book } from './entity/book.entity';
import { DataSource } from 'typeorm';
import { BookRepository } from './repository/book.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  controllers: [BooksController],
  providers: [
    {
      provide: getRepositoryToken(Book),
      inject: [getDataSourceToken()],
      useFactory(datasource: DataSource) {
        return datasource.getRepository(Book).extend(BookRepository);
      },
    },
    BooksService,
  ],
})
export class BooksModule {}
