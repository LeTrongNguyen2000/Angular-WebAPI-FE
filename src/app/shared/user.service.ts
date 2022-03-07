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
  readonly APIUrl = 'http://localhost:63019/api';

  getUserList(): Observable<User[]>{
    return this.http.get<any>(this.APIUrl + '/User');
  }

  addUser(data: User){
    return this.http.post(this.APIUrl + '/User', data);
  }

  updateUser(id:number|string, data: User){
    return this.http.put(this.APIUrl + '/User/${id}', data);
  }

  deleteUser(id:number|string){
    return this.http.delete(this.APIUrl + '/User/${id}');
  }
}
