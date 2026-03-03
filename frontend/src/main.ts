import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { APP_INITIALIZER } from '@angular/core';
import { TranslationService } from './app/core/services/translation.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: (i18n: TranslationService) => () => i18n.loadTranslations('RBAC'),
      deps: [TranslationService],
      multi: true
    }
  ]
});
