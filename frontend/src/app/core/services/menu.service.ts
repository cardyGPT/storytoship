import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LanguageService } from './language.service';
import { Observable, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MenuService {
  private http = inject(HttpClient);
  private langService = inject(LanguageService);

  getMenuItems(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Accept-Language': this.langService.currentLocale()
    });
    return this.http.get<any[]>('/api/lookup/menu', { headers });
  }
}
