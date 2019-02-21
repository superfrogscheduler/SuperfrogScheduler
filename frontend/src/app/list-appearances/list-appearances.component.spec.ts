import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAppearancesComponent } from './list-appearances.component';

describe('ListAppearancesComponent', () => {
  let component: ListAppearancesComponent;
  let fixture: ComponentFixture<ListAppearancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAppearancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAppearancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
