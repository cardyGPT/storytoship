import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuService, MenuItem } from '../services/menu.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rbac-menu',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="rbac-nav">
      <div class="lang-switcher">
        <button (click)="changeLang('en')">EN</button>
        <button (click)="changeLang('es')">ES</button>
      </div>
      <ul>
        <li *ngFor="let item of menu$ | async">
          {{ item.label }}
        </li>
      </ul>
    </nav>
  `,
  styles: [`
    .rbac-nav { padding: 1rem; border-bottom: 1px solid #ccc; }
    .lang-switcher { margin-bottom: 1rem; }
    button { margin-right: 0.5rem; cursor: pointer; }
    ul { list-style: none; display: flex; gap: 20px; }
    li { font-weight: bold; text-transform: uppercase; }
  `]
})
export class RbacMenuComponent implements OnInit {
  menu$!: Observable<MenuItem[]>;

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    this.menu$ = this.menuService.getMenu();
  }

  changeLang(lang: string) {
    this.menuService.setLanguage(lang);
  }
}