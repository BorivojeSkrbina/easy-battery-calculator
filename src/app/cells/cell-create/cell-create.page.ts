import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { CellsService } from "../cells.service";
import { Cell } from "../cell.model";
import { mimeType } from './mime-type.validator';

@Component({
  selector: "app-cell-create",
  templateUrl: "./cell-create.page.html",
  styleUrls: ["./cell-create.page.scss"]
})
export class CellCreatePage implements OnInit {
  // @ViewChild('f', {static: false}) form: NgForm; template driven

  cell: Cell;
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  backPreview: string;
  pdfPreview: string;
  private mode = "create";
  private cellId: string;

  constructor(public cellService: CellsService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.minLength(3)]
      }),
      capacity: new FormControl(null, { validators: [Validators.required] }),
      current: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeType] }),
      backImage: new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeType] }),
      // pdf: new FormControl(null, { validators: [], asyncValidators: [mimeType] }),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("id")) {
        this.mode = "edit";
        this.cellId = paramMap.get("id");
        this.isLoading = true;
        this.cellService.getCell(this.cellId).subscribe(cellData => {
          this.isLoading = false;
          this.cell = {
            id: cellData._id,
            name: cellData.name,
            capacity: cellData.capacity,
            current: cellData.current,
            imagePath: cellData.imagePath,
            backImagePath: cellData.backImagePath
          };
          this.form.setValue({
            name: this.cell.name,
            capacity: this.cell.capacity,
            current: this.cell.current,
            image: this.cell.imagePath,
            backImage: this.cell.backImagePath
          });
        });
      } else {
        this.mode = "create";
        this.cellId = null;
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    console.log(this.form.get('backImage'));
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = <string>reader.result;
      console.log(this.form.get('image').valid);
    };

    reader.readAsDataURL(file);
    
  }

  onBackImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({backImage: file});
    this.form.get('backImage').updateValueAndValidity();
    console.log(this.form.get('backImage'));
    const reader = new FileReader();
    reader.onload = () => {
      this.backPreview = <string>reader.result;
      console.log(this.form.get('backImage').valid);
    };

    reader.readAsDataURL(file);
    
  }

  onPdfPicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({pdf: file});
    this.form.get('pdf').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.pdfPreview = <string>reader.result;

      console.log(this.pdfPreview);
      console.log(this.form.get('pdf').valid);
      console.log(this.pdfPreview !== '');
      
    };

    reader.readAsDataURL(file);
    
  }

  onSaveCell() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === "create") {
      this.cellService.addCell(
        this.form.value.name,
        this.form.value.capacity,
        this.form.value.current,
        this.form.value.image,
        this.form.value.backImage
      );
      this.form.reset();
    } else {
      this.cellService.updateCell(
        this.cellId,
        this.form.value.name,
        this.form.value.capacity,
        this.form.value.current,
        this.form.value.image,
        this.form.value.backImage
      );
      this.form.reset();
    }
  }
}
