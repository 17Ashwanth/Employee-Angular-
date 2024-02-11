import { Component, OnInit } from '@angular/core';
import { AdminAPIService } from '../Sevices/admin-api.service';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  sideBar:boolean=true
  employeeCount:number=0
  selected: Date | null=new Date()
  Highcharts: typeof Highcharts = Highcharts;
  usericon:string='./assets/images/usericon.png'
  editAdmin:boolean=false
  adminName:any=""
  adminDetails:any={}
  

  chartOptions = { };

  constructor(private api:AdminAPIService){
    this.chartOptions={
      chart: {
        type: 'pie'
    },
    title: {
        text: 'Project Completion Info'
    },
    tooltip: {
        valueSuffix: '%'
    },
    subtitle: {
        text:
        'Source:<a href="https://www.mdpi.com/2072-6643/11/3/684/htm" target="_blank">MDPI</a>'
    },
    plotOptions: {
        series: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: [{
                enabled: true,
                distance: 20
            }, {
                enabled: true,
                distance: -40,
                format: '{point.percentage:.1f}%',
                style: {
                    fontSize: '1.2em',
                    textOutline: 'none',
                    opacity: 0.7
                },
                filter: {
                    operator: '>',
                    property: 'percentage',
                    value: 10
                }
            }]
        }
    },
    credits:{
      enabled:false
    },
    series: [
        {
            name: 'Project',
            colorByPoint: true,
            data: [
                {
                    name: 'Chrome',
                    y: 55.02
                },
                {
                    name: 'Firefox',
                    sliced: true,
                    selected: true,
                    y: 26.71
                },
                {
                    name: 'Safari',
                    y: 1.09
                },
                {
                    name: 'Brave',
                    y: 15.5
                },
                {
                    name: 'Edge',
                    y: 1.68
                }
            ]
        }
    ]
    }
    HC_exporting(Highcharts);
  }
  ngOnInit(): void {
    if(localStorage.getItem("name")){
      this.adminName = localStorage.getItem("name")
    }
    this.totalEmployee()

    //fetch all admin details
    this.api.authorization().subscribe((res:any)=>{
      console.log(res);
      this.adminDetails=res
      if(res.picture){
        this.usericon=res.picture
      }
      
    })
  }
  menuBar(){
    this.sideBar = !this.sideBar;
  }

  totalEmployee(){
    this.api.getAllEmployeeAPI().subscribe({
      next:(res:any)=>{
        console.log("Total Employee : ", res);
        this.employeeCount=res.length
      },
      error:(error:any)=>console.log('Error: ',error)
    })
  }

  edit(){
    this.editAdmin=true
  }

  getFile(event:any){
    let fileDetail=event.target.files[0]
    console.log(fileDetail);

    // create an object for fileReader() class
    let fr = new FileReader()

    //read
    fr.readAsDataURL(fileDetail)

    //convert
    fr.onload=(event:any)=>{
/*       console.log(event.target.result);
 */      this.usericon=event.target.result
          this.adminDetails.picture=this.usericon
      
    }
    
  }

  updateAdmin(){
    this.api.updateAdminAPI(this.adminDetails).subscribe({
      next:(res:any)=>{
        console.log(res);
        alert("Admin Details Update SuccessFully ")
        localStorage.setItem('name',res.name)
        localStorage.setItem('pswd',res.password)
        this.adminName=localStorage.getItem('name')
        
      },
      error:(error:any)=>{
        console.log('Error:',error);
        
      }
    })
  }

  cancel(){
    this.api.authorization().subscribe((res:any)=>{
      console.log(res);
      this.adminDetails=res
      if(res.picture){
        this.usericon=res.picture;
      }
      this.editAdmin=false
      
    })
  }
  
}
