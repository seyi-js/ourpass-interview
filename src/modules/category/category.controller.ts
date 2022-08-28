import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AuthUser } from '../user/decorator';
import { IUser } from '../user/interface';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto';
import { UpdateCategoryDto } from './dto/update.category';

@Controller('categories')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @Post()
  async create(@Body() payload: CreateCategoryDto, @AuthUser() user: IUser) {
    const category = await this.service.create({ ...payload, owner: user.id });

    return {
      message: 'Category created successfully',
      data: category,
    };
  }

  @Get()
  async find(@AuthUser() user: IUser) {
    const categories = await this.service.find({ owner: { id: user.id } });

    return {
      message: 'Categories found successfully',
      data: categories,
    };
  }

  @Put('/:id')
  async update(
    @AuthUser() user: IUser,
    @Body() payload: UpdateCategoryDto,
    @Param('id') id: number,
  ) {
    const category = await this.service.update(id, user, payload);

    return {
      message: 'Category updated successfully',
      data: category,
    };
  }

  @Delete('/:id')
  async delete(@AuthUser() user: IUser, @Param('id') id: number) {
    await this.service.delete(id, user);

    return {
      message: 'Category deleted successfully',
    };
  }
}
