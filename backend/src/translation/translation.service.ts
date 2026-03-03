import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { I18nLookup } from './entities/i18n-lookup.entity';

@Injectable()
export class TranslationService {
  constructor(
    @InjectRepository(I18nLookup)
    private readonly repo: Repository<I18nLookup>,
  ) {}

  async getTranslations(locale: string, module: string): Promise<Record<string, string>> {
    // 1. Try requested locale
    let items = await this.repo.find({ where: { locale, module } });

    // 2. Fallback to 'en' if no items found
    if (items.length === 0 && locale !== 'en') {
      items = await this.repo.find({ where: { locale: 'en', module } });
    }

    const dict: Record<string, string> = {};
    items.forEach(item => {
      dict[item.key] = item.value;
    });

    return dict;
  }
}
