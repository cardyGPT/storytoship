import { Controller, Post, Body, Get, Query, UseGuards } from '@nestjs/common';
import { TranslationService } from './translation.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('translations')
export class TranslationController {
  constructor(private readonly translationService: TranslationService) {}

  @Post('translate')
  @UseGuards(JwtAuthGuard)
  async translate(@Body() body: { text: string; lang: string; type?: 'error' | 'field' }) {
    const result = await this.translationService.translate(body.text, body.lang, body.type);
    return { translatedText: result };
  }
}