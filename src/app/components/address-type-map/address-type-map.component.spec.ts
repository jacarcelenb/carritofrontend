import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressTypeMapComponent } from './address-type-map.component';

describe('AddressTypeMapComponent', () => {
  let component: AddressTypeMapComponent;
  let fixture: ComponentFixture<AddressTypeMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressTypeMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressTypeMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
