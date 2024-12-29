import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JeansComponent } from './jeans.component';

describe('JeansComponent', () => {
  let component: JeansComponent;
  let fixture: ComponentFixture<JeansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JeansComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JeansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
