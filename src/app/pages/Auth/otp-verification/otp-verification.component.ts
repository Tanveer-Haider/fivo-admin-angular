import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxOtpInputConfig } from 'ngx-otp-input';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css']
})
export class OtpVerificationComponent implements OnInit {

  email: string;
  userOTP: any;
  currentUrl: string;
  previousUrl: string;
  userData: {};
  isActivate : any;
 
  otpForm:FormGroup
  config ={
    allowNumbersOnly: true,
    length: 4,
    // isPasswordInput: false,
    autoFocus: false,
    disableAutoFocus: true,
    placeholder: '',
    inputStyles: {
      'width': '50px',
      'height': '50px'
    }
  };

  diff: any = 30;

  constructor(private router: Router, public commonService: CommonService, private activate:ActivatedRoute, public service:ApiFunctionalityService) {
    this.activate.queryParams.subscribe(res=>{
      this.isActivate= res.isActive
    })

  }

  ngOnInit(): void {
    this.timer();   

    this.otpForm = new FormGroup({
      otp: new FormControl("", [
        Validators.required,
        
      ]),
    });
       this.email = localStorage.getItem('email')
    this.currentUrl = localStorage.getItem('currentUrl')
    console.log(this.currentUrl);

  }
  onOtpChange(otp) {
    this.userOTP = otp;
    console.log(otp);

  }
  // ========= ngx otp input method===============
  otpInputConfig: NgxOtpInputConfig = {
    otpLength: 6,

  }
  //  otp verification 
  navigateToResetPassword() {
    console.log(this.userOTP);
    this.userData = {
      email: this.email,
      otp: this.userOTP
    }


    this.commonService.showSpinner()

    this.service.postApi('admin/verifyOTP', this.userData, 0).subscribe(res => {
      console.log(res);
      // if(res['']) 
      if (res['responseCode'] == 200) {
        this.commonService.hideSpinner()
        this.commonService.successToast(res['responseMessage'])
        if(!this.isActivate){
          this.router.navigate(['/dashboard'])
        }
        if (this.currentUrl === '/login') {
          this.router.navigate(['/login'])
        } else {
          this.commonService.hideSpinner()
          localStorage.setItem('verifyOtpToken', res['result']['token'])
          this.router.navigate(['/reset-password'])
        }
      }

    }, err => {
      this.commonService.hideSpinner()
      if (err['error']['responseCode'] == 400) {
        this.commonService.warningToast(err['error']['responseMessage'])
      }
      console.log(err);
    })

  }
  // resend otp 
  resendOtp() {
   
    this.email = localStorage.getItem('email');
    var email = {
      'email': this.email
    }
    this.commonService.showSpinner()
    this.service.postApi('admin/resendOTP', email, 0).subscribe(res => {
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
      console.log(res);
    }, (err : any)=>{
      this.commonService.hideSpinner();
      this.commonService.errorToast(err['error']['responseMessage']);
    })
  }

  timer() {
    const interval = setInterval(() => {
      this.diff -= 1;
      if (this.diff == 0) {
        clearInterval(interval);
        return;
      }
      // console.log(this.diff);
    }, 1000);
    this.diff = 30;
  }


}
