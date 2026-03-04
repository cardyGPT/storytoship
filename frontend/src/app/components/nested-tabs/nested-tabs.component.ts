import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nested-tabs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="tabs-container" [class.nested]="level > 0">
      <nav class="tab-bar">
        @for (tab of tabs; track tab.id) {
          <a
            [routerLink]="[tab.path]"
            routerLinkActive="active"
            class="tab-link"
          >
            {{ tab.label }}
          </a>
        }
      </nav>
      <div class="tab-content">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    .tab-bar { display: flex; border-bottom: 2px solid #eee; gap: 20px; margin-bottom: 1rem; }
    .tab-link { padding: 10px 15px; text-decoration: none; color: #666; font-weight: 500; }
    .tab-link.active { border-bottom: 3px solid #007bff; color: #007bff; }
    .nested .tab-bar { border-bottom: 1px solid #ddd; font-size: 0.9em; }
  `]
})
export class NestedTabsComponent {
  @Input() tabs: any[] = [];
  @Input() level: number = 0;
}
