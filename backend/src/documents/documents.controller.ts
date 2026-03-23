import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { DocumentsService } from './documents.service';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly docsService: DocumentsService) {}

  @Get()
  findAll(@Query('search') search?: string) {
    return this.docsService.findAll(search);
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.docsService.findOne(slug);
  }

  @Post()
  create(@Body() data: any) {
    return this.docsService.create(data);
  }
}