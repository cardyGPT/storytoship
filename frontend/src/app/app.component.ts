import { Component } from '@angular/core';
import { NavMenuComponent } from './features/rbac/nav-menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavMenuComponent],
  template: `<app-nav-menu></app-nav-menu>`
})
export class AppComponent {}
