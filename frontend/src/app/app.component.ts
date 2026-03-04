import { Component, OnInit } from '@angular/core';
import { NavService } from './services/nav.service';

@Component({
  selector: 'app-root',
  template: `
    <header>
      <h1>Elixir Labs Platform</h1>
    </header>
    <main>
      <app-nested-tabs [tabs]="navConfig" [level]="0"></app-nested-tabs>
    </main>
  `
})
export class AppComponent implements OnInit {
  navConfig = [];
  constructor(private navService: NavService) {}
  ngOnInit() {
    this.navService.getConfig().subscribe(config => this.navConfig = config);
  }
}
