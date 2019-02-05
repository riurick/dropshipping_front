import { TestBed, inject } from '@angular/core/testing';
import { ApiUsuariosService } from './api-usuarios.service';

describe('ApiUsuariosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiUsuariosService]
    });
  });

  it('should be created', inject([ApiUsuariosService], (service: ApiUsuariosService) => {
    expect(service).toBeTruthy();
  }));
});
