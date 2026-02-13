import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingComponentComponent } from './pending-component.component';

describe('PendingComponentComponent', () => {
  let component: PendingComponentComponent;
  let fixture: ComponentFixture<PendingComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
