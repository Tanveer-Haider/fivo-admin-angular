import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-email-generated',
  templateUrl: './email-generated.component.html',
  styleUrls: ['./email-generated.component.css']
})
export class EmailGeneratedComponent implements OnInit {
  editForm: FormGroup
  regExPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i;
  constructor(public apiServcice: ApiFunctionalityService, public commonService: CommonService) { }

  ngOnInit(): void {
    this.editForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i)]),
      password: new FormControl('', [Validators.required, Validators.pattern(this.regExPassword)])
    })
    this.getEmail()
  }
  getEmail() {
    let url = "admin/setMailView"

    this.commonService.showSpinner()
    this.apiServcice.getApi(url, 1).subscribe((res) => {
      if (res.responseCode == 200) {
        this.editForm.patchValue({
          email: res.result.email
        })
        this.commonService.successToast(res.responseMessage)
        this.commonService.hideSpinner()
      }
      else {
        this.commonService.successToast(res.responseMessage)
        this.commonService.hideSpinner()
      }
    })
  }

  updateEmail() {
    let url = "admin/setMail"
    const data = {
      email: this.editForm.value.email,
      password: this.editForm.value.password
    }
    this.commonService.showSpinner()
    this.apiServcice.postApi(url, data, 1).subscribe((res) => {
      if (res.responseCode == 200) {
        this.commonService.successToast(res.responseMessage)
        this.commonService.hideSpinner()
      }
      else {
        this.commonService.successToast(res.responseMessage)
        this.commonService.hideSpinner()
      }
    })
  }

}
