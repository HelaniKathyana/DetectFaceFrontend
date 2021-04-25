import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFaceComponent } from './edit-face.component';

describe('EditFaceComponent', () => {
  let component: EditFaceComponent;
  let fixture: ComponentFixture<EditFaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
