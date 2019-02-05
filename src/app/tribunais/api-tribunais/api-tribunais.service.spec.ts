import { TestBed, inject, async } from '@angular/core/testing';

import { ApiTribunaisService } from './api-tribunais.service';
import { AppModule } from '../../app.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { APP_BASE_HREF } from '@angular/common';

describe('ApiTribunaisService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        HttpClientTestingModule
      ],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
    }).compileComponents();
  }));

  it('should be created', inject([ApiTribunaisService], (service: ApiTribunaisService) => {
    expect(service).toBeTruthy();
  }));
});
