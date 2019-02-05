import { APP_BASE_HREF } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, inject, TestBed } from '@angular/core/testing';
import { AppModule } from '../../app.module';
import { ApiSubtemasService } from './api-subtemas.service';

describe('ApiSubtemasService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        HttpClientTestingModule
      ],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
    }).compileComponents();
  }));

  it('should be created', inject([ApiSubtemasService], (service: ApiSubtemasService) => {
    expect(service).toBeTruthy();
  }));
});
