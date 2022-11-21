import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-add-faq',
  templateUrl: './add-faq.component.html',
  styleUrls: ['./add-faq.component.css']
})
export class AddFaqComponent implements OnInit {

  addForm: FormGroup;
  constructor(private router: Router , public commonService:CommonService, public service:ApiFunctionalityService) { }

  ngOnInit(): void {
    this.addForm = new FormGroup({
      "question": new FormControl('', Validators.required),
      "answer": new FormControl('', Validators.required),
    });
  }

  //--------- add faq functionality-----//
  addFaq(){
    let url="static/addFAQ"
  const data = {
    question: this.addForm.value.question,
    answer: this.addForm.value.answer
  }
  this.commonService.showSpinner();
  this.service.postApi(url, data, 1).subscribe((res: any) => {
    console.log("add faq response ==>", res)
    if (res['responseCode'] == 200) {
      this.commonService.hideSpinner();
      this.commonService.successToast(res['responseMessage']);
      this.router.navigate(['/faq'])

    } else {
      this.commonService.hideSpinner();
      this.commonService.errorToast(res['responseMessage'])
    }
  })
}

}
