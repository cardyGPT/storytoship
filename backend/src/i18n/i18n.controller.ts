import { Controller, Get, Query } from '@nestjs/common';
import { I18nService } from './i18n.service';

@Controller('translations')
export class I18nController {
  constructor(private readonly i18nService: I18nService) {}

  @Get()
  get(@Query('locale') locale: string, @Query('module') module: string) {
    return this.i18nService.getTranslations(locale || 'en-US', module || 'common');
  }

  @Get('seed')
  seed() {
    return this.i18nService.seed();
  }
}