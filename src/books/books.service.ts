import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateBookDto } from './dto/createBook.dto';
import { UpdateBookDto } from './dto/updateBook.dto';
import { FilterBookDto } from './dto/filterBook.dto';

@Injectable()
export class BooksService {
  private books: any[] = [];

  getAllBooks(FilterBookDto: FilterBookDto): any[] {
    const { title, author, category, min_year, max_year } = FilterBookDto;
    const books = this.books.filter((book) => {
      if (title && book.title != title) {
        return false;
      }

      if (author && book.author != author) {
        return false;
      }

      if (category && book.category != category) {
        return false;
      }

      if (min_year && book.min_year < min_year) {
        return false;
      }

      if (max_year && book.max_year > max_year) {
        return false;
      }

      return true;
    });
    return books;
  }

  getBook(id: string) {
    const bookIndex = this.findBookById(id);
    return this.books[bookIndex];
  }

  findBookById(id: string) {
    const bookIndex = this.books.findIndex((book) => book.id === id);
    if (bookIndex === -1) {
      throw new NotFoundException(
        `Book with this id: ${bookIndex} is not found !`,
      );
    }
    return bookIndex;
  }

  createBook(CreateBookDto: CreateBookDto) {
    const { title, author, category, year } = CreateBookDto;

    this.books.push({
      id: uuidv4(),
      title,
      author,
      category,
      year,
    });
  }

  updateBook(id: string, UpdateBookDto: UpdateBookDto) {
    const { title, author, category, year } = UpdateBookDto;
    const bookIndex = this.findBookById(id);
    this.books[bookIndex].title = title;
    this.books[bookIndex].author = author;
    this.books[bookIndex].category = category;
    this.books[bookIndex].year = year;
  }

  deleteBook(id: string) {
    const bookIndex = this.findBookById(id);
    console.log(this.books);
    this.books.splice(bookIndex, 1);
  }
}
