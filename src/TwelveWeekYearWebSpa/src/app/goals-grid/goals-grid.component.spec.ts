import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalsGridComponent } from './goals-grid.component';

describe('GoalsGridComponent', () => {
  let component: GoalsGridComponent;
  let fixture: ComponentFixture<GoalsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoalsGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
