import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import appConfig from './config/app.config';
import dbConfig from './config/db.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig, appConfig],
    }),
    TypeOrmModule.forRoot({
      ...dbConfig(),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
