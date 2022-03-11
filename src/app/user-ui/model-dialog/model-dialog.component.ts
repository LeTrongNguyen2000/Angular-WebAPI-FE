import { UserService } from './../../shared/user.service';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-model-dialog',
  templateUrl: './model-dialog.component.html',
  styleUrls: ['./model-dialog.component.scss']
})
export class ModelDialogComponent implements OnInit {

  constructor(public userService: UserService) { }

  ngOnInit(): void {
  }

  public formValue: FormGroup = new FormGroup({
    code: new FormControl(),
    firstName: new FormControl(),
    lastName: new FormControl(),
    title: new FormControl(),
    department: new FormControl(),
    position: new FormControl(),
  });

  editUser(selectedRecord : any) {
    this.userService.formData = selectedRecord.dataItem;
    console.log("edit", selectedRecord.dataItem);
  }

  public listDepartment: Array<string> = ["Ban giám đốc", "Ban tổng giám đốc", "Bộ phận tính lương", "Bộ phận chấm công", "Bộ phận IT"];

}
