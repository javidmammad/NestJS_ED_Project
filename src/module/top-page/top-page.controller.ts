import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { TopPageModel } from './top-page.model';

@Controller('top-page')
export class TopPageController {
  constructor(private readonly configService: ConfigService) {}

  @Post('create')
  async create(@Body() dto: Omit<TopPageModel, '_id'>) {
    this.configService.get('TEST');
    return 'response';
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return '';
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return '';
  }

  @Patch(':id')
  async patch(@Param('id') id: string, dto: TopPageModel) {
    return '';
  }

  @HttpCode(200)
  @Post()
  async find(@Body() dto: FindTopPageDto) {}
}
