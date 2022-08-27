import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.POSTGRES_DATABASE_HOST,
  port: process.env.POSTGRES_DATABASE_PORT
    ? parseFloat(process.env.POSTGRES_DATABASE_PORT)
    : 5432,
  username: process.env.POSTGRES_DATABASE_USER,
  password: process.env.POSTGRES_DATABASE_PASSWORD,
  database: process.env.POSTGRES_DATABASE_NAME,
  synchronize: true,
  migrationsTableName: 'migrations',

  migrations: ['dist/database/migrations/**/*{.ts,.js}'],
  migrationsRun: true,
  migrationsTransactionMode: 'all',
  autoLoadEntities: true,
});
