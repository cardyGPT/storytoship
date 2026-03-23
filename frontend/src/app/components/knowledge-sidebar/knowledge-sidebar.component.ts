import { Component, OnInit } from '@angular/core';
import { HelpService, HelpDoc } from '../services/help.service';

@Component({
  selector: 'app-knowledge-sidebar',
  template: `
    <div class="sidebar" [class.open]="isOpen$ | async">
      <div class="header">
        <h3>Help Center</h3>
        <button (click)="close()">×</button>
      </div>
      <div class="content" *ngIf="activeDoc$ | async as doc; else searchTpl">
        <button (click)="backToSearch()">< Back</button>
        <h2>{{ doc.title }}</h2>
        <div class="markdown-body">{{ doc.content }}</div>
      </div>
      <ng-template #searchTpl>
        <div class="search-box">
          <input #s (keyup.enter)="search(s.value)" placeholder="Search documentation...">
        </div>
        <div class="results">
          <div *ngFor="let result of results" (click)="openDoc(result.slug)" class="result-item">
            {{ result.title }}
          </div>
        </div>
      </ng-template>
    </div>
  `,
  styles: [`
    .sidebar {
      position: fixed; right: -400px; top: 0; width: 400px; height: 100%;
      background: white; box-shadow: -2px 0 5px rgba(0,0,0,0.1);
      transition: right 0.3s; z-index: 1000; padding: 20px;
    }
    .sidebar.open { right: 0; }
    .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #eee; }
    .result-item { padding: 10px; cursor: pointer; border-bottom: 1px solid #f0f0f0; }
    .result-item:hover { background: #f9f9f9; }
  `]
})
export class KnowledgeSidebarComponent {
  isOpen$ = this.helpService.sidebarOpen$;
  activeDoc$ = this.helpService.activeDoc$;
  results: HelpDoc[] = [];

  constructor(private helpService: HelpService) {}

  close() { this.helpService.closeHelp(); }
  search(q: string) { this.helpService.searchDocs(q).subscribe(res => this.results = res); }
  openDoc(slug: string) { this.helpService.openHelp(slug); }
  backToSearch() { /* Implementation to reset activeDoc Subject */ }
}