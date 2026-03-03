import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { TranslationService } from './translation.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('lookup/translations')
export class TranslationController {
  constructor(private readonly translationService: TranslationService) {}

  @Get(':locale/:module')
  async getTranslations(
    @Param('locale') locale: string,
    @Param('module') module: string,
  ) {
    return this.translationService.getTranslations(locale, module);
  }
}
