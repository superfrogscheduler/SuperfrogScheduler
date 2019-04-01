import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateAppearanceComponent } from './admin-create-appearance.component';

describe('AdminCreateAppearanceComponent', () => {
  let component: AdminCreateAppearanceComponent;
  let fixture: ComponentFixture<AdminCreateAppearanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCreateAppearanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCreateAppearanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
