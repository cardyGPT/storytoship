import { Controller, Get, Headers } from '@nestjs/common';
import { LookupService } from './lookup.service';

@Controller('lookup')
export class LookupController {
  constructor(private readonly lookupService: LookupService) {}

  @Get('menu')
  getLocalizedMenu(@Headers('accept-language') lang: string) {
    const locale = lang?.split(',')[0] || 'en';
    return this.lookupService.getMenu(locale);
  }
}
