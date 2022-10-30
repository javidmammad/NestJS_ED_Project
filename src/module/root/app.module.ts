import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { getMongoConfig } from 'src/config/mongo.config';
import { AuthModule } from 'src/module/auth/auth.module';
import { ProductModule } from 'src/module/product/product.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TopPageModule } from '../top-page/top-page.module';
import { ReviewModule } from '../review/review.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig
    }),
    AuthModule,
    ProductModule,
    ReviewModule,
    TopPageModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
