import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxDataGridModule, DxDataGridComponent } from 'devextreme-angular';
import { GridA11yDirective } from './directives/grid-a11y.directive';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DxDataGridModule, GridA11yDirective, HttpClientModule],
  template: `
    <div class="grid-container" role="main">
      <h1>User Management - ADA Compliant Grid</h1>
      
      <dx-data-grid 
        [dataSource]="users"
        [showBorders]="true"
        [focusedRowEnabled]="true"
        (onContentReady)="a11y.onContentReady = $event"
        (onOptionChanged)="handleOptionChange($event)"
        appGridA11y
        #a11y="appGridA11y">
        
        <dxo-filter-row [visible]="true"></dxo-filter-row>
        <dxo-header-filter [visible]="true"></dxo-header-filter>
        <dxo-paging [pageSize]="10"></dxo-paging>
        <dxo-pager [showPageSizeSelector]="true" [showInfo]="true"></dxo-pager>

        <dxi-column dataField="fullName" caption="Full Name" aria-sort="none"></dxi-column>
        <dxi-column dataField="role" aria-sort="none"></dxi-column>
        <dxi-column dataField="status" aria-sort="none"></dxi-column>
      </dx-data-grid>
    </div>
  `,
  styles: [`
    .grid-container { padding: 20px; }
    :host ::ng-deep .dx-datagrid-focus-overlay {
      border: 3px solid #005a9c !important;
    }
    :host ::ng-deep [tabindex="0"]:focus {
      outline: 3px solid #ffbf47 !important;
      outline-offset: -3px;
    }
  `]
})
export class AppComponent implements OnInit {
  users: any[] = [];
  @ViewChild('a11y') a11yDirective!: GridA11yDirective;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('http://localhost:3000/api/users').subscribe(data => {
      this.users = data;
    });
  }

  handleOptionChange(e: any) {
    if (e.fullName === 'items') {
      this.a11yDirective.announceStatus(`Grid updated, ${this.users.length} items loaded`);
    }
  }
}