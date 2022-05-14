import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FcsContainComponent } from './fcs-contain.component';

describe('FcsContainComponent', () => {
  let component: FcsContainComponent;
  let fixture: ComponentFixture<FcsContainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FcsContainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FcsContainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
