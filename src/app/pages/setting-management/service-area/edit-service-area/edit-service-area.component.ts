import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from 'ngx-google-places-autocomplete/objects/address';

import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-edit-service-area',
  templateUrl: './edit-service-area.component.html',
  styleUrls: ['./edit-service-area.component.css']
})
export class EditServiceAreaComponent implements OnInit {

  vehicleForm:FormGroup
  serviceId : any
  
  constructor(private apiService:ApiFunctionalityService, public commonService:CommonService,private router:Router,private activated : ActivatedRoute) { 
    this.activated.queryParams.subscribe((res)=>{
      this.serviceId = res.id
    })
  }

  ngOnInit(): void {
    this.vehicleForm=new FormGroup({
      'vehicleType':new FormControl('', Validators.required),
      'baseRate':new FormControl('', Validators.required),
    })
    this.viewServiceArea()
  }
  options : any = []
  address
  public handleAddressChange(address: Address) {
    
    this.options = []
    this.address = address.formatted_address
    
    console.log(this.address, address.geometry.location.lng(),address.geometry.location.lat());
    

    this.options[0] = Number(address.geometry.location.lat())
    this.options[1] = Number(address.geometry.location.lng())
  }
  response : any = {}
  viewServiceArea(){
    let url = `admin/viewServiceArea?serviceAreaId=${this.serviceId}`
    this.commonService.showSpinner()
    this.apiService.getApi(url,1).subscribe((res)=>{
      if(res.responseCode==200){
        this.response =  res.result.location
        this.vehicleForm.patchValue({
          vehicleType : res.result.area,
          baseRate : res.result.indexes
        })
        this.commonService.hideSpinner()
        this.commonService.successToast(res.responseMessage)
      }
      else{
        this.commonService.hideSpinner()
        this.commonService.errorToast(res.responseMessage)
      }
    })
  }
  addServiceArea(){
    let url = `admin/editServiceArea`
    let data = {
        "serviceAreaId" : this.serviceId,
        "indexes": Number(this.vehicleForm.value.baseRate),
        // "area": String(this.address).split(',')[0] || this.vehicleForm.value.vehicleType,
        "area":  this.vehicleForm.value.vehicleType,

        "location": {
          "type": "Point",
          // "coordinates": [
          //   this.options[0] || this.response.coordinates[0],this.options[1] || this.response.coordinates[1]
          // ]
          "coordinates": [
            0 , 0
          ]
        }
      }
    this.commonService.showSpinner()
    this.apiService.putApi(url,data,1).subscribe(res=>{
      if(res.responseCode==200){
        this.router.navigate(['/setting/sevice-area'])
        this.commonService.hideSpinner()
        this.commonService.successToast(res.responseMessage)
      }
      else{
        this.commonService.hideSpinner()
        this.commonService.errorToast(res.responseMessage)
      }
    })
  }

}
