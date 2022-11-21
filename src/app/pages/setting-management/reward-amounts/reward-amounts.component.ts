import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-reward-amounts',
  templateUrl: './reward-amounts.component.html',
  styleUrls: ['./reward-amounts.component.css']
})
export class RewardAmountsComponent implements OnInit {
  symbolForm:FormGroup

  constructor(public commonService:CommonService, private apiService:ApiFunctionalityService) { }

  ngOnInit(): void {
    this.symbolForm = new FormGroup({
      'referal':new FormControl('',[Validators.required]),
      'refere':new FormControl('',[Validators.required]),
      'message':new FormControl('',[Validators.required])
    })
    // this.getBannerList()
    this.getAmmount()
  }
  referalId : any
  getAmmount(){
    let url = `admin/viewRef_Amount`
 
  this.commonService.showSpinner()
  this.apiService.getApi(url,1).subscribe((res)=>{
    if(res.responseCode==200){
      this.symbolForm.patchValue({
        referal : res.result.refferalAmount,
        refere : res.result.refral,
        message : res.result.message
      })
      this.referalId = res.result._id
      this.commonService.hideSpinner()
      this.commonService.successToast(res.responseMessage)
    }
    else{
      this.commonService.hideSpinner()
      this.commonService.errorToast(res.responseMessage)
    }
  })
  }

  setAmount(){
  let url = `admin/editRefferalAmount`
  let data ={
    "refferalId" : this.referalId,
    "refferalAmount": String(this.symbolForm.value.referal),
    "refral": this.symbolForm.value.refere,
    "message": this.symbolForm.value.message,
  }
  this.commonService.showSpinner()
  this.apiService.putApi(url,data,1).subscribe((res)=>{
    if(res.responseCode==200){
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
