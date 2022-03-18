import { State, process } from '@progress/kendo-data-query';
import { User } from 'src/app/shared/user.model';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { DepartmentService } from './../shared/department.service';
import { UserService } from './../shared/user.service';
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
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

  public response!: { dbPath: '' };

  constructor(public userService: UserService, public departmentService: DepartmentService,
    private domain: DomSanitizer, private modalService: NgbModal) { }
  listUser: Array<any> = [];
  listRecursion: any;
  listChildDepartment: Array<any> = [];
  subScription!: Subscription;

  closeResult = '';

  public state: State = {
    skip: 0,
    take: 15,

    // Initial filter descriptor
    filter: {
      logic: "and",
      filters: [],
    },

  };

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
    image: new FormControl(),
  });

  public selectedDepartment: any;



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
    })
  }

  loadUserList() {
    this.clearForm();
    this.userService.getUserList().subscribe((res) => {
      this.listUser = res;
      this.gridData = process(this.listUser, this.state);
    });
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
      userService.departmentId = this.selectedDepartment.id;
      userService.image = this.response.dbPath;
      var user = new User(userService.code, userService.firstName, userService.lastName, userService.id, userService.position, userService.title, userService.departmentId, userService.image);
      this.userService.updateUser(user).subscribe(res => {
        alert("Sửa NV thành công!");
        this.loadUserList();
        this.formValue.reset();
      });
    }
  }

  addUser() {
    this.formValue.markAllAsTouched();
    alert(this.selectedDepartment);
    if (this.formValue.valid) {
      this.userService.getUserList().subscribe((res) => {
        let userService = this.userService.formData;
        userService.departmentId = this.selectedDepartment;
        userService.image = this.response.dbPath;
        var user = new User(userService.code, userService.firstName, userService.lastName, userService.id, userService.position, userService.title, userService.departmentId, userService.image);
        this.userService.addUser(user).subscribe((res: any) => {
          if (res && res.error) {
            alert("Trùng mã NV!");
          }
          else {
            alert("Thêm NV thành công!");
          }
          this.loadData();
          this.formValue.reset();
        });
      });
    }
    else {
      alert("Form invalid!");
    }
  }
  // checkDepartmentId() {
  //   let userService = this.userService.formData;
  //   console.log("CHECK DEPARTMENTid", userService.);
  // }

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
    this.departmentService.getDepartment(selectedRecord.dataItem.departmentId).subscribe(res => {
      this.selectedDepartment = res;
    })
  }

  clearForm() {
    this.formValue.reset();
    this.userService.getUserList().subscribe((res) => {
      this.listUser = res;
      this.gridData = process(this.listUser, this.state);
    });
  }

  // url = '';
  // onSelectFile(event:any) {
  //   if (event.target.files && event.target.files[0]) {
  //     this.response = event;
  //     var reader = new FileReader();
  //     //console.log("Check url img", event.target.files[0].name);
  //     reader.readAsDataURL(event.target.files[0]); // read file as data url

  //     reader.onload = (event:any) => { // called once readAsDataURL is completed
  //       this.url = event.target.result;
  //     }
  //   }
  // }

  // uploadSaveUrl = "saveUrl"; // should represent an actual API endpoint
  // uploadRemoveUrl = "removeUrl"; // should represent an actual API endpoint

  public uploadFinished = (event: any) => {
    this.response = event;
    console.log("CHECK IMAGE", this.response.dbPath);
  }

  public getImage = (serverPath: string) => {
    return this.domain.bypassSecurityTrustUrl(`http://localhost:63019/${serverPath}`);
  }


  openModal(content: any) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log("CHECK MODALLLLLLLLLLLLLL", this.closeResult);
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

}
