import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import appConfig from './config/app.config';
import { IAppConfig } from './config/config.interface';
import dbConfig from './config/db.config';
import { CategoryModule } from './modules/category/category.module';
import { Category } from './modules/category/entity/category.entity';
import { Post } from './modules/post/entity/post-entity';
import { PostModule } from './modules/post/post.module';
import { User } from './modules/user/entity/user.entity';
import { CustomAuthGuard } from './modules/user/jwt/auth-guard';
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
        entities: [User, Category, Post],
      }),
    }),

    UserModule,
    CategoryModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: CustomAuthGuard }],
})
export class AppModuleSpec {}
