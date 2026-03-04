import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from './entities/menu.entity';

@Injectable()
export class MenusService {
  constructor(
    @InjectRepository(Menu)
    private menuRepo: Repository<Menu>,
  ) {}

  async getLocalizedMenu(lang: string = 'en') {
    const menus = await this.menuRepo.find({
      relations: ['translations'],
      where: { isActive: true }
    });

    return menus.map(m => {
      const translation = m.translations.find(t => t.langCode === lang) 
        || m.translations.find(t => t.langCode === 'en');
      return {
        key: m.key,
        label: translation ? translation.label : m.key
      };
    });
  }
}