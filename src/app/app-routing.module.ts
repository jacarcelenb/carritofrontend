import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressAppComponent } from './components/address-app/address-app.component';
import { AddressMapComponent } from './components/address-map/address-map.component';



const routes: Routes = [
  {path: '',component: AddressAppComponent},
  {path: 'map',component: AddressMapComponent}



];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [AddressAppComponent]
