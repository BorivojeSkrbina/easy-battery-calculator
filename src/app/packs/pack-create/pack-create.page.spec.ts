import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackCreatePage } from './pack-create.page';

describe('PackCreatePage', () => {
  let component: PackCreatePage;
  let fixture: ComponentFixture<PackCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackCreatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
