import { TestBed, inject } from '@angular/core/testing';

import { ApiImagemService } from './api-imagem.service';

describe('ApiImagemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiImagemService]
    });
  });

  it('should be created', inject([ApiImagemService], (service: ApiImagemService) => {
    expect(service).toBeTruthy();
  }));
});
