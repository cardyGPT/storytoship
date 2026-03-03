import { Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class LanguageStateService {
  currentLang = signal(localStorage.getItem('lang') || 'en-US');

  constructor(private translate: TranslateService) {
    this.translate.use(this.currentLang());
  }

  setLanguage(lang: string) {
    localStorage.setItem('lang', lang);
    this.currentLang.set(lang);
    this.translate.use(lang);
  }
}