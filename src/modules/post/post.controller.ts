import { Body, Controller, Post } from '@nestjs/common';
import { AuthUser } from '../user/decorator';
import { IUser } from '../user/interface';
import { CreatePostDto } from './dto';
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
}
