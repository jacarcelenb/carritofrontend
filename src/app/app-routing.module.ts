import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorpageComponent } from './component/errorpage/errorpage.component';
import { AddressAppComponent } from './components/address-app/address-app.component';
import { AddressMapComponent } from './components/address-map/address-map.component';
import { AddressTypeMapComponent } from './components/address-type-map/address-type-map.component';



const routes: Routes = [
  {path: 'address/:cliente/:username',component: AddressAppComponent},
  {path: 'map/:address/:cliente/:username',component: AddressMapComponent},
  {path: 'typemap/:client/:type',component: AddressTypeMapComponent},
  {path: '', component: ErrorpageComponent, pathMatch: 'full' }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [AddressAppComponent]
