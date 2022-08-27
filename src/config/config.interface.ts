import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export interface IAppConfig {
  port: number;
  environment: string;
}

export interface IDataBaseConfig {
  test: TypeOrmModuleOptions;
  development: TypeOrmModuleOptions;
  production: TypeOrmModuleOptions;
}
