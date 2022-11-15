import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms'
import { GoogleMap, MapGeocoder, MapMarker } from '@angular/google-maps';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { SenderDataService } from 'src/app/service/sender-data.service';
import { AddressService } from 'src/app/service/address.service';
import { ActivatedRoute } from '@angular/router';






@Component({
  selector: 'app-address-app',
  templateUrl: './address-app.component.html',
  styleUrls: ['./address-app.component.css']
})
export class AddressAppComponent implements OnInit {
  cliente = this.actRoute.snapshot.paramMap.get("cliente");
  user = this.actRoute.snapshot.paramMap.get("username");

  list_address: any[] = [];

  list_type_address: any[] = [];

  constructor(private SenderDataService: SenderDataService,
    private addressService: AddressService,
    public actRoute: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.getAddress();
  }

  getAddress() {
    this.addressService.getClientAddress(this.cliente,this.user).subscribe((data: any) => {
      this.list_address = data.Direcciones
      this.list_type_address = data.Tipo
    })
  }



  showAddressType(address: any): string {
    let type_address = ""
    for (let index = 0; index < this.list_type_address.length; index++) {
      if (address.dir_tipo_direccion == this.list_type_address[index].tdd_tipo_direccion) {
        type_address = this.list_type_address[index].tdd_nombre
      }

    }
    return type_address
  }


}










