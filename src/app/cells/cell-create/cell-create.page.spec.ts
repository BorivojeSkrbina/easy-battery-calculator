import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellCreatePage } from './cell-create.page';

describe('CellCreatePage', () => {
  let component: CellCreatePage;
  let fixture: ComponentFixture<CellCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellCreatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
