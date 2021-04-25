import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateFaceComponent } from './generate-face.component';

describe('GenerateFaceComponent', () => {
  let component: GenerateFaceComponent;
  let fixture: ComponentFixture<GenerateFaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateFaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateFaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
