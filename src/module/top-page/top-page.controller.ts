import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IdValidationPipe } from 'src/pipes/add-validation.pipe';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { TOP_PAGE_CONSTANTS } from './top-page.constants';
import { TopPageService } from './top-page.service';

@Controller('top-page')
export class TopPageController {
  constructor(private readonly topPageService: TopPageService) {}

  @Post('create')
  async create(@Body() dto: CreateTopPageDto) {
    const topPage = await this.topPageService.create(dto);
    if (!topPage) {
      throw new NotFoundException(TOP_PAGE_CONSTANTS.aliasErr);
    }
    return topPage;
  }

  @Get(':id')
  async get(@Param('id', IdValidationPipe) id: string) {
    const topPage = await this.topPageService.findById(id);
    if (!topPage) {
      throw new NotFoundException(TOP_PAGE_CONSTANTS.notFound);
    }
    return topPage;
  }

  @Get('byAlias/:alias')
  async getByAlias(@Param('alias') alias: string) {
    const topPage = await this.topPageService.findByAlias(alias);
    if (!topPage) {
      throw new NotFoundException(TOP_PAGE_CONSTANTS.notFound);
    }
    return topPage;
  }

  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    const removedPage = await this.topPageService.deleteById(id);
    if (!removedPage) {
      throw new NotFoundException(TOP_PAGE_CONSTANTS.notFound);
    }
    return removedPage;
  }

  @Patch(':id')
  async patch(@Param('id', IdValidationPipe) id: string, @Body() dto: CreateTopPageDto) {
    const updatedTopPage = await this.topPageService.updateById(id, dto);
    if (!updatedTopPage) {
      throw new NotFoundException(TOP_PAGE_CONSTANTS.notFound);
    }
    return updatedTopPage;
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('find')
  async find(@Body() dto: FindTopPageDto) {
    const topPage = await this.topPageService.findByCategory(dto.firstCategory);

    if (!topPage) {
      throw new NotFoundException(TOP_PAGE_CONSTANTS.notFound);
    }
    return topPage;
  }
}
