import { TestBed, inject } from '@angular/core/testing';

import { ApiVendedorService } from './api-vendedor.service';

describe('ApiVendedorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiVendedorService]
    });
  });

  it('should be created', inject([ApiVendedorService], (service: ApiVendedorService) => {
    expect(service).toBeTruthy();
  }));
});
