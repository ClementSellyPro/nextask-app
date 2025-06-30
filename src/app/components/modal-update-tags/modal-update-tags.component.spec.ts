import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUpdateTagsComponent } from './modal-update-tags.component';

describe('ModalUpdateTagsComponent', () => {
  let component: ModalUpdateTagsComponent;
  let fixture: ComponentFixture<ModalUpdateTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalUpdateTagsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalUpdateTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
