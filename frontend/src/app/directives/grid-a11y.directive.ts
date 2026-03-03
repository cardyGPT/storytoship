import { Directive, ElementRef, Input, OnDestroy, AfterViewInit } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DxDataGridComponent } from 'devtools-extreme-angular';

@Directive({
  selector: '[appGridA11y]',
  standalone: true
})
export class GridA11yDirective implements AfterViewInit {
  constructor(private el: ElementRef, private announcer: LiveAnnouncer) {}

  ngAfterViewInit() {
    const gridEl = this.el.nativeElement;
    // Inject Grid Role
    const container = gridEl.querySelector('.dx-datagrid');
    if (container) {
      container.setAttribute('role', 'grid');
      container.setAttribute('aria-label', 'Data records grid');
    }
  }

  @Input() set onContentReady(event: any) {
    this.applyAriaRoles();
  }

  private applyAriaRoles() {
    const rows = this.el.nativeElement.querySelectorAll('.dx-data-row');
    rows.forEach((row: HTMLElement) => {
      row.setAttribute('role', 'row');
      const cells = row.querySelectorAll('td');
      cells.forEach((cell: HTMLElement) => {
        cell.setAttribute('role', 'gridcell');
        cell.setAttribute('tabindex', '0');
      });
    });
  }

  announceStatus(message: string) {
    this.announcer.announce(message, 'polite');
  }
}