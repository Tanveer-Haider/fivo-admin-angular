import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-edit-faq',
  templateUrl: './edit-faq.component.html',
  styleUrls: ['./edit-faq.component.css']
})
export class EditFaqComponent implements OnInit {
  editForm: FormGroup ;
  faqList: any;
  faqId: any;
  updateButton : boolean = false
  constructor(private activatedroute : ActivatedRoute , private router : Router,public commonService: CommonService, public service:ApiFunctionalityService) { 
    this.activatedroute.queryParams.subscribe((res) => {
      this.faqId = res.id;
    })
  }

  ngOnInit(): void {
    this.editForm = new FormGroup({
      "question" : new FormControl('' , Validators.required) ,
      "answer" : new FormControl('', Validators.required) ,
    });
   this.getFaq()
  }

  //------ get individual faq data ------//
  getFaq(){
    let url = "static/viewFAQ?FaqId="+this.faqId
    this.commonService.showSpinner()
    this.service.getApi(url,1).subscribe((res)=>{
      if(res['responseCode'] == 200){
        this.editForm.patchValue({
          question : res['result']['question'],
          answer : res['result']['answer']
        })
        this.commonService.hideSpinner()
        // this.commonService.successToast(res['responseMessage'])
      }
      else{
        this.commonService.hideSpinner()
        this.commonService.errorToast(res['responseMessage'])
      }
    })
   }

  //------ update individual faq data ------//  
   updateFaq(){
    let url = "static/editFAQ"
  
    const data = {
      '_id':this.faqId,
      "answer": this.editForm.value.answer,
      "question": this.editForm.value.question
    }
    this.commonService.showSpinner()
    this.service.putApi(url,data,1).subscribe((res)=>{
      
      if(res['responseCode'] == 200){
  
        this.commonService.hideSpinner()
        this.commonService.successToast(res['responseMessage'])
        this.router.navigate(['/faq'])
      }
      else{
        this.commonService.hideSpinner()
        this.commonService.errorToast(res['responseMessage'])
      }
    })
   }
   
  inputFunct(){
    console.log(this.updateButton);
 
    if(this.editForm.valid && (this.editForm.touched || this.editForm.dirty)){
     this.updateButton = true
    }
    else{
      this.updateButton = false
    }
  }
}
