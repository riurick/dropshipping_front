import { TestBed, inject } from '@angular/core/testing';

import { ApiClienteService } from './api-cliente.service';

describe('ApiClienteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiClienteService]
    });
  });

  it('should be created', inject([ApiClienteService], (service: ApiClienteService) => {
    expect(service).toBeTruthy();
  }));
});
