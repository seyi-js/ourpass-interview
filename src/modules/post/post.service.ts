import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { filterFields } from '../../../utils';
import { IUser } from '../user/interface';
import { Post } from './entity/post-entity';
import { IPost } from './interface';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async create(payload: IPost) {
    return await this.postRepository.save(payload);
  }

  async findOne(payload: Record<string, unknown>) {
    const post = await this.postRepository.findOne({
      where: payload,
      relations: ['owner', 'category'],
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  async update(id: number, user: IUser, payload: IPost) {
    const post = await this.findOne({ owner: user.id, id });

    const filtered = filterFields(payload, 'title', 'description', 'category');

    return await this.postRepository.save({ ...post, ...filtered });
  }

  async delete(id: number, user: IUser) {
    await this.findOne({ owner: user.id, id });

    await this.postRepository.delete({ id });
  }

  async find(payload: Record<string, unknown>) {
    return await this.postRepository.find({
      where: payload,
      relations: ['owner', 'category'],
    });
  }
}
