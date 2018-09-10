import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteLayoutsComponent } from './site-layouts.component';

describe('SiteLayoutsComponent', () => {
  let component: SiteLayoutsComponent;
  let fixture: ComponentFixture<SiteLayoutsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteLayoutsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteLayoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
