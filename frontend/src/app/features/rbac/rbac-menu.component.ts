import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../core/services/language.service';
import { MenuService } from '../../core/services/menu.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-rbac-menu',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div class="menu-container">
      <div class="lang-switcher">
        <button (click)="changeLang('en')">EN</button>
        <button (click)="changeLang('es')">ES</button>
      </div>

      <nav>
        <ul>
          <li *ngFor="let item of menuItems$ | async">
             {{ item.label }} 
          </li>
        </ul>
      </nav>

      <div class="static-strings">
        <h3>{{ 'rbac.permissions.title' | translate }}</h3>
        <p>{{ 'rbac.permissions.description' | translate }}</p>
      </div>
    </div>
  `,
  styles: [`
    .menu-container { padding: 20px; font-family: sans-serif; }
    .lang-switcher { margin-bottom: 20px; }
    button { margin-right: 10px; cursor: pointer; }
    ul { list-style: none; padding: 0; }
    li { padding: 10px; background: #f4f4f4; margin-bottom: 5px; border-radius: 4px; }
  `]
})
export class RbacMenuComponent {
  private langService = inject(LanguageService);
  private menuService = inject(MenuService);

  menuItems$ = toObservable(this.langService.currentLocale).pipe(
    switchMap(() => this.menuService.getMenuItems())
  );

  changeLang(lang: string) {
    this.langService.setLanguage(lang);
  }
}
