import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReactiveFormsComponent } from './user-reactive-forms.component';

describe('UserReactiveFormsComponent', () => {
  let component: UserReactiveFormsComponent;
  let fixture: ComponentFixture<UserReactiveFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserReactiveFormsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserReactiveFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
