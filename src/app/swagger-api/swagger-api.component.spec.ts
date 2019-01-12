import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwaggerApiComponent } from './swagger-api.component';

describe('SwaggerApiComponent', () => {
  let component: SwaggerApiComponent;
  let fixture: ComponentFixture<SwaggerApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwaggerApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwaggerApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
