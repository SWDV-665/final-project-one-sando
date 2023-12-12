import { TestBed } from '@angular/core/testing';

import { PromptServiceService } from './prompt-service.service';

describe('PromptServiceService', () => {
  let service: PromptServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromptServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
