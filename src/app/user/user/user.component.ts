import { User } from './../../shared/user.model';
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

  userId!: string;
  userCode!: string;
  userName!: string;
  userDepartment!: string;
  userPosition!: string;

  userList: any = [];

  constructor(private service: UserService) { }

  ngOnInit(): void {
    this.service.getUserList().subscribe((res) => {
      this.user = res;
    });
  }

  modelUpdate(selectedRecord: any) {
    this.service.formData = selectedRecord;
  }

  modelDelete(id: number) {
    if (confirm('Ban co muon xoa record nay?')) {
        this.service.deleteUser(id).subscribe((res) => {
          this.service.refreshList();
        },
      )
    }
  }

  populateForm(selectedRecord: User) {
    this.service.formData = Object.assign({}, selectedRecord);
  }

  

  resultSearch(data:any){
      this.userId = data.userId;
      this.userCode = data.userCode;
      this.userName = data.userName;
      this.userDepartment = data.userDepartment;
      this.userPosition = data.userPosition;
  }

  ngOnChanges() {
    
  }
}
