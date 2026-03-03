import { Injectable, signal, computed, effect } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private _currentLocale = signal(localStorage.getItem('locale') || 'en');
  
  readonly currentLocale = this._currentLocale.asReadonly();

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en');
    this.translate.use(this._currentLocale());

    effect(() => {
      const lang = this._currentLocale();
      this.translate.use(lang);
      localStorage.setItem('locale', lang);
    });
  }

  setLanguage(lang: string) {
    this._currentLocale.set(lang);
  }
}
