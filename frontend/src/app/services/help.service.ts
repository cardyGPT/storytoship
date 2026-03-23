import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export interface HelpDoc {
  id: string;
  title: string;
  content: string;
  slug: string;
}

@Injectable({ providedIn: 'root' })
export class HelpService {
  private apiUrl = 'http://localhost:3000/api/documents';
  private sidebarOpen = new BehaviorSubject<boolean>(false);
  private activeDoc = new BehaviorSubject<HelpDoc | null>(null);

  sidebarOpen$ = this.sidebarOpen.asObservable();
  activeDoc$ = this.activeDoc.asObservable();

  constructor(private http: HttpClient) {}

  openHelp(slug?: string) {
    if (slug) {
      this.http.get<HelpDoc>(`${this.apiUrl}/${slug}`).subscribe(doc => {
        this.activeDoc.next(doc);
        this.sidebarOpen.next(true);
      });
    } else {
      this.sidebarOpen.next(true);
    }
  }

  closeHelp() {
    this.sidebarOpen.next(false);
  }

  searchDocs(query: string): Observable<HelpDoc[]> {
    return this.http.get<HelpDoc[]>(`${this.apiUrl}?search=${query}`);
  }
}