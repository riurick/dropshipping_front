import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantemUsuarioComponent } from './mantem-usuario.component';

describe('MantemUsuarioComponent', () => {
  let component: MantemUsuarioComponent;
  let fixture: ComponentFixture<MantemUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantemUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantemUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
