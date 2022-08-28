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

@Entity({ name: 'post' })
export class Post implements IPost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne((type) => User, (user) => user.id)
  @JoinColumn({ name: 'owner' })
  owner: string | IUser;

  @ManyToOne((type) => Category, (category) => category.id)
  @JoinColumn()
  category: number | Category;
}
