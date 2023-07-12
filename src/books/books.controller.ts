import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/createBook.dto';
import { FilterBookDto } from './dto/filterBook.dto';

@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService) {}

  @Get()
  getAllBooks(@Query() filter: FilterBookDto) {
    return this.bookService.getAllBooks(filter);
  }

  @Get('/:id')
  getBook(@Param('id') id: string) {
    return this.bookService.getBook(id);
  }

  @Post()
  createBook(@Body() payload: CreateBookDto) {
    this.bookService.createBook(payload);
    // return this.bookService.getAllBooks();
  }

  @Put('/:id')
  updateBook(@Param('id') id: string, @Body() payload: CreateBookDto) {
    this.bookService.updateBook(id, payload);
    // return this.bookService.getAllBooks();
  }

  @Delete('/:id')
  deleteBook(@Param('id') id: string) {
    this.bookService.deleteBook(id);
    // return this.bookService.getAllBooks();
  }
}
