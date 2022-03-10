import { UserService } from './../../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/user.model';
import {
  GridDataResult,
  DataStateChangeEvent,
} from "@progress/kendo-angular-grid";


@Component({
  selector: 'app-user-grid-data',
  templateUrl: './user-grid-data.component.html',
  styleUrls: ['./user-grid-data.component.scss']
})
export class UserGridDataComponent implements OnInit {

  public columns: any[] = [
    { field: "ProductID" },
    { field: "ProductName" },
    { field: "QuantityPerUnit" },
  ];

  filter!: string;

  public bindingType: String = "array";
  // public gridDataResult: GridDataResult = {
  //   data: products,
  //   total: products.length,
  // };

  constructor(public userService: UserService) { }
  listUser: any;

  ngOnInit(): void {
    this.userService.getUserList().subscribe((res) => {
      this.listUser = res;
    });
    console.log("Init");
  }

  refresh(): void {
    this.userService.getUserList().subscribe((res) => {
      this.listUser = res;
    console.log("getUserList");

    });
    console.log("Refresh");
  }

  // search(data: any) {
  //   this.listUser = data;
  //   console.log(data);  
  // }

  editHandler(selectedRecord : any) {
    this.userService.formData = selectedRecord.dataItem;
    console.log(selectedRecord.dataItem);
  }

  removeHandler(selectedRecord: any) {
    if (confirm('Ban co muon xoa record nay?')) {
      this.userService.deleteUser(selectedRecord.dataItem.id).subscribe((res) => {
        this.refresh();
      },
    )
  }
  }


  //Dropdown List
  public listStaff: Array<string> = ["IT", "Nhân sự", "Sale"];
  public listManager: Array<string> = ["CEO", "Chủ tịch", "Giám đóc"];
  public selectedValueForManager = "";
  public selectedValueForStaff = "";


  searchByDepartment(departmentName: string) {
    this.userService.filterByDepartment(departmentName).subscribe(res => {
      if(res)
        this.listUser = res;
        console.log(res);
    });
  }
  selectionChange(event:string){
    this.searchByDepartment(event);
  }

  onSearch() {
    this.search();
  }

  search() {
    this.userService.filterUser(this.userService.formData.userName).subscribe(res=>{
      if(res)
      this.listUser = res;  
    });
  }
}
