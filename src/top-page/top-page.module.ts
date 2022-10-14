import { Module } from '@nestjs/common';
import { TopPageController } from './top-page.controller';

@Module({
  controllers: [TopPageController],
  providers: []
})
export class TopPageModule {}
