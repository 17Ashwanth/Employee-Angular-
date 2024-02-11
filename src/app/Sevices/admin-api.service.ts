import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { employeeModel } from '../employee.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAPIService {

  constructor(private http:HttpClient) { }

  server_URL = 'https://employee-server-angular.onrender.com'

  public sharedData = new BehaviorSubject(false)

  updatedata(data:any){
    this.sharedData.next(data)
  }

  authorization(){
   return this.http.get(`${this.server_URL}/employee/1`)
  }

  addEmployeeAPI(employee:employeeModel){
  return this.http.post(`${this.server_URL}/employee`,employee)
  }

  getAllEmployeeAPI(){
    return this.http.get(`${this.server_URL}/employee`)
  }

  deleteAllEmployeeAPI(id:string){
    return this.http.delete(`${this.server_URL}/employee/${id}`)
  }

  viewEmployeeAPI(id:string){
   return this.http.get(`${this.server_URL}/employee/${id}`)
  }

  /* to update */
  updateEmployeeAPI(id:any,employee:any){
    return this.http.put(`${this.server_URL}/employee/${id}`,employee)
  }

  updateAdminAPI(admin:any){
    return this.http.put(`${this.server_URL}/employee/1`,admin)
  }
}


