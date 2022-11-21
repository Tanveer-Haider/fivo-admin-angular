import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-delivery-vehicle-view',
  templateUrl: './delivery-vehicle-view.component.html',
  styleUrls: ['./delivery-vehicle-view.component.css']
})
export class DeliveryVehicleViewComponent implements OnInit {
  listArray:any
  vehicle_id:any
  constructor(private apiService:ApiFunctionalityService, private commonService:CommonService,private rout:ActivatedRoute) {
    this.rout.queryParams.subscribe(res=>{
      this.vehicle_id = res.id
    })
   }

  ngOnInit(): void {
    this.getDeliveryVehicle()
  }

  getDeliveryVehicle(){
    let url = `admin/viewVehicle/${this.vehicle_id}`
    this.apiService.getApi(url,1).subscribe(res=>{
      if(res.responseCode==200){
        this.listArray = res.result
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
