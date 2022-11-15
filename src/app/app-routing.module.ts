import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressAppComponent } from './components/address-app/address-app.component';
import { AddressMapComponent } from './components/address-map/address-map.component';
import { AddressTypeMapComponent } from './components/address-type-map/address-type-map.component';



const routes: Routes = [
  {path: '',component: AddressAppComponent},
  {path: 'map/:address',component: AddressMapComponent},
  {path: 'typemap/:client/:type',component: AddressTypeMapComponent},
  { path: '**', redirectTo: '/', pathMatch: 'full' }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [AddressAppComponent]
