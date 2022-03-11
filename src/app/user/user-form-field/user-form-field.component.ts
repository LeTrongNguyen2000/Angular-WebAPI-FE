import { UserService } from './../../shared/user.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-user-form-field',
  templateUrl: './user-form-field.component.html',
  styleUrls: ['./user-form-field.component.scss']
})

export class UserFormFieldComponent implements OnInit {

  @Output() valueChange  = new EventEmitter();
  listUser : any;

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

  public submitForm(): void {
    this.formValue.markAllAsTouched();
    if(this.userService.formData.id == 0)
    {
      this.addUser();
    }
    else
      this.updateUser();
    
      
  }

  addUser() {
    let userService = this.userService.formData;
    var user = new User(userService.code,userService.firstName,userService.lastName,userService.id,userService.position,userService.title,userService.departmentId,userService.name);
    this.userService.addUser(user).subscribe();
  }

  updateUser() {
    this.userService.updateUser().subscribe();
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe();
  }

  public clearForm(): void {
    this.formValue.reset();
  }

  // onSearch() {
  //   this.search();
  // }

  // search() {
  //   this.userService.filterUser(this.userService.formData.userName).subscribe(res=>{
  //     if(res)
  //       this.valueChange.emit(res);  
  //   });
  // }
}
