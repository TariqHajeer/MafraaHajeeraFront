/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ServiceFactoryService } from './service-factory.service';

describe('Service: ServiceFactory', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiceFactoryService]
    });
  });

  it('should ...', inject([ServiceFactoryService], (service: ServiceFactoryService) => {
    expect(service).toBeTruthy();
  }));
});
