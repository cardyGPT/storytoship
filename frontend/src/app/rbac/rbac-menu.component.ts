import { Component } from '@angular/core';
import { LanguageStateService } from '../core/language-state.service';

@Component({
  selector: 'app-rbac-menu',
  template: `
    <nav class="rbac-menu">
      <ul>
        <li>{{ 'MENU_PERMISSIONS' | translate }}</li>
        <li>{{ 'MENU_ROLES' | translate }}</li>
      </ul>
      <div class="lang-toggle">
        <button (click)="changeLang('en-US')">EN</button>
        <button (click)="changeLang('es-ES')">ES</button>
      </div>
    </nav>
  `,
  styles: [`.rbac-menu { padding: 20px; border: 1px solid #ccc; } ul { list-style: none; }`]
})
export class RbacMenuComponent {
  constructor(private langService: LanguageStateService) {}

  changeLang(lang: string) {
    this.langService.setLanguage(lang);
  }
}