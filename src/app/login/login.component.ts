import { Component } from '@angular/core';
import Swal from 'sweetalert2';

import { Router } from '@angular/router';
import { AdminAPIService } from '../Sevices/admin-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email:string=''
  password:string=''

  constructor(private api:AdminAPIService,private route:Router){}

  login(){
    if(!this.email||!this.password){
      alert('Please enter all fields')
    }else{
     
    this.api.authorization().subscribe({
      next:(res:any)=>{
       const{email,password}=res
       if(email==this.email&&password==this.password){
        Swal.fire({
          title: "Login Success",
          text: "You Have been successfully login",
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        });
          this.api.updatedata({d:true})
          localStorage.setItem("name",res.name)
          localStorage.setItem('pswd',res.password)
         this.route.navigateByUrl('dashboard')
       }else{
        Swal.fire({
          title: "Login Failed",
          text: "Invalid Email or Password",
          icon: "error",
          showConfirmButton: false,
          timer: 1500
        });
       }
      },
      error:(res:any)=>{
        console.log(res);
        
      }
    })
    }
  }

}