import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BeforeInsert,
  Generated,
  PrimaryColumn,
} from 'typeorm';
import { Category } from '../../category/entity/category.entity';
import { IUser } from '../interface';
import { Hash } from '../utils/hash';

@Entity({ name: 'user' })
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  // @PrimaryColumn({ name: 'id' })
  // @Generated('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    select: false,
  })
  password: string;

  @OneToMany((type) => Category, (category) => category.owner)
  categories: Category[];

  async isPasswordValid(password: string) {
    return await Hash.comparePassword(password, this.password);
  }

  @BeforeInsert()
  async hashPassword() {
    this.password = await Hash.hashPassword(this.password);
  }
}
