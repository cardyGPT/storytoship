import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../core/services/translation.service';
import { TranslatePipe } from '../../core/pipes/translate.pipe';

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  template: `
    <nav class="sidebar">
      <ul>
        <li>{{ 'MENU_DASHBOARD' | translate }}</li>
        <li class="active">
          {{ 'MENU_PERMISSIONS' | translate }}
          <ul>
            <li>{{ 'PERM_ROLES' | translate }}</li>
            <li>{{ 'PERM_USERS' | translate }}</li>
          </ul>
        </li>
      </ul>
      <div class="lang-switcher">
        <button (click)="changeLang('en')">EN</button>
        <button (click)="changeLang('fr')">FR</button>
      </div>
    </nav>
  `,
  styles: [`
    .sidebar { width: 250px; background: #f4f4f4; padding: 20px; }
    .active { font-weight: bold; color: #007bff; }
    .lang-switcher { margin-top: 50px; }
  `]
})
export class NavMenuComponent {
  private i18n = inject(TranslationService);

  changeLang(lang: string) {
    this.i18n.setLocale(lang);
  }
}
