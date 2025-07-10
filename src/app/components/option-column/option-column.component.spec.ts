import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionColumnComponent } from './option-column.component';

describe('OptionColumnComponent', () => {
  let component: OptionColumnComponent;
  let fixture: ComponentFixture<OptionColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionColumnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
