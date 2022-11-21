import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  confirmPassword:boolean=true
  newPassword:boolean=true
  // regExName=/^[a-zA-Z ]{3,}$/i;
  // regExEmail=/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i;
  regExPassword=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i;
  // regExMobileNumber=/(?!0+$)[A-Z0-9][0-9]{9}/i;

  constructor(public commonService:CommonService, private router:Router,
    private fb: FormBuilder, public service:ApiFunctionalityService) { }

  ngOnInit(): void {
    // form controls and validations
    this.changePasswordForm = new FormGroup({
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required, Validators.pattern(this.regExPassword)]),
      confirmPassword: new FormControl('', [Validators.required]),
    })
  }

  back() {
    this.router.navigate(['/dashboard'])
  }

  // hit api on click change password
  changePassword() {
    var apiReqData = {
      'oldPassword': this.changePasswordForm.value.oldPassword,
      'newPassword': this.changePasswordForm.value.newPassword
    }
    console.log(apiReqData);
    let apiReqUrl="admin/changePassword"
    this.commonService.showSpinner();
    this.service.putApi(apiReqUrl, apiReqData,1).subscribe((res:any) => {

      if (res.responseCode == 200) {
        this.commonService.hideSpinner();
        this.commonService.successToast(res.responseMessage);
        this.service.logout()
        this.router.navigate(['/login'])
      } else {
        this.commonService.hideSpinner();
        this.commonService.errorToast(res.responseMessage);
      }
    },
    (err : any)=>{
      this.commonService.hideSpinner();
      this.commonService.errorToast(err['error']['responseMessage']);
    })
  }
}
