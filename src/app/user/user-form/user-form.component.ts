import { User } from './../../shared/user.model';
import { UserService } from './../../shared/user.service';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Data } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  constructor(public service: UserService) { }
  user: User = new User();
  
  ngOnInit(): void {
  }

  addUser(){
    var user = {
      userId: this.user.userId,
      userCode: this.user.userCode,
      userName: this.user.userName,
      userDepartment: this.user.userDepartment,
      userPosition: this.user.userPosition
    }
    this.service.addUser(user).subscribe()
  }

  
}
