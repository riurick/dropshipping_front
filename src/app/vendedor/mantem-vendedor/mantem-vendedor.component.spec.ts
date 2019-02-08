import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantemVendedorComponent } from './mantem-vendedor.component';

describe('MantemVendedorComponent', () => {
  let component: MantemVendedorComponent;
  let fixture: ComponentFixture<MantemVendedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantemVendedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantemVendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
