import { Component, OnInit, effect } from '@angular/core';
import { TranslationService } from './services/translation.service';

@Component({
  selector: 'app-root',
  template: `
    <nav class="sidebar">
      <div class="lang-picker">
        <button (click)="changeLang('en-US')">EN</button>
        <button (click)="changeLang('es-ES')">ES</button>
      </div>
      <ul class="menu">
        <li><i class="icon"></i> {{ ts.translate('permissions') }}</li>
        <li><i class="icon"></i> {{ ts.translate('roles') }}</li>
      </ul>
    </nav>
    <main>
      <h1>RBAC Management</h1>
      <p>Current Locale: {{ ts.currentLocale() }}</p>
    </main>
  `,
  styles: [`
    .sidebar { width: 250px; background: #f4f4f4; height: 100vh; padding: 20px; }
    .menu { list-style: none; padding: 0; }
    .menu li { padding: 10px; border-bottom: 1px solid #ddd; cursor: pointer; }
    .lang-picker { margin-bottom: 20px; }
    button { margin-right: 5px; cursor: pointer; }
  `]
})
export class AppComponent implements OnInit {
  constructor(public ts: TranslationService) {}

  ngOnInit() {
    this.ts.loadTranslations('rbac_menu').subscribe();
  }

  changeLang(lang: string) {
    this.ts.setLocale(lang, 'rbac_menu');
  }
}