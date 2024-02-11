import { Component } from '@angular/core';
import { employeeModel } from '../employee.model';
import { AdminAPIService } from '../Sevices/admin-api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent {

  employee:employeeModel={}

  constructor(private api:AdminAPIService,private router:Router){}

  cancelEmployee(){
    this.employee={}
  }
  addEmployee(){
    console.log(this.employee);

    if(!this.employee.id || !this.employee.name || !this.employee.email || !this.employee.status){
      Swal.fire({
        text: "Please fill all the fields!",
        icon: "info",
        showConfirmButton: false,
        timer: 1500
      });
    }
    else
    {
      this.api.addEmployeeAPI(this.employee).subscribe({
        next:(res:employeeModel)=>{
          console.log(res);
          Swal.fire({
            title: " Added!",
            text: "Employee Added Successfully!",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          });
          this.employee={} 
          this.router.navigateByUrl('employees')
        }
        ,
        error:(err:any)=>{console.error(err)
          Swal.fire({
            title: "Not Added",
            text: "Something Went wrong Please Try Again!",
            icon: "error",
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
    }
    
  }
}
