import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErroAcessoComponent } from './erro-acesso.component';

describe('ErroAcessoComponent', () => {
  let component: ErroAcessoComponent;
  let fixture: ComponentFixture<ErroAcessoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErroAcessoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErroAcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
