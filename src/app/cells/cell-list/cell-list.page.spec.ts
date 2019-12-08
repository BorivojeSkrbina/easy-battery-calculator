import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellListPage } from './cell-list.page';

describe('CellListPage', () => {
  let component: CellListPage;
  let fixture: ComponentFixture<CellListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
