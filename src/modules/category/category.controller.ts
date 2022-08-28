import { Body, Controller, Post } from '@nestjs/common';
import { AuthUser } from '../user/decorator';
import { IUser } from '../user/interface';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly servce: CategoryService) {}

  @Post()
  async create(@Body() payload: CreateCategoryDto, @AuthUser() user: IUser) {
    const category = await this.servce.create({ ...payload, owner: user.id });

    return {
      message: 'Category created successfully',
      data: category,
    };
  }
}
