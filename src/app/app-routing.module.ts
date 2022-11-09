import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressAppComponent } from './components/address-app/address-app.component';



const routes: Routes = [
  {path: '',component: AddressAppComponent}


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [AddressAppComponent]
