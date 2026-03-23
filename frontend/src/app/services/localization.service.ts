import { Injectable } from '@angular/core';
import i18next from 'i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LocalizationService {
  private languageSubject = new BehaviorSubject<string>('en');
  currentLang$ = this.languageSubject.asObservable();

  async init() {
    await i18next
      .use(HttpBackend)
      .use(LanguageDetector)
      .init({
        fallbackLng: 'en',
        backend: {
          loadPath: 'http://localhost:3000/translations/{{lng}}',
        },
        interpolation: { escapeValue: false }
      });
    
    this.languageSubject.next(i18next.language);
  }

  async changeLanguage(lang: string) {
    await i18next.changeLanguage(lang);
    this.languageSubject.next(lang);
  }

  getI18nOptions() {
    return {
      lng: i18next.language,
      resources: i18next.options.resources,
      i18next: i18next
    };
  }
}