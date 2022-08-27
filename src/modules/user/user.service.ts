import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { filterFields } from '../../../utils';
import { User } from './entities/user.entity';
import { IUser } from './interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(payload: IUser) {
    const record = await this.userRepository.findOne({
      where: { email: payload.email },
    });

    if (record) {
      throw new ConflictException('User already exists');
    }

    const user = this.userRepository.create(payload);

    const savedUser = await this.userRepository.save(user);

    return savedUser;
  }

  async findOne(payload: Record<string, any>) {
    const result = await this.userRepository.findOne({ where: payload });

    if (!result) {
      throw new NotFoundException('User not found');
    }

    return result;
  }

  async find(payload: Record<string, any>) {
    const users = await this.userRepository.find({ where: payload });

    return users;
  }

  async update(id: number, payload: IUser) {
    const user = await this.findOne({ id });

    const filtered = filterFields(
      payload,
      'firstName',
      'lastName',
      'email',
      'password',
    );

    return await this.userRepository.save({
      ...user,
      ...filtered,
    });
  }

  async delete(id: number) {
    await this.userRepository.delete({ id });
  }
}
