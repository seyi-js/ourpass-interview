import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export interface IAppConfig {
  port: number;
  environment: string;
  jwtSecret: string;
  appURL: string;
  publicKey: string;
  privateKey: string;
}

export interface IDataBaseConfig {
  test: TypeOrmModuleOptions;
  development: TypeOrmModuleOptions;
  production: TypeOrmModuleOptions;
}
