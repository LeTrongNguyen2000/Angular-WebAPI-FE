import { User } from './../../shared/user.model';
import { UserService } from './../../shared/user.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  listUser: any;
  userListMap: Map<number, string> = new Map();

  //userList: any = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserList().subscribe((res) => {
      this.listUser = res;
    });
  }

  updateModel(selectedRecord: any) {
    this.userService.formData = selectedRecord;
  }

  deleteModel(id: number) {
    if (confirm('Ban co muon xoa record nay?')) {
        this.userService.deleteUser(id).subscribe((res) => {
        },
      )
    }
  }

  populateForm(selectedRecord: User) {
    this.userService.formData = Object.assign({}, selectedRecord);
  }

  

  search(data:any){
      this.listUser = data;
      console.log(data);
  }

  ngOnChanges() {
    
  }
}
