import { tap } from 'rxjs/operators';
import { User } from './user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

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
    return this.http.post(this.APIUrl, data)
  }

  updateUser(data: User){
    return this.http.put(`${this.APIUrl}/{id}`, data);
  }

  deleteUser(id: string){

    return this.http.delete(`${this.APIUrl}/${id}`,{responseType: 'text'});
  }


  filterUser(name: string) {
    return this.http.get<any>(`${this.APIUrl}` + "/UserName?UserName=" +`${name}`);
  }

  filterByDepartment(departmentId: number) {
    return this.http.get<any>(`${this.APIUrl}` + "/departmentId?departmentId=" +`${departmentId}`);
  }
  generateURL(){
    return `${this.APIUrl}/`;
  }

}
