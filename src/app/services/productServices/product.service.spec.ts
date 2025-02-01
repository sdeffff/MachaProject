import { TestBed } from '@angular/core/testing';

import { JeansService } from './product.service';

describe('JeansService', () => {
  let service: JeansService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JeansService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
