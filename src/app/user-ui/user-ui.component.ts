import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { DepartmentService } from './../shared/department.service';
import { Department } from './../shared/department.model';
import { UserService } from './../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { NodeClickEvent } from '@progress/kendo-angular-treeview';
import { of } from 'rxjs';

@Component({
  selector: 'app-user-ui',
  templateUrl: './user-ui.component.html',
  styleUrls: ['./user-ui.component.scss']
})
export class UserUIComponent implements OnInit {

  constructor(public userService: UserService, public departmentService: DepartmentService) { }
  listUser: any;
  //listDepartment: any;
  listItems: any;


  ngOnInit(): void {
    this.userService.getUserList().subscribe((res) => {
      this.listUser = res;
    });
    this.departmentService.getDepartmentList().subscribe((res) => {
      //console.log(res);
      this.listItems = res;
      console.log(res);
    });
  }
  public formValue: FormGroup = new FormGroup({
    code: new FormControl(),
    firstName: new FormControl(),
    lastName: new FormControl(),
    title: new FormControl(),
    department: new FormControl(),
    position: new FormControl(),
  });


  public expandedKeys: any[] = ["0", "1"];

  public checkedKeys: any[] = ["0_1"];

  public data: any[] = [
    {
      text: "Tổng công ty nhân sự Việt Nam",
      items: [
        {text: "Ban giám đốc" },
        {text: "Ban tổng giám đốc" },
      ],
    },
    {
      text: "Khối nhân sự",
      items: [
        { text: "Bộ phận tính lương" },
        { text: "Bộ phận chấm công" },
        { text: "Bộ phận IT" }
      ],
    },
  ];
  public listDepartment: Array<string> = ["Ban giám đốc", "Ban tổng giám đốc", "Bộ phận tính lương", "Bộ phận chấm công", "Bộ phận IT"];

  // public onNodeDblClick(event: NodeClickEvent): void {
  //   console.log(this.data);
  // }
 
  public selectedKeys: any[] = ["0"];
  public hasChildren = (item: any) => item.items && item.items.length > 0;
  public fetchChildren = (item: any) => of(item.items);


  onSearch() {
    this.search();
  }

  search() {
    this.userService.filterUser(this.userService.formData.lastName).subscribe(res=>{
      if(res)
      this.listUser = res;  
    });
  }

  removeUser(selectedRecord: any) {
    if (confirm('Ban co muon xoa record nay?')) {
      this.userService.deleteUser(selectedRecord.dataItem.id).subscribe((res) => {
      },
    )
  }
  }

  editUser(selectedRecord : any) {
    this.userService.formData = selectedRecord.dataItem;
    console.log("edit", selectedRecord.dataItem);
  }
  
}
