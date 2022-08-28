import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Category } from '../../category/entity/category.entity';
import { User } from '../../user/entity/user.entity';
import { IUser } from '../../user/interface';
import { IPost } from '../interface';

@Entity({ name: 'category' })
export class Post implements IPost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne((type) => User, (user) => user.id)
  @JoinColumn()
  owner: number | IUser;

  @ManyToOne((type) => Category, (category) => category.id)
  @JoinColumn()
  category: number | Category;
}
