import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormFieldComponent } from './user-form-field.component';

describe('UserFormFieldComponent', () => {
  let component: UserFormFieldComponent;
  let fixture: ComponentFixture<UserFormFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserFormFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
