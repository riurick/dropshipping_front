import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantemFornecedorComponent } from './mantem-fornecedor.component';

describe('MantemFornecedorComponent', () => {
  let component: MantemFornecedorComponent;
  let fixture: ComponentFixture<MantemFornecedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantemFornecedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantemFornecedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
