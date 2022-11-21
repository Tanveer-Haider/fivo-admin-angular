import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {

  orderId : any
  orderDetail : any = []
  constructor(private activatedRoute : ActivatedRoute,private apiService : ApiFunctionalityService,private commonService : CommonService) { 
    this.activatedRoute.queryParams.subscribe((res)=>{
      this.orderId = res.id
    })
    
  }

  ngOnInit(): void {
  }
  getOderDetail(){
    let url = "admin/orderView/"+this.orderId
    this.commonService.showSpinner()
    this.apiService.getApi(url,1).subscribe((res)=>{
      if(res.responseCode == 200){
        this.orderDetail = res
        this.commonService.showSpinner()
        // this.commonService.successToast(res.responseMessage)
      }
      else{
        this.commonService.showSpinner()
        this.commonService.errorToast(res.responseMessage)
      }
    },(err)=>{
      this.commonService.showSpinner()
      this.commonService.errorToast(err.responseMessage)
    })

  }

}
