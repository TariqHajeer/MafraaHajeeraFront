import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenubarModule } from 'primeng/menubar';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { CityComponent } from './city/city.component';
import { RegionComponent } from './region/region.component';
import { FamilyComponent } from './family/family.component';
import { NationalityComponent } from './nationality/nationality.component';
import { TableModule } from 'primeng/table';
import { NgxsModule } from '@ngxs/store';
import { EntryState } from './sheard/_state/entries.state';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const PRIME_NG_MODULES = [MenubarModule, TableModule];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CityComponent,
    RegionComponent,
    FamilyComponent,
    NationalityComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ...PRIME_NG_MODULES,
    NgxsModule.forRoot([EntryState]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
