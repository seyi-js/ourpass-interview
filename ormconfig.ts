/* eslint-disable @typescript-eslint/no-var-requires */
import { Category } from './src/modules/category/entity/category.entity';
import { Post } from './src/modules/post/entity/post-entity';
import { User } from './src/modules/user/entity/user.entity';

const dotenv = require('dotenv');

dotenv.config();

export default {
  type: 'postgres',
  host: process.env.POSTGRES_DATABASE_HOST,
  port: process.env.POSTGRES_DATABASE_PORT
    ? parseFloat(process.env.POSTGRES_DATABASE_PORT)
    : 5432,
  username: process.env.POSTGRES_DATABASE_USER,
  password: process.env.POSTGRES_DATABASE_PASSWORD,
  database: process.env.POSTGRES_DATABASE_NAME,
  entities: [User, Category, Post],
  synchronize: true,
  logging: false,
  seeds: ['src/database/seeder/seeds/**/*{.ts,.js}'],
  factories: ['src/database/seeder/factories/**/*{.ts,.js}'],
};
