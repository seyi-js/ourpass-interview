export interface IAppConfig {
  port: number;
  environment: string;
}

export interface IDataBaseConfig {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
}
