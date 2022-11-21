import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-add-service-area',
  templateUrl: './add-service-area.component.html',
  styleUrls: ['./add-service-area.component.css']
})
export class AddServiceAreaComponent implements OnInit {

  
  vehicleForm:FormGroup
 
  
  constructor(private apiService:ApiFunctionalityService, public commonService:CommonService,private router:Router) { }

  ngOnInit(): void {
    this.vehicleForm=new FormGroup({
      'vehicleType':new FormControl('', Validators.required),
      'baseRate':new FormControl('', Validators.required),
    })
  }
  options : any
  address
  public handleAddressChange(address: Address) {
    
    this.options = []
    this.address = address.formatted_address
    
    console.log(this.address, address.geometry.location.lng(),address.geometry.location.lat());
    

    this.options[0] = Number(address.geometry.location.lat())
    this.options[1] = Number(address.geometry.location.lng())
  }


  addServiceArea(){
    let url = `admin/addServiceArea`
    let data = {
        "indexes": Number(this.vehicleForm.value.baseRate),
        // "area": String(this.address).split(',')[0],
        area : this.vehicleForm.value.vehicleType,
        "location": {
          "type": "Point",
          // "coordinates": [
          //   this.options[0],this.options[1]
          // ]
          "coordinates": [
            0,0
          ]
        }
      }
    this.commonService.showSpinner()
    this.apiService.postApi(url,data,1).subscribe(res=>{
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
