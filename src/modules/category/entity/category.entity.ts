import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
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

  @OneToOne((type) => User, (user) => user.id)
  @JoinColumn()
  owner: number | IUser;
}
