import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { filterFields } from '../../../utils';
import { User } from './entity/user.entity';
import { IUser } from './interface';
import { IJwtPayload } from './interface/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwt: JwtService,
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
    const result = await this.userRepository.findOne({
      where: payload,
      relations: ['categories', 'categories.posts'],
    });

    if (!result) {
      throw new NotFoundException('User not found');
    }

    return result;
  }

  async find(payload: Record<string, any>) {
    const users = await this.userRepository.find({
      where: payload,
      relations: ['categories'],
    });

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

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      select: ['password'],
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValid = await user.isPasswordValid(password);

    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const jwtPayload: IJwtPayload = {
      id: user.id,
    };

    const accessToken = await this.jwt.signAsync(jwtPayload);

    return accessToken;
  }
}
