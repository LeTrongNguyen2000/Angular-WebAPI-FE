import { State, process } from '@progress/kendo-data-query';
import { User } from 'src/app/shared/user.model';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { DepartmentService } from './../shared/department.service';
import { UserService } from './../shared/user.service';
import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';
import { TreeItem, TreeViewComponent } from "@progress/kendo-angular-treeview";
import { filter, Subscription } from 'rxjs';
import { DataStateChangeEvent, GridComponent, GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-ui',
  templateUrl: './user-ui.component.html',
  styleUrls: ['./user-ui.component.scss']
})
export class UserUIComponent implements OnInit {

  parentDepartmentName: any;
  closeResult = '';
  getDepartmentId: any;
  getImagePathToUpdate = "";
  listUser: Array<any> = [];
  listRecursion: any;
  listChildDepartment: Array<any> = [];
  subScription!: Subscription;
  value: any;

  public response!: { dbPath: "" };
  public events: string[] = [];
  public state: State = {
    skip: 0,
    take: 15,

    // Initial filter descriptor
    filter: {
      logic: "and",
      filters: [],
    },

  };
  public gridData: GridDataResult = process(this.listUser, this.state);
  public valueDepth = 0;

  constructor(public userService: UserService, public departmentService: DepartmentService,
    private domain: DomSanitizer, private modalService: NgbModal) { }


  public listPosition: Array<string> = [
    "Quản lí cấp cao",
    "Quản lí",
    "Nhân viên"
  ]

  public listTitle: Array<string> = [
    "Giám đốc điều hành",
    "Giám đốc tài chính",
    "Giám đốc khu vực",
  ]

  @ViewChild(GridComponent) public grid!: GridComponent;
  @ViewChild(TreeViewComponent) public treView!: TreeViewComponent;

  public formValue: FormGroup = new FormGroup({
    code: new FormControl(),
    firstName: new FormControl(),
    lastName: new FormControl(),
    title: new FormControl(),
    department: new FormControl(),
    position: new FormControl(),
    name: new FormControl(),
    departmentId: new FormControl(),
    image: new FormControl(),
  });

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
    });
    this.departmentService.recursion().subscribe(res => {
      this.listRecursion = res;
      console.log("DATA DropdownTree: ", res);
    })
  }

  loadUserList() {
    this.userService.getUserList().subscribe((res) => {
      this.listUser = res;
      this.gridData = process(this.listUser, this.state);
    });
  }

  loadListRecursion() {
    this.departmentService.recursion().subscribe(res => {
      this.listRecursion = res;
      console.log("DATA DropdownTree: ", res);
    })
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.gridData = process(this.listUser, this.state);

    this.state.filter?.filters.forEach((filter: any) => {
      if (filter.field == "firstName") {
        this.userService.searchUser("/SearchUserByFirstName?FirstName=", filter.firstName);

      } else if (filter.field == "lastName") {
        this.userService.searchUser("/SearchUserByLastName?LastName=", filter.lastName);

      } else if (filter.field == "departmentName") {
        this.userService.searchUser("/SearchUserByDepartmentName?DepartmentName=", filter.departmentName);

      } else if (filter.field == "position") {
        this.userService.searchUser("/SearchUserByPosition?Position=", filter.position);

      } else if (filter.field == "title") {
        this.userService.searchUser("/SearchUserByTitle?Title=", filter.title);
      }
    });
  }

  public onSelectionChange(event: TreeItem): void {
    this.userService.filterByDepartment(event.dataItem.Id).subscribe(res => {
      if (event.dataItem.Id == 2) {
        this.userService.filterByParentDepartment(2).subscribe(res => {
          this.listUser = res;
          this.gridData = process(this.listUser, this.state);
        })
      } else if (event.dataItem.Id == 1) {
        this.loadUserList();
      }
      else {
        this.listUser = res;
        this.gridData = process(this.listUser, this.state);
      }
    });
  }

  public valueChange(value: any): void {
    this.log("valueChange", JSON.stringify(value.Id));
    this.getDepartmentId = JSON.stringify(value.Id);
  }

  private log(event: string, arg?: any): void {
    this.events.unshift(`${event} ${arg || ''}`);
  }

  editUser(selectedRecord: any) {
    let userService = this.userService.formData;
    this.userService.formData = selectedRecord.dataItem;
    this.departmentService.getDepartmentId(selectedRecord.dataItem.departmentId).subscribe((res:any) => {
      console.log("CHECK DepartmentId", res[0]);
      this.value = res[0];
      this.getDepartmentId = res[0].Id;
    })
  }

  public uploadFinished = (event: any) => {
    let userService = this.userService.formData;
    this.response = event;
    userService.image = this.response.dbPath;
    console.log("CHECK IMAGE", this.response);
  }

  public getImage = (serverPath: string) => {
    let userService = this.userService.formData;
    userService.image = serverPath;
    return this.domain.bypassSecurityTrustUrl(`http://localhost:63019/${serverPath}`);
  }


  updateUser() {
    this.formValue.markAllAsTouched();
    if (this.formValue.valid) {
      let userService = this.userService.formData;
      userService.departmentId = this.getDepartmentId;
      var user = new User(userService.code, userService.firstName, userService.lastName, userService.id, userService.position, userService.title, userService.departmentId, userService.image);
      this.userService.updateUser(user).subscribe(res => {
        alert("Sửa NV thành công!");
        this.loadUserList();
      });
    }    else {
      alert("Cập nhật nhân viên không thành công!");
    }
  }

  addUser() {
    this.formValue.markAllAsTouched();
    if (this.formValue.valid) {
      this.userService.getUserList().subscribe((res) => {
        let userService = this.userService.formData;
        userService.departmentId = this.getDepartmentId;
        userService.image = this.response.dbPath;
        var user = new User(userService.code, userService.firstName, userService.lastName, userService.id, userService.position, userService.title, userService.departmentId, userService.image);
        this.userService.addUser(user).subscribe((res: any) => {
          if (res && res.error) {
            alert("Trùng mã NV!");
          }
          else {
            alert("Thêm NV thành công!");          
            this.loadUserList();
          }
        });
      });
    }
    else {
      alert("Thêm nhân viên không thành công!");
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

  clearForm() {
    this.formValue.reset();
    this.userService.getUserList().subscribe((res) => {
      this.listUser = res;
      this.gridData = process(this.listUser, this.state);
    });
  }


  openModal(content: any) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });   
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  public onFilterDepartment(event: string): void {
    this.departmentService.getDepartmentName(event).subscribe((res) => {
      this.listRecursion = res;
    });
    //Check field search để trống hoặc bấm xóa field
    if(event == "") 
    {
      this.loadListRecursion();
    }
  }

}
