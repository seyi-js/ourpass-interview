import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from './dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  async create(@Body() payload: CreateUserDTO) {
    await this.service.create(payload);

    return 'User created successfully';
  }
}
