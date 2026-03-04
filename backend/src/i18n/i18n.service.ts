import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Translation } from './entities/translation.entity';

@Injectable()
export class I18nService {
  constructor(
    @InjectRepository(Translation)
    private repo: Repository<Translation>,
  ) {}

  async getTranslations(locale: string, moduleKey: string): Promise<Record<string, string>> {
    const data = await this.repo.find({ where: { locale, moduleKey } });
    
    // Fallback to en-US if no data found and locale is not already en-US
    if (data.length === 0 && locale !== 'en-US') {
      return this.getTranslations('en-US', moduleKey);
    }

    return data.reduce((acc, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {});
  }

  async seed() {
    const items = [
      { locale: 'en-US', moduleKey: 'rbac_menu', key: 'permissions', value: 'Permissions' },
      { locale: 'en-US', moduleKey: 'rbac_menu', key: 'roles', value: 'Roles' },
      { locale: 'es-ES', moduleKey: 'rbac_menu', key: 'permissions', value: 'Permisos' },
      { locale: 'es-ES', moduleKey: 'rbac_menu', key: 'roles', value: 'Roles' },
    ];
    for (const item of items) {
      await this.repo.upsert(item, ['locale', 'moduleKey', 'key']);
    }
  }
}