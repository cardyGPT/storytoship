import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { AppComponent } from './app.component';
import { RbacMenuComponent } from './rbac/rbac-menu.component';
import { RbacMenuLoader } from './core/rbac-menu.loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new RbacMenuLoader(http);
}

@NgModule({
  declarations: [AppComponent, RbacMenuComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}