import { User } from './../../shared/user.model';
import { Observable } from 'rxjs';
import { UserService } from './../../shared/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  user: any;
  userListMap: Map<number, string> = new Map();

  userList: any = [];

  constructor(private service: UserService) {}

  ngOnInit(): void {
    this.service.getUserList().subscribe((res) => {
      this.user = res;
    });
    //this.refreshInspectionTypesMap();
  }

  // refreshInspectionTypesMap() {
  //   this.service.getUserList().subscribe(data => {
  //     this.userList = data;

  //     for (let i = 0; i < data.length; i++) {
  //       this.userListMap.set(this.userList[i].UserId, this.userList[i].UserName)
  //     }

  //   })
  // }

  modelUpdate(selectedRecord: any) {
      this.service.formData = selectedRecord;
  }
}
