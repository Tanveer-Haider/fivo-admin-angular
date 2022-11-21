import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-add-cancellation-reason',
  templateUrl: './add-cancellation-reason.component.html',
  styleUrls: ['./add-cancellation-reason.component.css']
})
export class AddCancellationReasonComponent implements OnInit {
  value:any = ''
  reasonform:FormGroup
  constructor(public commonService:CommonService, private apiService:ApiFunctionalityService,private router:Router) { }

  ngOnInit(): void {
    this.reasonform= new FormGroup({
      'cancellationReason':new FormControl(''),
      // cancellationFee : new FormControl('',[Validators.required])
    })
  }
  addReason(){
    // let url = `admin/addCancellationReason?cancellationReason=${this.reasonform.value.cancellationReason}&cancellationFee=${this.reasonform.value.cancellationFee}`
    let url = `admin/addCancellationReason?cancellationReason=${this.reasonform.value.cancellationReason}`
  
    if(this.reasonform.value.cancellationReason){
        this.commonService.showSpinner()
        this.apiService.postApi(url,{},1).subscribe((res)=>{
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
      else{
        this.commonService.warningToast("Reason cannot be empty.")
      }
  }
}
