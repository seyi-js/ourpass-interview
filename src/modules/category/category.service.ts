import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { filterFields } from '../../../utils';
import { IUser } from '../user/interface';
import { Category } from './entity/category.entity';
import { ICategory } from './interface';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(payload: ICategory) {
    return await this.categoryRepository.save(payload);
  }

  async find(payload: Record<string, unknown>) {
    return await this.categoryRepository.find({
      where: { ...payload },
      relations: ['owner', 'posts'],
    });
  }

  async findOne(payload: Record<string, unknown>) {
    const category = await this.categoryRepository.findOne({
      where: payload,
      relations: ['owner', 'posts'],
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async update(id: number, user: IUser, payload: ICategory) {
    const category = await this.findOne({ owner: { id: user.id }, id });

    const filtered = filterFields(payload, 'name', 'description');

    return await this.categoryRepository.save({ ...category, ...filtered });
  }

  async delete(id: number, user: IUser) {
    await this.findOne({ owner: { id: user.id }, id });

    await this.categoryRepository.delete({ id });
  }
}
