import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HelpService } from './services/help.service';

@Component({
  selector: 'app-root',
  template: `
    <nav>
      <h1>Cardinality Docs POC</h1>
      <button (click)="toggleHelp()">Need Help?</button>
    </nav>
    <main>
      <router-outlet></router-outlet>
      <button (click)="openContextualHelp('ops-guide')">Context Help: Operations</button>
    </main>
    <app-knowledge-sidebar></app-knowledge-sidebar>
  `
})
export class AppComponent implements OnInit {
  constructor(private route: ActivatedRoute, private helpService: HelpService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['docId']) {
        this.helpService.openHelp(params['docId']);
      }
    });
  }

  toggleHelp() { this.helpService.openHelp(); }
  openContextualHelp(slug: string) { this.helpService.openHelp(slug); }
}