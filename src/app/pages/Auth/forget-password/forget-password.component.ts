import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

 
  forgetform: FormGroup;
  otp:number

  constructor(private router: Router, public commonService: CommonService, public service:ApiFunctionalityService) { }

  ngOnInit(): void {
    this.forgetform = new FormGroup({
      email: new FormControl('', Validators.compose([Validators.required, Validators.email, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,7}|[0-9]{1,3})(\]?)$/i)]))
    })
  }
  // ----------verify email on click -------------//
  verfyEmail(){
  let apiReqData={
    'email':this.forgetform.value.email
  }
  localStorage.setItem('email',this.forgetform.value.email)
      this.router.navigate(["otp-verification"]);
      return
  var apiReqUrl="admin/forgotPassword"
  this.commonService.showSpinner()
  this.service.postApi(apiReqUrl,apiReqData,0).subscribe((res:any)=>{
    if(res.responseCode==200)
    {
      this.commonService.hideSpinner()
      this.commonService.successToast(res.responseMessage)

      // this.openModal()
      localStorage.setItem('email',this.forgetform.value.email)
      this.router.navigate(["otp-verification"]);

    }
    else{
      this.commonService.hideSpinner()
      this.commonService.errorToast(res.responseMessage)
    }
  },
  (error: any) => {
    this.commonService.hideSpinner();
    this.commonService.errorToast(error.error.responseMessage)
  })
  }
// -------- verify Otp of forget password -----------//
  verfyOtp(){
    let apiReqData={
      'email':this.forgetform.value.email,
      'otp':this.otp
    }
    var apiReqUrl="admin/verifyOTP"
    this.commonService.showSpinner()
    this.service.postApi(apiReqUrl,apiReqData,0).subscribe((res:any)=>{
      if(res.responseCode==200)
      {
        // this.hideModal()
        this.commonService.hideSpinner()
        this.commonService.successToast(res.responseMessage)
        this.router.navigate(['/reset-password'])
      }
      else{
        this.commonService.hideSpinner()
        this.commonService.errorToast(res.responseMessage)
      }
    },
    (error: any) => {
      this.commonService.hideSpinner();
      this.commonService.errorToast(error.error.responseMessage)
    })
    }

  // --------resend otp-------------//
  resendOtp(){
    let apiReqData={
      'email':this.forgetform.value.email,
    }
    var apiReqUrl="admin/resendOTP"
    this.commonService.showSpinner()
    this.service.postApi(apiReqUrl,apiReqData,0).subscribe((res:any)=>{
      if(res.responseCode==200)
      {
        this.commonService.hideSpinner()
        // this.openModal()
        this.commonService.successToast(res.responseMessage)
      }
      else{
        this.commonService.hideSpinner()
        this.commonService.errorToast(res.responseMessage)
      }
    },
    (error: any) => {
      this.commonService.hideSpinner();
      this.commonService.errorToast(error.error.responseMessage)
    })
    }

  onOtpChange(e) {
    this.otp = e;
  }
}
