import { TestBed } from '@angular/core/testing';

import { ProprietariosService } from './proprietarios.service';

describe('ProprietariosService', () => {
  let service: ProprietariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProprietariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
