import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { Cell } from "../cell.model";
import { CellsService } from "../cells.service";

@Component({
  selector: "app-cell-list",
  templateUrl: "./cell-list.page.html",
  styleUrls: ["./cell-list.page.scss"]
})
export class CellListPage implements OnInit, OnDestroy {
  cells: Cell[] = [];
  isLoading = false;
  private cellsSub: Subscription;

  constructor(public cellsService: CellsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.cellsService.getCells();
    this.cellsService.getCellUpdateListener().subscribe((cells: Cell[]) => {
      this.isLoading = false;
      this.cells = cells;
    });
  }

  ionViewWillEnter() {}

  onDelete(cellId: string) {
    this.cellsService.deleteCell(cellId);
  }

  ngOnDestroy() {
    if (this.cellsSub) {
      this.cellsSub.unsubscribe();
    }
  }
}
