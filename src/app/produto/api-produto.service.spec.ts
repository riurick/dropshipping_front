import { TestBed, inject } from '@angular/core/testing';

import { ApiProdutoService } from './api-produto.service';

describe('ApiProdutoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiProdutoService]
    });
  });

  it('should be created', inject([ApiProdutoService], (service: ApiProdutoService) => {
    expect(service).toBeTruthy();
  }));
});
