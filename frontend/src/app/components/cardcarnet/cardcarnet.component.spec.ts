import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardcarnetComponent } from './cardcarnet.component';

describe('CardcarnetComponent', () => {
  let component: CardcarnetComponent;
  let fixture: ComponentFixture<CardcarnetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardcarnetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardcarnetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
