import { Repository } from 'typeorm';
import { Book } from '../entity/book.entity';
import { FilterBookDto } from '../dto/filterBook.dto';
import { CreateBookDto } from '../dto/createBook.dto';
import { UpdateBookDto } from '../dto/updateBook.dto';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

export interface BookRepository extends Repository<Book> {
  this: Repository<Book>;
  getBooks(filter: FilterBookDto): Promise<Book[]>;
  getBook(id: string): Promise<Book[]>;
  createBook(CreateBookDto: CreateBookDto): Promise<void>;
  updateBook(id: string, UpdateBookDto: UpdateBookDto): Promise<void>;
  deleteBook(id: string): Promise<void>;
}

export const BookRepository: Pick<BookRepository, any> = {
  getBooks(this: Repository<Book>, filter: FilterBookDto) {
    const { title, author, category, min_year, max_year } = filter;
    const query = this.createQueryBuilder('book');

    if (title) {
      query.andWhere('book.title LIKE :title', {
        title: `%${title}%`,
      });
    }

    if (author) {
      query.andWhere('book.autho) LIKE :author', {
        author: `%${author.toLocaleLowerCase}%`,
      });
    }

    if (category) {
      query.andWhere('book.categry) LIKE :category', {
        category: `%${category.toLocaleLowerCase}%`,
      });
    }

    if (min_year) {
      query.andWhere('book.year)>= :min_year', {
        min_year: `%${min_year.toLocaleLowerCase}%`,
      });
    }

    if (max_year) {
      query.andWhere('book.year)<= :max_year', {
        max_year: `%${max_year.toLocaleLowerCase}%`,
      });
    }

    return query.getMany();
  },

  getBook(this: Repository<Book>, id: string) {
    return this.findOne({ where: { id } });
  },

  createBook(this: Repository<Book>, CreateBookDto: CreateBookDto) {
    try {
      const book = this.create(CreateBookDto);
      this.save(book);
    } catch (error) {
      console.error('Error creating book:', error);
      throw new InternalServerErrorException(error);
    }
  },

  async updateBook(
    this: Repository<Book>,
    id: string,
    UpdateBookDto: UpdateBookDto,
  ) {
    try {
      const result = this.update(id, UpdateBookDto);
      if ((await result).affected == 0) {
        throw new NotFoundException(`Book with ID ${id} is not found`);
      }
    } catch (error) {
      console.error('Error update book:', error);
      throw new InternalServerErrorException(error);
    }
  },

  async deleteBook(this: Repository<Book>, id: string) {
    try {
      const result = this.delete(id);
      if ((await result).affected == 0) {
        throw new NotFoundException(`Book with ID ${id} is not found`);
      }
      console.log(await result);
    } catch (error) {
      console.error('Error delete book:', error);
      throw new InternalServerErrorException(error);
    }
  },
};
