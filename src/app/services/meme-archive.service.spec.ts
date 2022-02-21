import { TestBed } from '@angular/core/testing';

import { MemeArchiveService } from './meme-archive.service';

describe('MemeArchiveService', () => {
  let service: MemeArchiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemeArchiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
