import { Department } from './department.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) { }

  formData: Department = new Department();
  readonly APIUrl = 'http://localhost:63019/api/Department';
  list!: Department[];

  getDepartmentList(): Observable<Department[]>{
    return this.http.get<any>(this.APIUrl);
  }

  getDepartment(id: number) {
    return this.http.get<any>(`${this.APIUrl}/${id}`);
  }

  getDepartmentName(departmentName: string) {
    return this.http.get<any>(`${this.APIUrl}/DepartmentName?DepartmentName=${departmentName}`);
  }

  recursion(): Observable<Department[]>{
    return this.http.get<any>(`${this.APIUrl}/Recursion`);
  }

  getChildDepartment(): Observable<Department[]>{
    return this.http.get<any>(`${this.APIUrl}/GetChildDepartment`);
  }
  
  getDepartmentId(id: number): Observable<Department[]>{
    return this.http.get<any>(`${this.APIUrl}/GetDepartmentId?Id=${id}`);
  }

  recursionToFilter(departmentName: string) {
    return this.http.get<any>(`${this.APIUrl}/RecursionToFilter?DepartmentName=${departmentName}`);
  }
}