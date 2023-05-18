import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdonnaceListComponent } from './ordonnace-list.component';

describe('OrdonnaceListComponent', () => {
  let component: OrdonnaceListComponent;
  let fixture: ComponentFixture<OrdonnaceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdonnaceListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdonnaceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
