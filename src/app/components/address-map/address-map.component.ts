import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { SenderDataService } from 'src/app/service/sender-data.service';

@Component({
  selector: 'app-address-map',
  templateUrl: './address-map.component.html',
  styleUrls: ['./address-map.component.css']
})
export class AddressMapComponent implements AfterViewInit, OnInit {
  @ViewChild('inputPlaces')
  inputPlaces!: ElementRef;
  @ViewChild("placesRef") placesRef: GooglePlaceDirective | undefined;
  latitude: number | undefined;
  longitude: number | undefined;
  @ViewChild(GoogleMap)
  map!: google.maps.Map;
  @ViewChild(MapMarker) markerposition: MapMarker | undefined

  clickMap: boolean = false;

  markerOptions: google.maps.MarkerOptions = {
    draggable: true,
    title: "Usted está aquí"
  };
  markerPositions: google.maps.LatLngLiteral[] = [];
  newPoisiton: google.maps.LatLngLiteral[] = [];
  options: google.maps.MapOptions = {
    center: { lat: 0.3517100, lng: -78.1223300 },
    zoom: 12,
    fullscreenControl: false,
    disableDefaultUI: false,
    mapTypeControl: false

  };



  constructor(private SenderDataService: SenderDataService) {
  }
  ngOnInit(): void {
    this.SenderDataService.sender.subscribe((data: any) => {
      console.log(data)
    })
  }
  addMarker(event: google.maps.MapMouseEvent) {
    console.log(this.markerPositions)
    // vaciar la lista
    this.markerPositions = []
    if (this.markerPositions.length == 0) {
      this.markerPositions.push(event.latLng!.toJSON());
    }
  }


  public handleAddressChange(address: Address) {
    console.log(address)
  }


  ngAfterViewInit(): void {
    const searchBox = new google.maps.places.SearchBox(
      this.inputPlaces.nativeElement
    );
    console.log(searchBox)
    this.map?.controls[google.maps.ControlPosition.TOP_CENTER].push(
      this.inputPlaces.nativeElement
    )

    console.log(this.inputPlaces.nativeElement)

    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces()
      if (places?.length == 0) {
        return;
      }
      const bounds = new google.maps.LatLngBounds();
      console.log(places)
      this.latitude = places![0].geometry?.location?.lat()
      this.longitude = places![0].geometry?.location?.lng()

      places?.forEach(place => {
        if (!place.geometry || !place.geometry.location) {
          return;
        }
        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport)
        } else {
          bounds.extend(place.geometry.location)


        }
      })


      this.markerPositions.push({ lat: this.latitude!, lng: this.longitude! })

      if (this.markerPositions.length > 0) {
        this.newPoisiton.push(this.markerPositions[this.markerPositions.length - 1])
        console.log(this.newPoisiton)
        // vaciar la lista
        this.markerPositions = []
        console.log(this.markerPositions)
        this.markerPositions.push(this.newPoisiton[0])
        console.log(this.markerPositions)
        this.newPoisiton = []

      }
      this.map?.fitBounds(bounds)



    })
  }

  showValues() {
    let positions =[]
    console.log(this.markerposition?.getPosition()?.lat())
    console.log(this.markerposition?.getPosition()?.lng())

     const position ={
      latitude:this.markerposition?.getPosition()?.lat(),
      longitude:this.markerposition?.getPosition()?.lng()
     }

    positions.push(position)

    console.log("Ultima posicion")
    console.log(positions[positions.length-1])

  }

}
