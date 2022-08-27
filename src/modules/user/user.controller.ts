import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { AuthUser, Public } from './decorator';
import { CreateUserDTO, UpdateProfileDTO } from './dto';
import { IUser } from './interface';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Public()
  @Post()
  async create(@Body() payload: CreateUserDTO) {
    await this.service.create(payload);

    return 'User created successfully';
  }

  @Get()
  async findAll() {
    return await this.service.find({});
  }

  @Put()
  async update(@Body() payload: UpdateProfileDTO, @AuthUser() user: IUser) {
    return await this.service.update(user.id, payload);
  }
}
