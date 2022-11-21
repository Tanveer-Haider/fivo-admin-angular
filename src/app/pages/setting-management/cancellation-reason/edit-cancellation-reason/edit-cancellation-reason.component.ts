import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-edit-cancellation-reason',
  templateUrl: './edit-cancellation-reason.component.html',
  styleUrls: ['./edit-cancellation-reason.component.css']
})
export class EditCancellationReasonComponent implements OnInit {
  cancellation_reason:any
  reason_id:any
  reasonform:FormGroup

  constructor(public commonService:CommonService, private apiService:ApiFunctionalityService,private rout:ActivatedRoute,private router:Router) { 
    this.rout.queryParams.subscribe(res=>{
      this.reason_id = res.id
    })
  }

  ngOnInit(): void {
    this.reasonform= new FormGroup({
      'cancellationReason':new FormControl(''),
      // 'cancellationFee' : new FormControl('',[Validators.required])
    })
    this.getBannerList()
  }
  getBannerList(){
    let url = `admin/viewCancellationReason?cancellationReasonId=${this.reason_id}`
    this.commonService.showSpinner()
    this.apiService.getApi(url,1).subscribe((res)=>{
      if(res.responseCode==200){
        // this.cancellation_reason = 
        this.reasonform.patchValue({
          'cancellationReason':res.result.cancellationReason,
          // cancellationFee : res.result.cancellationFee,
        })
        this.commonService.hideSpinner()
        // this.commonService.successToast(res.responseMessage)
      }
      else{
        this.commonService.hideSpinner()
        this.commonService.errorToast(res.responseMessage)
      }
    })
  }

  updateReason(){
    // let url = `admin/editCancellationReason?cancellationReasonId=${this.reason_id}&cancellationReason=${this.reasonform.value.cancellationReason}&cancellationFee=${this.reasonform.value.cancellationFee}`
    let url = `admin/editCancellationReason?cancellationReasonId=${this.reason_id}&cancellationReason=${this.reasonform.value.cancellationReason}`
   
    this.commonService.showSpinner()
    this.apiService.putApi(url,{},1).subscribe((res)=>{
      if(res.responseCode==200){
        this.router.navigate(['/setting/cancellation-reason'])
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
