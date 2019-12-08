import { Cell } from "./cell.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { environment } from "../../environments/environment";
const BACKEND_URL = environment.apiUrl + "/cells/";

@Injectable({ providedIn: "root" })
export class CellsService {
  private cells: Cell[] = [];

  private cellsUpdated = new Subject<Cell[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getCells() {
    this.http
      .get<{ message: string; cells: any }>(BACKEND_URL)
      .pipe(
        map(cellData => {
          return cellData.cells.map(cell => {
            return {
              name: cell.name,
              capacity: cell.capacity,
              current: cell.current,
              id: cell._id,
              imagePath: cell.imagePath,
              backImagePath: cell.backImagePath
            };
          });
        })
      )
      .subscribe(transformedCells => {
        this.cells = transformedCells;
        this.cellsUpdated.next([...this.cells]);
      });
  }

  getCellUpdateListener() {
    return this.cellsUpdated.asObservable();
  }

  getCell(id: string) {
    return this.http.get<{
      _id: string;
      name: string;
      capacity: number;
      current: number;
      imagePath: string;
      backImagePath: string;
    }>(BACKEND_URL + id);
  }

  addCell(name: string, capacity: number, current: number, image: File, backImage: File) {
    console.log(name, capacity, current, image, backImage);
    const cellData = new FormData();
    cellData.append("name", name);
    cellData.append("capacity", capacity.toString());
    cellData.append("current", current.toString());
    cellData.append("image", image, name);
    cellData.append("backImage", backImage, name);
    // return;
    this.http
      .post<{ message: string; cell: Cell }>(
        BACKEND_URL,
        cellData
      )
      .subscribe(resData => {
        const cell: Cell = {
          id: resData.cell.id,
          name: name,
          capacity: capacity,
          current: current,
          imagePath: resData.cell.imagePath,
          backImagePath: resData.cell.backImagePath
        };
        this.cells.push(cell);
        this.cellsUpdated.next([...this.cells]);
        this.router.navigate(["/"]);
      });
  }

  updateCell(
    id: string,
    name: string,
    capacity: number,
    current: number,
    image: File | string,
    backImage: File | string
  ) {
    let cellData: Cell | FormData;
    if (typeof image === "object" || typeof backImage === "object") {
      
      cellData = new FormData();
      cellData.append("id", id);
      cellData.append("name", name);
      cellData.append("capacity", capacity.toString());
      cellData.append("current", current.toString());
      cellData.append("image", image, name);
      cellData.append("backImage", backImage, name);
    } else {
      cellData = {
        id: id,
        name: name,
        capacity: capacity,
        current: current,
        imagePath: image,
        backImagePath: backImage
      };
    }
    // console.log(cellData.entries());
    this.http
      .put(BACKEND_URL + id, cellData)
      .subscribe(response => {
        const updatedCells = [...this.cells];
        const oldCellIndex = updatedCells.findIndex(c => c.id === id);
        const cell: Cell = {
          id: id,
          name: name,
          capacity: capacity,
          current: current,
          imagePath: "",
          backImagePath: ""
        };
        updatedCells[oldCellIndex] = cell;
        this.cells = updatedCells;
        this.cellsUpdated.next([...this.cells]);
        this.router.navigate(["/"]);
      });
  }

  deleteCell(cellId: string) {
    this.http
      .delete(BACKEND_URL + cellId)
      .subscribe(() => {
        const updatedCells = this.cells.filter(cell => cell.id !== cellId);
        this.cells = updatedCells;
        this.cellsUpdated.next([...this.cells]);
      });
  }
}
