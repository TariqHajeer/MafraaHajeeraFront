import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityComponent } from './city/city.component';
import { RegionComponent } from './region/region.component';
import { NationalityComponent } from './nationality/nationality.component';
import { FamilyComponent } from './family/family.component';

const routes: Routes = [
  { path: 'city', component: CityComponent },
  { path: 'region', component: RegionComponent },
  { path: 'nationality', component: NationalityComponent },
  { path: 'family', component: FamilyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
