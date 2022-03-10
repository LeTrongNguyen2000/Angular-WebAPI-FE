
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

  constructor(public userService: UserService) { }
  //user: User = new User();

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.userService.formData.id == 0)
    {
      this.addUser();
    }
    else
      this.updateUser();
  }

  addUser() {
    let userService = this.userService.formData;
    var user = new User(userService.userCode,userService.userName,userService.department,userService.id,userService.position);
    this.userService.addUser(user).subscribe();
  }

  updateUser() {
    this.userService.updateUser().subscribe()
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe()
  }

  onSearch() {
    this.search();
  }

  search() {
    this.userService.filterUser(this.userService.formData.userName).subscribe(res=>{
      if(res)
        this.valueChange.emit(res);
        console.log(res);
    });
  }
}
