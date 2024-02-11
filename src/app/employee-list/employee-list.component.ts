import { Component, OnInit } from '@angular/core';
import { AdminAPIService } from '../Sevices/admin-api.service';
import { employeeModel } from '../employee.model';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  p: number = 1;
  allEmployee:employeeModel[]=[]
  searchKey:string=""
  constructor(private api:AdminAPIService){}
  ngOnInit(): void {
    this.allEmployeeDetails()
  }

  allEmployeeDetails(){
    this.api.getAllEmployeeAPI().subscribe({
      next:(res:any)=>{
       
        this.allEmployee=res
        console.log(this.allEmployee);
                
      },
      error:(error:ErrorEvent) =>{
        console.log(error);
        
      }
    })
  }

  removeEmployee(id:any){
    this.api.deleteAllEmployeeAPI(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.allEmployeeDetails()
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }


  sortId(){
this.allEmployee.sort((a:any,b:any)=>a.id-b.id)
  }

  sortName(){
    this.allEmployee.sort((a:any,b:any)=>a.name.localeCompare(b.name))
  }

  generatePDF(){
    /* create a object for jspdf */
    const pdf = new jsPDF()

    let head =[['id','Employee name','Email','Status']]
    let body:any =[]

    this.allEmployee.filter((item)=>item.id!=='1').forEach((item:any)=>{
      body.push([item.id, item.name, item.email, item.status])
    })
    /* fontsize */
    pdf.setFontSize(16)

    /* title */
    pdf.text('Employee Details',10,10)

    /* table */
    autoTable(pdf,{head,body})

    /* to open in new tab*/
    pdf.output('dataurlnewwindow')

    /* save and download */
    pdf.save('employee.pdf')
  }
}


/* The localeCompare() method compares two strings in the current locale.
The localeCompare() method returns sort order -1, 1, or 0 (for before, after, or equal).
The current locale is based on the language settings of the browser. 

Syntax:string.localeCompare(compareString)


pagechange: The expression specified will be invoked whenever the page changes via a click on one of the pagination controls.The $event argument will be the number of the new page. This should be used to update the value of the currentPage variable which was passed to the PaginatePipe.

*/

