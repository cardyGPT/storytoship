import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';

export interface MenuItem {
  key: string;
  label: string;
}

@Injectable({ providedIn: 'root' })
export class MenuService {
  private currentLang = new BehaviorSubject<string>('en');
  lang$ = this.currentLang.asObservable();

  constructor(private http: HttpClient) {}

  setLanguage(lang: string) {
    this.currentLang.next(lang);
  }

  getMenu(): Observable<MenuItem[]> {
    return this.lang$.pipe(
      switchMap(lang => {
        const headers = new HttpHeaders().set('Accept-Language', lang);
        return this.http.get<MenuItem[]>('http://localhost:3000/api/menus', { headers });
      })
    );
  }
}