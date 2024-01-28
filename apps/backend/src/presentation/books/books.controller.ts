import { Controller, Param, Get, Post, HttpCode } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetBookByIDInteractor } from '../../usecases/book/get-book-by-id/interactor';
import { CreateBookInteractor } from '../../usecases/book/create-book/interactor';
import { CreateBookRequest } from './requests';
import { Body } from '@nestjs/common/decorators';
import { BookResponse } from './responses';
import { ParseIntPipe } from '@nestjs/common/pipes';

@Controller('books')
@ApiTags('Book')
export class BookController {
  constructor(
    private readonly createBookUsecase: CreateBookInteractor,
    private readonly getBookByIDUsecase: GetBookByIDInteractor,
  ) {}

  @Post()
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'The book has been successfully created.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async createBook(@Body() body: CreateBookRequest) {
    const res = await this.createBookUsecase.execute({
      name: body.name,
      uuid: body.uuid,
      price: body.price,
    });

    return new BookResponse(res.book);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Get book by ID.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async getBookByID(@Param('id', ParseIntPipe) id: number) {
    const res = await this.getBookByIDUsecase.execute({
      id: id,
    });

    return res.book !== null ? new BookResponse(res.book) : null;
  }
}
