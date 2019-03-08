import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutosVendasComponent } from './produtos-vendas.component';

describe('ProdutosVendasComponent', () => {
  let component: ProdutosVendasComponent;
  let fixture: ComponentFixture<ProdutosVendasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdutosVendasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutosVendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
