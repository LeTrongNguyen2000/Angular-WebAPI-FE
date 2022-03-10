import { User } from './user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  formData: User = new User();
  readonly APIUrl = 'http://localhost:63019/api/User';
  list!: User[];

  getUserList(): Observable<User[]>{
    return this.http.get<any>(this.APIUrl);
  }

  getUser(id: number) {
    return this.http.get<any>(`${this.APIUrl}/${id}`);
  }

  addUser(data: User){
    return this.http.post(this.APIUrl, data);
  }

  updateUser(){
    return this.http.put(`${this.APIUrl}` + '/{id}', this.formData);
  }

  deleteUser(id: number){

    return this.http.delete(`${this.APIUrl}/${id}`);
  }


  filterUser(name: string) {
    return this.http.get<any>(`${this.APIUrl}` + "/UserName?UserName=" +`${name}`);
  }

  filterByDepartment(departmentName: string) {
    return this.http.get<any>(`${this.APIUrl}` + "/DepartmentName?departmentName=" +`${departmentName}`);
  }
  generateURL(){
    return `${this.APIUrl}/`;
  }

}
