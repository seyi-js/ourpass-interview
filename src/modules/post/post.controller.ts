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
import { CreatePostDto, UpdatePostDto } from './dto';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly service: PostService) {}

  @Post()
  async create(@Body() payload: CreatePostDto, @AuthUser() user: IUser) {
    const post = await this.service.create({ ...payload, owner: user.id });

    return {
      message: 'Post created successfully',
      data: post,
    };
  }

  @Get()
  async myPosts(@AuthUser() user: IUser) {
    const posts = await this.service.find({ owner: user.id });

    return {
      message: 'Posts retrieved successfully',
      data: posts,
    };
  }

  @Put(':id')
  async update(
    @Body() payload: UpdatePostDto,
    @AuthUser() user: IUser,
    @Param('id') id: number,
  ) {
    const post = await this.service.update(id, user, payload);

    return {
      message: 'Post updated successfully',
      data: post,
    };
  }

  @Delete(':id')
  async delete(@AuthUser() user: IUser, @Param('id') id: number) {
    await this.service.delete(id, user);

    return {
      message: 'Post deleted successfully',
    };
  }
}
