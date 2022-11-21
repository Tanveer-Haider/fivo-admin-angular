import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-fee-management',
  templateUrl: './fee-management.component.html',
  styleUrls: ['./fee-management.component.css']
})
export class FeeManagementComponent implements OnInit {
  bookServiceForm : FormGroup
  bookMaterialForm : FormGroup
  formattedCurrentDate : any 
  

  constructor(private apiService:ApiFunctionalityService, public commonService:CommonService) {
   let currentDate = new Date().toLocaleString()
   let splitedDate = currentDate.split(',')
   let date = splitedDate[0].split('/')
   let time = splitedDate[1].split(':')
   let fdate = `${date[2]}-${date[1]}-${date[0]}`
   let ftime = `${time[0]}:${time[1]}`
    ftime =  ftime.trim()
    this.formattedCurrentDate = `${fdate}T${ftime}`
   
   }

  ngOnInit(): void {
   this.bookServiceFormValidation()
   this.bookMaterialFormValidation()
   this.getCategoryStatus()
  }
  bookServiceFormValidation(){
    this.bookServiceForm = new FormGroup({
      serviceStatus : new FormControl(),
      serviceFrom : new FormControl(),
      serviceTo : new FormControl(),
      meassage : new FormControl(),
      
    })
   
  }
  resetServiceForm(e){
    if(e){
      this.bookMaterialForm.controls['materialFrom'].reset()
      this.bookMaterialForm.controls['materialTo'].reset()
      this.bookMaterialForm.controls['meassage'].reset()
    }
    else{
      this.bookServiceForm.controls['serviceFrom'].reset()
      this.bookServiceForm.controls['serviceTo'].reset()
      this.bookServiceForm.controls['meassage'].reset()
    }
    
  }
  bookMaterialFormValidation(){
    this.bookMaterialForm = new FormGroup({
     
        materialStatus : new FormControl(),
        materialFrom : new FormControl(),
        materialTo : new FormControl(),
        meassage : new FormControl(),
       
    })
  }
materialId : any
serviceId : any
getCategoryStatus(){
  let url = `admin/listCategoryActivity`
  this.commonService.showSpinner()
  this.apiService.getApi(url,1).subscribe((res)=>{
    if(res.responseCode==200){
      let serviceArray = res.result.filter((response)=>{
        return response.categoryType == 'SERVICE'
      })
      let materailArray = res.result.filter((response)=>{
        return response.categoryType == 'MATERIAL'
      })
      let serviceFromDatetime = String(serviceArray[0].openTime).split(':')
      let fserviceFromDatetime = `${serviceFromDatetime[0]}:${serviceFromDatetime[1]}`

      let serviceToDatetime = String(serviceArray[0].endTime).split(':')
      let fserviceTomDatetime = `${serviceToDatetime[0]}:${serviceToDatetime[1]}`
      this.bookServiceForm.patchValue({
        serviceStatus : serviceArray[0].active,
        serviceFrom : fserviceFromDatetime,
        serviceTo : fserviceTomDatetime,
        meassage : serviceArray[0].message
      })

      let materialFromDatetime = String(materailArray[0].openTime).split(':')
      let fmaterialFromDatetime = `${materialFromDatetime[0]}:${materialFromDatetime[1]}`

      let materialToDatetime = String(materailArray[0].endTime).split(':')
      let fmaterialTomDatetime = `${materialToDatetime[0]}:${materialToDatetime[1]}`
      this.bookMaterialForm.patchValue({
        materialStatus : materailArray[0].active,
        materialFrom : fmaterialFromDatetime,
        materialTo : fmaterialTomDatetime,
        meassage : materailArray[0].message
      })
      this.materialId = materailArray[0]._id
      this.serviceId = serviceArray[0]._id
      console.log(materailArray,this.materialId);
      console.log(serviceArray,this.serviceId);
      
      this.commonService.hideSpinner()
      this.commonService.successToast(res.responseMessage)
    }
    else{
      this.commonService.hideSpinner()
      this.commonService.errorToast(res.responseMessage)
    }
  })
}


 
updateServiceCategory(){


   let url =`admin/editCategoryActivity`
   let data = {
    openTime : new Date(this.bookServiceForm.value.serviceFrom).toISOString(),
    endTime : new Date(this.bookServiceForm.value.serviceTo).toISOString(),
    message : this.bookServiceForm.value.meassage,
    categoryActivityId : this.serviceId,
    manual : this.bookServiceForm.value.serviceStatus 
   }
 console.log(url,data);
  
   this.commonService.showSpinner()
   this.apiService.postApi(url,data,1).subscribe((res:any)=>{
     if (res.responseCode == 200) {
      
       this.commonService.hideSpinner()
       this.commonService.successToast(res.responseMessage)
      
     } else {
       this.commonService.hideSpinner()
       this.commonService.errorToast("Data not found.")
     }
   })
 }
 updateMaterilaCategory(){

  
   let url =`admin/editCategoryActivity`
   let data = {
    openTime : new Date(this.bookMaterialForm.value.materialFrom).toISOString(),
    endTime : new Date(this.bookMaterialForm.value.materialTo).toISOString(),
    categoryActivityId : this.materialId,
    message : this.bookMaterialForm.value.meassage,
    manual : this.bookMaterialForm.value.materialStatus
   }
 console.log(url,data);
   // this.editable=true
   this.commonService.showSpinner()
   this.apiService.postApi(url,data,1).subscribe((res:any)=>{
     if (res.responseCode == 200) {
      
       this.commonService.hideSpinner()
       this.commonService.successToast(res.responseMessage)
      
     } else {
       this.commonService.hideSpinner()
       this.commonService.errorToast("Data not found.")
     }
   })
 }
 

}
