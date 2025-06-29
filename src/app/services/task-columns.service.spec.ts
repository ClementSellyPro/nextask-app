import { TestBed } from '@angular/core/testing';

import { TaskColumnsService } from './task-columns.service';

describe('TaskColumnsService', () => {
  let service: TaskColumnsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskColumnsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
