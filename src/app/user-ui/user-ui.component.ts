import { State, process } from '@progress/kendo-data-query';
import { User } from 'src/app/shared/user.model';
import { FormControl, NgForm } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { DepartmentService } from './../shared/department.service';
import { UserService } from './../shared/user.service';
import { Component, DoCheck, OnInit } from '@angular/core';
import { TreeItem } from "@progress/kendo-angular-treeview";
import { of, BehaviorSubject, switchMap, Subject, Subscription, Observable } from 'rxjs';
import { NotificationService } from "@progress/kendo-angular-notification";
import { HttpHeaders } from '@angular/common/http';
import { DataStateChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';

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

  constructor(public userService: UserService, public departmentService: DepartmentService, private notificationService: NotificationService,
  ) { }
  listUser: Array<any> = [];
  //listDepartment: any;
  listItems:  any ;
  subScription!: Subscription;

  public state: State = {
    skip: 0,
    take: 5,

    // Initial filter descriptor
    filter: {
      logic: "and",
      filters: [{ field: "firstName", operator: "contains", value: "" }],
    },
  };


  public gridData: GridDataResult = process(this.listUser, this.state);

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.userService.getUserList().subscribe((res) => {
      this.listUser = res;
      this.gridData = process(this.listUser, this.state);
    });
    this.departmentService.getDepartmentList().subscribe((res) => {
      this.listItems = res;
      console.log("departmentList", res);
    });
  }

  loadUserList() {
    this.userService.getUserList().subscribe((res) => {
      this.listUser = res;
      this.gridData = process(this.listUser, this.state);
    });
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.gridData = process(this.listUser, this.state);
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
      this.listUser = res;
      this.gridData = process(this.listUser, this.state);
    });
  }


  public data: any[] = [
    {
      parentDepartmentName: "Tổng công ty nhân sự Việt Nam",
      childDepartment: [
        { childDepartmentName: "Ban giám đốc", value: 3 },
        { childDepartmentName: "Ban tổng giám đốc", value: 4 },
      ],
    },
    {
      parentDepartmentName: "Khối nhân sự",
      childDepartment: [
        { childDepartmentName: "Bộ phận tính lương", value: 5 },
        { childDepartmentName: "Bộ phận chấm công", value: 6 },
        { childDepartmentName: "Bộ phận IT", value: 7 }
      ],
    },
  ];

  recursion (){
    this.departmentService.getDepartmentList().subscribe(res => {
      let departmentService = this.departmentService.formData;
      if(departmentService.parentId == 0)
      {
        this.listItems = res
        while(departmentService.parentId == departmentService.id) {
          this.listItems = res;
        }
      }
      this.recursion();
    })
  }

  public expandedKeys: any[] = ['0', '1'];
  public selectedKeys: any[] = [1];

  public children = (dataitem: any): Observable<any[]> => of(dataitem.items);

  public hasChildren = (dataitem: any): boolean => !!dataitem.items;

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
    this.userService.filterUser(this.userService.formData.lastName).subscribe(res => {
      if (res)
        this.listUser = res;
    });
  }

  getDepartmentName(departmentName: string) {
    this.departmentService.getDepartmentName(departmentName).subscribe();
  }

  refresh() {
    this.loadUserList();
  }

  updateUser() {
    this.formValue.markAllAsTouched();
    if (this.formValue.valid) {
      // this.notificationService.show({
      //   content: "Cập nhật thành công",
      //   hideAfter: 800,
      //   position: { horizontal: "center", vertical: "top" },
      //   animation: { type: "fade", duration: 400 },
      //   type: { style: "success", icon: true },
      // });
      let userService = this.userService.formData;
      userService.departmentId = this.selectedItem.value;
      var user = new User(userService.code, userService.firstName, userService.lastName, userService.id, userService.position, userService.title, userService.departmentId);
      this.userService.updateUser(user).subscribe(res => {
        alert("Sửa NV thành công!");
        this.loadUserList();
      });
    }
  }

  addUser() {
    this.formValue.markAllAsTouched();
    if (this.formValue.valid) {
      let userService = this.userService.formData;
      userService.departmentId = this.selectedItem.value;
      var user = new User(userService.code, userService.firstName, userService.lastName, userService.id, userService.position, userService.title, userService.departmentId);
      this.userService.addUser(user).subscribe((res) => {
        alert("Thêm NV thành công!");
        this.loadUserList();
      });
    }
  }

  removeUser(selectedRecord: any) {
    const t = this;
    if (confirm('Ban co muon xoa record nay?')) {
      this.userService.deleteUser(selectedRecord.dataItem.id).subscribe((res) => {
        alert("Xóa thành công");
        t.listUser = t.listUser.filter(
          function (o: any) {
            return o.id !== selectedRecord.dataItem.id
          })
        t.gridData = process(this.listUser, this.state);
      });
    }
  }

  editUser(selectedRecord: any) {
    this.userService.formData = selectedRecord.dataItem;
    console.log("edit", selectedRecord.dataItem);
  }
}
