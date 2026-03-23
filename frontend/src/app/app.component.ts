import { Component, OnInit } from '@angular/core';
import { LocalizationService } from './services/localization.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <nav>
        <button (click)="switchLang('en')">English</button>
        <button (click)="switchLang('de')">Deutsch</button>
      </nav>

      <div *ngIf="formConfig">
        <formio 
          [form]="formConfig" 
          [options]="formOptions">
        </formio>
      </div>
    </div>
  `
})
export class AppComponent implements OnInit {
  formConfig = {
    components: [
      {
        type: 'textfield',
        key: 'firstName',
        label: 'firstName', // Key for i18n
        placeholder: 'Enter first name',
        validate: { required: true }
      },
      {
        type: 'button',
        action: 'submit',
        label: 'submit',
        theme: 'primary'
      }
    ]
  };

  formOptions: any = {};

  constructor(private locService: LocalizationService) {}

  async ngOnInit() {
    await this.locService.init();
    this.updateFormOptions();

    this.locService.currentLang$.subscribe(() => {
      this.updateFormOptions();
    });
  }

  updateFormOptions() {
    this.formOptions = {
      i18n: this.locService.getI18nOptions()
    };
  }

  switchLang(lang: string) {
    this.locService.changeLanguage(lang);
  }
}