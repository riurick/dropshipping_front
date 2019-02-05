import { APP_BASE_HREF } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, inject, TestBed } from '@angular/core/testing';
import { AppModule } from '../../app.module';
import { ApiTiposDeProcessosService } from './api-tipos-de-processos.service';

describe('ApiTiposDeProcessosService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        HttpClientTestingModule
      ],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
    }).compileComponents();
  }));

  it('should be created', inject([ApiTiposDeProcessosService], (service: ApiTiposDeProcessosService) => {
    expect(service).toBeTruthy();
  }));
});
