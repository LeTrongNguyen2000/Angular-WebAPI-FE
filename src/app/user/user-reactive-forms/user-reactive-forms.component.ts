import { EditService } from './../../shared/edit.service';
import { User } from 'src/app/shared/user.model';
import { Observable } from "rxjs";
import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { GridDataResult } from "@progress/kendo-angular-grid";
import { State, process } from "@progress/kendo-data-query";


import { map } from "rxjs/operators";

@Component({
  selector: 'app-user-reactive-forms',
  templateUrl: './user-reactive-forms.component.html',
  styleUrls: ['./user-reactive-forms.component.scss']
})
export class UserReactiveFormsComponent implements OnInit {

  public view!: Observable<GridDataResult>;
  public gridState: State = {
    sort: [],
    skip: 0,
    take: 10,
  };
  public formGroup!: FormGroup;

  private editService!: EditService;
  private editedRowIndex!: number;

  constructor(@Inject(EditService) editServiceFactory: any) {
    this.editService = editServiceFactory();
  }

  public ngOnInit(): void {
    this.view = this.editService.pipe(
      map((data) => process(data, this.gridState))
    );

    this.editService.read();
  }

  public onStateChange(state: State) {
    this.gridState = state;

    this.editService.read();
  }

  cellClickHandler(event:any){
console.log(event);
  }
}
