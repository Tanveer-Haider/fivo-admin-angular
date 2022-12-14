import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  view = "hide"
  password = "password"
  regExPassword=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i;

  newPassword: boolean = true
  constructor(private formBuilder: FormBuilder, private router: Router, public service: ApiFunctionalityService, public commonService: CommonService) {
    // localStorage.removeItem('token')
  }

 

  ngOnInit(): void {
    this.loginFormValidation();
  }

  //-------  login form validation -------- //
  loginFormValidation() {
    var data;
    if (localStorage.getItem("loginData")) {
      data = JSON.parse(localStorage.getItem("loginData"));
    }
    this.loginForm = new FormGroup({
      email: new FormControl(data?.email || "", [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,7}|[0-9]{1,3})(\]?)$/i),]),
      password: new FormControl(atob(data?.password || ""), [Validators.required,Validators.pattern(this.regExPassword)]),
      rememberMe: new FormControl(data?.rememberMe || ""),
    });
  }

  // ---------  login form submit ------------- //
  onLogin() {
    let apiReqData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    let apiReqUrl = "admin/adminlogin"


    

    this.service.postApi(apiReqUrl, apiReqData, 0).subscribe((res: any) => {
      console.log(res)
      if (res.responseCode == 200) {
        this.commonService.hideSpinner();
        localStorage.setItem("token", res.result.token);
        this.commonService.loginData.next(res.result)
        this.commonService.successToast(res.responseMessage);
        this.router.navigate(["dashboard"]);
        // remember me
        if (this.loginForm.value.rememberMe) {
          let loginData = {
            email: this.loginForm.value.email,
            password: btoa(this.loginForm.value.password),
            rememberMe: this.loginForm.value.rememberMe,
          };
          localStorage.setItem("loginData", JSON.stringify(loginData));
        } else {
          localStorage.removeItem("loginData");
        }
      } else {
        this.commonService.hideSpinner();
        this.commonService.errorToast(res.responseMessage);
      }
    },
      (error: any) => {
        this.commonService.hideSpinner();
        this.commonService.errorToast(error.error.responseMessage)
      })
  }
}
