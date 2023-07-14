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
import { UpdateBookDto } from './dto/updateBook.dto';
import { UUIDValidationPipe } from 'src/pipe/uuid-validation.pipe';

@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService) {}

  @Get()
  getAllBooks(@Query() filter: FilterBookDto) {
    return this.bookService.getBooks(filter);
  }

  @Get('/:id')
  getBook(@Param('id', UUIDValidationPipe) id: string) {
    return this.bookService.getBook(id);
  }

  @Post()
  createBook(@Body() payload: CreateBookDto) {
    this.bookService.createBook(payload);
  }

  @Put('/:id')
  updateBook(
    @Param('id', UUIDValidationPipe) id: string,
    @Body() payload: UpdateBookDto,
  ) {
    this.bookService.updateBook(id, payload);
  }

  @Delete('/:id')
  deleteBook(@Param('id', UUIDValidationPipe) id: string) {
    this.bookService.deleteBook(id);
  }
}
