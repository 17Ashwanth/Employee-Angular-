import { Component } from '@angular/core';
import { employeeModel } from '../employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminAPIService } from '../Sevices/admin-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent {
 employee: employeeModel={}

 constructor(private route:ActivatedRoute, private api:AdminAPIService,private router:Router){}

 ngOnInit(): void{
this.route.params.subscribe((res:any)=>{
const {id}=res
this.viewEmployee(id)

})
 }
 viewEmployee(id:any){
  this.api.viewEmployeeAPI(id).subscribe({
    next:(res:any)=>{
      console.log(res);
      this.employee=res
      
    },
    error:(err:any)=>{
      console.log(err);
      
    }
  })
 }

editEmployee(id:any){
  this.api.updateEmployeeAPI(id,this.employee).subscribe({
    next:(res:any)=>{
      console.log(res);
      Swal.fire({
        title: " Updated!",
        text: "Employee Updated Successfully!",
        icon: "success",
        showConfirmButton: false,
        timer: 1500
      });     
       this.router.navigateByUrl('/employees')
      
    },
    error:(err:any)=>{
      console.log(err);
      
    }
  })
}




}


