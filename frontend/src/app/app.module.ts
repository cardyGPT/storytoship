import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RbacMenuComponent } from './components/rbac-menu.component';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    RbacMenuComponent
  ],
  providers: [],
})
export class AppModule {}