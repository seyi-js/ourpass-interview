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

    await this.userRepository.save(user);
  }

  async findOne(payload: Record<string, any>) {
    const result = await this.userRepository.findOne({ where: payload });

    if (!result) {
      throw new NotFoundException('User not found');
    }

    return result;
  }

  async find(payload: Record<string, any>) {
    return await this.userRepository.find({ where: payload });
  }

  async update(id: number, payload: IUser) {
    const filtered = filterFields(
      payload,
      'firstName',
      'lastName',
      'email',
      'password',
    );

    return await this.userRepository.update(id, filtered);
  }
}
