
import { User } from './../../shared/user.model';
import { UserService } from './../../shared/user.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

//@Input()

  @Output() valueChange = new EventEmitter();

  constructor(public service: UserService) { }
  user: User = new User();

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.service.formData.id == 0)
    {
      this.addUser();
    }
    else
      this.UpdateUser();
  }

  addUser() {
    var user = {
      id: this.service.formData.id,
      userCode: this.service.formData.userCode,
      userName: this.service.formData.userName,
      userDepartment: this.service.formData.userDepartment,
      userPosition: this.service.formData.userPosition  
    }
    this.service.addUser(user).subscribe();
  }

  UpdateUser() {
    this.service.updateUser().subscribe()
  }

  DeleteUser(id: number) {
    this.service.deleteUser(id).subscribe()
  }

  onSearch() {
    this.Search();
  }

  Search() {
    this.service.getUser(this.service.formData.id).subscribe(res=>{
      if(res)
        this.valueChange.emit(res);
    });
  }
}
