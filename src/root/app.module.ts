import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { ProductModule } from 'src/product/product.module';
import { ReviewModule } from 'src/review/review.module';
import { TopPageModule } from 'src/top-page/top-page.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [AuthModule, ProductModule, ReviewModule, TopPageModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
