import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/createBook.dto';
import { UpdateBookDto } from './dto/updateBook.dto';
import { FilterBookDto } from './dto/filterBook.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BookRepository } from './repository/book.repository';
import { Book } from './entity/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly BookRepository: BookRepository,
  ) {}

  async getBooks(filter: FilterBookDto) {
    return await this.BookRepository.getBooks(filter);
  }

  async getBook(id: string) {
    return await this.BookRepository.getBook(id);
  }

  async createBook(CreateBookDto: CreateBookDto) {
    return await this.BookRepository.createBook(CreateBookDto);
  }

  async updateBook(id: string, UpdateBookDto: UpdateBookDto) {
    return await this.BookRepository.updateBook(id, UpdateBookDto);
  }

  async deleteBook(id: string) {
    return await this.BookRepository.deleteBook(id);
  }
}
