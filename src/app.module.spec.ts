import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import appConfig from './config/app.config';
import { IAppConfig } from './config/config.interface';
import dbConfig from './config/db.config';
import { User } from './modules/user/entities/user.entity';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig, appConfig],
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        ...dbConfig().test,
        entities: [User],
      }),
    }),

    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModuleSpec {}