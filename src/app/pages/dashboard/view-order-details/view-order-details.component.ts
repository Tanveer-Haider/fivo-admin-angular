import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-view-order-details',
  templateUrl: './view-order-details.component.html',
  styleUrls: ['./view-order-details.component.css']
})
export class ViewOrderDetailsComponent implements OnInit {
  listArray:any
  total
  order_id:any
  jobOrder: any

  constructor(public commonService:CommonService, private apiService:ApiFunctionalityService, private router:Router,private rout:ActivatedRoute) {
    this.rout.queryParams.subscribe(res=>{
      this.order_id = res.id
      this.jobOrder = res.id
    })
   }

  ngOnInit(): void {
    this.getMaterialJobList()
    this.getJobList()
  }
  getMaterialJobList(){
    let url = `admin/viewParticularPendingProductOrder?orderId=${this.order_id}`
    this.commonService.showSpinner()
    this.apiService.getApi(url,1).subscribe((res)=>{
      if(res.responseCode==200){
        this.listArray = res.result
        this.total= res.result.total
        this.commonService.hideSpinner()
        // this.commonService.successToast(res.responseMessage)
      }
      else{
        this.commonService.hideSpinner()
        this.commonService.errorToast(res.responseMessage)
      }
    })
  }

  // get service job list
  getJobList(){
    let url = `admin/viewParticularPendingServiceOrder?orderId=${this.jobOrder}`
    this.commonService.showSpinner()
    this.apiService.getApi(url,1).subscribe((res)=>{
      if(res.responseCode==200){
        this.listArray = res.result
        this.total= res.result.total
        this.commonService.hideSpinner()
        // this.commonService.successToast(res.responseMessage)
      }
      else{
        this.commonService.hideSpinner()
        this.commonService.errorToast(res.responseMessage)
      }
    })
  }
}
