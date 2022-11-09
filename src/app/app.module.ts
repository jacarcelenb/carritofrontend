import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilterPipe } from './shared/filter.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterPedidosPipe } from './shared/filter-pedidos.pipe';
import { FilterClientesPipe } from './shared/filter-clientes.pipe';
import { FilterProductosPipe } from './shared/filter-productos.pipe';
import { AddressAppComponent } from './components/address-app/address-app.component';
import { GoogleMapsModule } from '@angular/google-maps';
import {GMapModule} from 'primeng/gmap';


@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    FilterPedidosPipe,
    FilterClientesPipe,
    FilterProductosPipe,
    AddressAppComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    GoogleMapsModule,
    GMapModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
