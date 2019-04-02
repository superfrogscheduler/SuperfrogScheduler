import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPayrollAppearancesComponent } from './list-payroll-appearances.component';

describe('ListPayrollAppearancesComponent', () => {
  let component: ListPayrollAppearancesComponent;
  let fixture: ComponentFixture<ListPayrollAppearancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPayrollAppearancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPayrollAppearancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
