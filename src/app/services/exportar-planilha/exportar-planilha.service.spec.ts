import { TestBed, inject } from '@angular/core/testing';

import { ExportarPlanilhaService } from './exportar-planilha.service';

describe('ExportarPlanilhaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExportarPlanilhaService]
    });
  });

  it('should be created', inject([ExportarPlanilhaService], (service: ExportarPlanilhaService) => {
    expect(service).toBeTruthy();
  }));
});
