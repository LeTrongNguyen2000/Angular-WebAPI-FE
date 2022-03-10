import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGridDataComponent } from './user-grid-data.component';

describe('UserGridDataComponent', () => {
  let component: UserGridDataComponent;
  let fixture: ComponentFixture<UserGridDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserGridDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGridDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
