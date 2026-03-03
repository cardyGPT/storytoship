import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Translation } from './translation.entity';

@Injectable()
export class LookupService {
  constructor(
    @InjectRepository(Translation)
    private translationRepo: Repository<Translation>,
  ) {}

  async getTranslations(module: string, locale: string): Promise<Record<string, string>> {
    const translations = await this.translationRepo.find({
      where: [{ module, locale }, { module, locale: 'en-US' }]
    });

    const dictionary: Record<string, string> = {};
    
    // Sort so English (fallback) is applied first, then specific locale overwrites
    translations.sort((a) => a.locale === 'en-US' ? -1 : 1);
    
    translations.forEach(t => {
      dictionary[t.key] = t.value;
    });

    return dictionary;
  }

  async seed() {
    const count = await this.translationRepo.count();
    if (count === 0) {
      await this.translationRepo.save([
        { module: 'rbac', locale: 'en-US', key: 'MENU_PERMISSIONS', value: 'Permissions' },
        { module: 'rbac', locale: 'en-US', key: 'MENU_ROLES', value: 'Roles' },
        { module: 'rbac', locale: 'es-ES', key: 'MENU_PERMISSIONS', value: 'Permisos' },
        { module: 'rbac', locale: 'es-ES', key: 'MENU_ROLES', value: 'Roles' },
      ]);
    }
  }
}