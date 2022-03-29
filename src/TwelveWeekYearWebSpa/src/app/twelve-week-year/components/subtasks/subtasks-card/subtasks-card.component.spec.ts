import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtasksCardComponent } from './subtasks-card.component';

describe('SubtasksCardComponent', () => {
  let component: SubtasksCardComponent;
  let fixture: ComponentFixture<SubtasksCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubtasksCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtasksCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
