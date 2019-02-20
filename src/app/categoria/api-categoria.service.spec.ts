import { TestBed, inject } from '@angular/core/testing';

import { ApiCategoriaService } from './api-categoria.service';

describe('ApiCategoriaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiCategoriaService]
    });
  });

  it('should be created', inject([ApiCategoriaService], (service: ApiCategoriaService) => {
    expect(service).toBeTruthy();
  }));
});
