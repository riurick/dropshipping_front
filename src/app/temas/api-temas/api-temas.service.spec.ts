import { async, inject, TestBed } from '@angular/core/testing';
import { AppModule } from '../../app.module';
import { ApiTemasService } from './api-temas.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { APP_BASE_HREF } from '@angular/common';

describe('ApiTemasService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        HttpClientTestingModule
      ],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
    }).compileComponents();
  }));

  it('should be created', inject([ApiTemasService], (service: ApiTemasService) => {
    expect(service).toBeTruthy();
  }));
});
