import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AuthUser, Public } from './decorator';
import { CreateUserDTO, LoginDTO, UpdateProfileDTO } from './dto';
import { IUser } from './interface';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Public()
  @Post()
  async create(@Body() payload: CreateUserDTO) {
    await this.service.create(payload);

    return {
      message: 'User created successfully',
    };
  }

  @Get()
  async findAll() {
    const users = await this.service.find({});

    return {
      message: 'Users retrieved successfully',
      data: users,
    };
  }

  @Put()
  async update(@Body() payload: UpdateProfileDTO, @AuthUser() user: IUser) {
    const result = await this.service.update(user.id, payload);

    return {
      message: 'User updated successfully',
      data: result,
    };
  }

  @Public()
  @Post('/login')
  async login(@Body() payload: LoginDTO) {
    const accessToken = await this.service.login(
      payload.email,
      payload.password,
    );

    return {
      message: 'User logged in successfully',
      data: {
        accessToken,
      },
    };
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    await this.service.delete(id);

    return {
      message: 'User deleted successfully',
    };
  }
}
