import { TestBed, inject } from '@angular/core/testing';

import { GlobalpropertiesService } from './globalproperties.service';

describe('GlobalpropertiesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalpropertiesService]
    });
  });

  it('should ...', inject([GlobalpropertiesService], (service: GlobalpropertiesService) => {
    expect(service).toBeTruthy();
  }));
});
