import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BeforeInsert,
  OneToOne,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { IUser } from '../../user/interface';

@Entity({ name: 'category' })
export class Category implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToOne((type) => User, (user) => user.id)
  owner: User;
}
