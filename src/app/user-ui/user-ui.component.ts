import { User } from 'src/app/shared/user.model';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { DepartmentService } from './../shared/department.service';
import { UserService } from './../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { TreeItem } from "@progress/kendo-angular-treeview";
import { of } from 'rxjs';
import { NotificationService } from "@progress/kendo-angular-notification";

interface Item {
  text: string;
  value: number;
}
@Component({
  selector: 'app-user-ui',
  templateUrl: './user-ui.component.html',
  styleUrls: ['./user-ui.component.scss']
})
export class UserUIComponent implements OnInit {

  constructor(public userService: UserService, public departmentService: DepartmentService, private notificationService: NotificationService) { }
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
      console.log("departmentList",res);
    });
  }
  public formValue: FormGroup = new FormGroup({
    code: new FormControl(),
    firstName: new FormControl(),
    lastName: new FormControl(),
    title: new FormControl(),
    department: new FormControl(),
    position: new FormControl(),
    name: new FormControl(),
    departmentId: new FormControl(),
  });

  public onSelectionChange(event: TreeItem): void {
    this.userService.filterByDepartment(event.dataItem.value).subscribe(res => {
      console.log(res);
      this.listUser = res;
    });
  }


  public data: any[] = [
    {
      text: "Tổng công ty nhân sự Việt Nam",
      items: [
        {text: "Ban giám đốc", value: 1 },
        {text: "Ban tổng giám đốc", value: 2 },
      ],
    },
    {
      text: "Khối nhân sự",
      items: [
        { text: "Bộ phận tính lương", value: 3},
        { text: "Bộ phận chấm công", value:4},
        { text: "Bộ phận IT", value: 5}
      ],
    },
  ];
  public expandedKeys: any[] = ['0', '1'];
  public selectedKeys: any[] = [1];

  public hasChildren = (item: any) => item.items && item.items.length > 0;
  public fetchChildren = (item: any) => of(item.items);

  public listDepartment: Array<Item> = [
    { text: 'Ban giám đốc', value: 1 },
    { text: 'Ban tổng giám đốc', value: 2 },
    { text: 'Bộ phận tính lương', value: 3 },
    { text: 'Bộ phận chấm công', value: 4 },
    { text: 'Bộ phận IT', value: 5 },
];

public selectedItem: Item = this.listDepartment[1];


  onSearch() {
    this.search();
  }

  search() {
    this.userService.filterUser(this.userService.formData.lastName).subscribe(res=>{
      if(res)
      this.listUser = res;  
    });
  }

  getDepartmentName (departmentName: string) {
    this.departmentService.getDepartmentName(departmentName).subscribe();
  }

  updateUser() {
    this.formValue.markAllAsTouched();
    if(this.formValue.valid)
    {
      this.notificationService.show({
        content: "Cập nhật thành công",
        hideAfter: 800,
        position: { horizontal: "center", vertical: "top" },
        animation: { type: "fade", duration: 400 },
        type: { style: "success", icon: true },
      });
    }
    let userService = this.userService.formData;
    userService.departmentId = this.selectedItem.value;
    var user = new User(userService.code,userService.firstName,userService.lastName,userService.id,userService.position,userService.title,userService.departmentId);
    this.userService.updateUser(user).subscribe();
  }

  addUser() {
    this.formValue.markAllAsTouched();
    if(this.formValue.valid)
    {
      this.notificationService.show({
        content: "Thêm thành công",
        hideAfter: 800,
        position: { horizontal: "center", vertical: "top" },
        animation: { type: "fade", duration: 400 },
        type: { style: "success", icon: true },
      });
    }
    let userService = this.userService.formData;
    userService.departmentId = this.selectedItem.value;
    var user = new User(userService.code, userService.firstName, userService.lastName, userService.id, userService.position, userService.title, userService.departmentId);
    this.userService.addUser(user).subscribe();
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
  
  refresh () {
    this.userService.getUserList().subscribe((res) => {
      this.listUser = res;
    });
  }
}
