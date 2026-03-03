import { Injectable, Inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private currentLocale = signal<string>('en');
  private dictionary = signal<Record<string, string>>({});

  constructor(private http: HttpClient) {}

  get locale() { return this.currentLocale.asReadonly(); }

  setLocale(locale: string) {
    this.currentLocale.set(locale);
    this.loadTranslations('RBAC');
  }

  loadTranslations(module: string) {
    const locale = this.currentLocale();
    this.http.get<Record<string, string>>(`http://localhost:3000/api/v1/lookup/translations/${locale}/${module}`)
      .subscribe(data => {
        this.dictionary.update(prev => ({ ...prev, ...data }));
      });
  }

  translate(key: string): string {
    return this.dictionary()[key] || key;
  }
}
