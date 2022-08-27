import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import { Hash } from '../utils/hash';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  //   @OneToMany()
  // posts: Post[];

  async isPasswordValid(password: string) {
    return await Hash.comparePassword(password, this.password);
  }

  @BeforeInsert()
  async hashPassword() {
    this.password = await Hash.hashPassword(this.password);
  }
}
