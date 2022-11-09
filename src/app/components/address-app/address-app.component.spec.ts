import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressAppComponent } from './address-app.component';

describe('AddressAppComponent', () => {
  let component: AddressAppComponent;
  let fixture: ComponentFixture<AddressAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressAppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
