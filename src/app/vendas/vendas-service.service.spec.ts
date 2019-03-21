import { TestBed, inject } from '@angular/core/testing';

import { VendasServiceService } from './vendas-service.service';

describe('VendasServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VendasServiceService]
    });
  });

  it('should be created', inject([VendasServiceService], (service: VendasServiceService) => {
    expect(service).toBeTruthy();
  }));
});
