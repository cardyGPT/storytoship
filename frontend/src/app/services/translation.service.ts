import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private apiUrl = 'http://localhost:3000/api/translations';
  public currentLocale = signal('en-US');
  public translations = signal<Record<string, string>>({});

  constructor(private http: HttpClient) {}

  loadTranslations(module: string): Observable<any> {
    const locale = this.currentLocale();
    return this.http.get(`${this.apiUrl}?locale=${locale}&module=${module}`).pipe(
      tap((res: any) => this.translations.set(res))
    );
  }

  setLocale(locale: string, module: string) {
    this.currentLocale.set(locale);
    this.loadTranslations(module).subscribe();
  }

  translate(key: string): string {
    return this.translations()[key] || key;
  }
}