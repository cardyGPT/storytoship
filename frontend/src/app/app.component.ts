import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoTranslatePipe, TranslationService } from './shared/translation.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, AutoTranslatePipe],
  template: `
    <div class="p-8">
      <h1 class="text-2xl font-bold mb-4">Cardinality i18N Engine</h1>
      
      <div class="mb-4">
        <label>Select Language: </label>
        <select (change)="changeLang($event)" class="border p-1">
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="zh">Chinese</option>
        </select>
      </div>

      <div class="card bg-gray-100 p-4 rounded shadow">
        <h2 class="font-semibold text-blue-600">{{ 'System Status' | autoTranslate }}</h2>
        <p>{{ 'Welcome to the automated localization dashboard.' | autoTranslate }}</p>
        
        <div class="mt-4 p-2 bg-red-100 border-l-4 border-red-500 text-red-700">
           <strong>Error:</strong> {{ 'The database connection timed out after 30 seconds.' | autoTranslate:'error' }}
        </div>
      </div>
    </div>
  `
})
export class AppComponent {
  constructor(private translationService: TranslationService) {}

  changeLang(event: any) {
    this.translationService.setLanguage(event.target.value);
  }
}