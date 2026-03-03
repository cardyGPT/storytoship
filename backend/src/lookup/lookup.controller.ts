import { Controller, Get, Query } from '@nestjs/common';
import { LookupService } from './lookup.service';

@Controller('api/lookup')
export class LookupController {
  constructor(private readonly lookupService: LookupService) {}

  @Get('translations')
  async getTranslations(
    @Query('module') module: string,
    @Query('locale') locale: string
  ) {
    return this.lookupService.getTranslations(module, locale);
  }
}