import { TestBed } from '@angular/core/testing';

import { ImagenService } from './imagen.service';

describe('ImagenServiceService', () => {
  let service: ImagenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImagenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
