import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';

import { BwtTabComponent } from './bwt-tab.component';

describe('BwtTabComponent', () => {
  let component: BwtTabComponent;
  let fixture: ComponentFixture<BwtTabComponent>;

  const matDialogMock = {
    open: jasmine.createSpy('open')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BwtTabComponent],
      providers: [
        { provide: MatDialog, useValue: matDialogMock } 
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(BwtTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
