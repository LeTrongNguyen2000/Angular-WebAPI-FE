import { State, process } from '@progress/kendo-data-query';
import { User } from 'src/app/shared/user.model';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { DepartmentService } from './../shared/department.service';
import { UserService } from './../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { TreeItem } from "@progress/kendo-angular-treeview";
import { Subscription } from 'rxjs';
import { NotificationService } from "@progress/kendo-angular-notification";
import { DataStateChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-user-ui',
  templateUrl: './user-ui.component.html',
  styleUrls: ['./user-ui.component.scss']
})
export class UserUIComponent implements OnInit {
  parentDepartmentName: any;

  constructor(public userService: UserService, public departmentService: DepartmentService) { }
  listUser: Array<any> = [];
  listRecursion: any;
  listChildDepartment: Array<any> = [];
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

  public selectedDepartmentId: any;

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.userService.getUserList().subscribe((res) => {
      this.listUser = res;
      this.gridData = process(this.listUser, this.state);
    });
    this.departmentService.getChildDepartment().subscribe((res) => {
      this.listChildDepartment = res;
      console.log("getChildDepartment", res);
    });
    this.departmentService.recursion().subscribe(res => {
      this.listRecursion = res;
      console.log("RECURSION", res);
    })
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

  public onSelectionChange(event: TreeItem): void {
    this.userService.filterByDepartment(event.dataItem.Id).subscribe(res => {
      this.listUser = res;
      this.gridData = process(this.listUser, this.state);
    });
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
      userService.departmentId = this.selectedDepartmentId.id;
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
      userService.departmentId = this.selectedDepartmentId.id;
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
