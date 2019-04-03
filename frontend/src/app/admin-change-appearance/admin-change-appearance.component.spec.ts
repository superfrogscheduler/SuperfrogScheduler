import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChangeAppearanceComponent } from './admin-change-appearance.component';

describe('AdminChangeAppearanceComponent', () => {
  let component: AdminChangeAppearanceComponent;
  let fixture: ComponentFixture<AdminChangeAppearanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminChangeAppearanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminChangeAppearanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
