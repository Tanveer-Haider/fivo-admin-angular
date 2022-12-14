import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
 
  regExPassword=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i;

  resetPassword: FormGroup;
  otp:number
  email: any = localStorage.getItem("email");
  constructor(public commonService: CommonService, public router: Router, public service:ApiFunctionalityService) { }

  ngOnInit(): void {
    this.resetPassword = new FormGroup({
      "password": new FormControl('', [Validators.required, Validators.pattern(this.regExPassword)]),
      "confirmPassword": new FormControl('', [Validators.required])
    });
  }
 
  // -------------- Api of reset password-----------//
  resetPasswordApi() {
   
   let token = localStorage.getItem('verifyOtpToken')
    let apiReqData = {
      "email": this.email,
      "newPassword": this.resetPassword.value.confirmPassword,
    }
   
    this.commonService.showSpinner()
    this.service.putApi('admin/resetPassword/' + token ,apiReqData,0).subscribe((res:any)=>{
      if(res.responseCode == 200){
        this.commonService.hideSpinner()
        localStorage.removeItem('email')
        this.router.navigate(['/login'])
        localStorage.removeItem("verifyOtpToken")
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




}
