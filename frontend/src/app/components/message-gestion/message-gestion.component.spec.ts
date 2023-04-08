import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageGestionComponent } from './message-gestion.component';

describe('MessageGestionComponent', () => {
  let component: MessageGestionComponent;
  let fixture: ComponentFixture<MessageGestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageGestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
