import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantemProdutoComponent } from './mantem-produto.component';

describe('MantemProdutoComponent', () => {
  let component: MantemProdutoComponent;
  let fixture: ComponentFixture<MantemProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantemProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantemProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
