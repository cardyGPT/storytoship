import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuItem } from './entities/menu-item.entity';

@Injectable()
export class LookupService {
  constructor(
    @InjectRepository(MenuItem)
    private menuRepo: Repository<MenuItem>,
  ) {}

  async getMenu(locale: string) {
    const items = await this.menuRepo.find({
      relations: ['translations'],
    });

    return items.map(item => {
      const translation = item.translations.find(t => t.locale === locale) 
                          || item.translations.find(t => t.locale === 'en');
      return {
        id: item.id,
        key: item.key,
        route: item.route,
        label: translation ? translation.translatedText : item.key
      };
    });
  }
}
