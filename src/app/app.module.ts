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
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {DialogModule} from 'primeng/dialog';
import { AddressMapComponent } from './components/address-map/address-map.component';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import { AddressTypeMapComponent } from './components/address-type-map/address-type-map.component';
import { ErrorpageComponent } from './component/errorpage/errorpage.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    FilterPedidosPipe,
    FilterClientesPipe,
    FilterProductosPipe,
    AddressAppComponent,
    AddressMapComponent,
    AddressTypeMapComponent,
    ErrorpageComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    GoogleMapsModule,
    GMapModule,
    GooglePlaceModule,
    DynamicDialogModule,
    DialogModule,
    ButtonModule,
    TableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
