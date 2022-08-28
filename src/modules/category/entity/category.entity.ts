import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Post } from '../../post/entity/post-entity';
import { User } from '../../user/entity/user.entity';
import { IUser } from '../../user/interface';
import { ICategory } from '../interface';

@Entity({ name: 'category' })
export class Category implements ICategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne((type) => User, (user) => user.id)
  @JoinColumn({ name: 'owner' })
  owner: string | IUser;

  @OneToMany((type) => Post, (post) => post.category)
  posts: Post[];
}
