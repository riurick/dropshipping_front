import { TestBed, inject } from '@angular/core/testing';

import { ApiFornecedorService } from './api-fornecedor.service';

describe('ApiFornecedorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiFornecedorService]
    });
  });

  it('should be created', inject([ApiFornecedorService], (service: ApiFornecedorService) => {
    expect(service).toBeTruthy();
  }));
});
