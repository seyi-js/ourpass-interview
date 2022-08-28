import { IDataBaseConfig } from './config.interface';

export default (): IDataBaseConfig => ({
  test: {
    type: 'better-sqlite3',
    name: 'ourpass_db',
    database: ':memory:',
    dropSchema: true,
    synchronize: true,
    autoLoadEntities: true,
  },
  development: {
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

    migrations: ['dist/src/database/migrations/**/*{.ts,.js}'],
    migrationsRun: true,
    migrationsTransactionMode: 'all',
    autoLoadEntities: true,
  },
  production: {
    type: 'postgres',
    host: process.env.POSTGRES_DATABASE_HOST,
    port: process.env.POSTGRES_DATABASE_PORT
      ? parseFloat(process.env.POSTGRES_DATABASE_PORT)
      : 5432,
    username: process.env.POSTGRES_DATABASE_USER,
    password: process.env.POSTGRES_DATABASE_PASSWORD,
    database: process.env.POSTGRES_DATABASE_NAME,
    synchronize: false,
    migrationsTableName: 'migrations',

    migrations: ['dist/src/database/migrations/**/*{.ts,.js}'],
    migrationsRun: true,
    migrationsTransactionMode: 'all',
    autoLoadEntities: true,
  },
});
