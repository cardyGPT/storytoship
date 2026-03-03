import { Injectable, PipeTransform, Pipe, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subscription, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private currentLang = 'es'; // Default
  private cache: Record<string, string> = {};
  private apiUrl = 'http://localhost:3000/translations';

  constructor(private http: HttpClient) {}

  setLanguage(lang: string) {
    this.currentLang = lang;
  }

  translate(text: string, type: 'field' | 'error' = 'field') {
    const cacheKey = `${this.currentLang}:${text}`;
    if (this.cache[cacheKey]) return of(this.cache[cacheKey]);

    return this.http.post<{ translatedText: string }>(`${this.apiUrl}/translate`, {
      text,
      lang: this.currentLang,
      type
    }).pipe(
      map(res => res.translatedText),
      tap(val => this.cache[cacheKey] = val),
      catchError(() => of(text))
    );
  }
}

@Pipe({
  name: 'autoTranslate',
  pure: false
})
export class AutoTranslatePipe implements PipeTransform, OnDestroy {
  private lastValue: string;
  private lastResult: string;
  private sub: Subscription;

  constructor(private translationService: TranslationService, private _ref: ChangeDetectorRef) {}

  transform(value: string, type: 'field' | 'error' = 'field'): string {
    if (value === this.lastValue) return this.lastResult;
    
    this.lastValue = value;
    this.sub?.unsubscribe();

    this.sub = this.translationService.translate(value, type).subscribe(res => {
      this.lastResult = res;
      this._ref.markForCheck();
    });

    return this.lastResult || value;
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}