import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-view-faq',
  templateUrl: './view-faq.component.html',
  styleUrls: ['./view-faq.component.css']
})
export class ViewFaqComponent implements OnInit {
  faqId: any; 
  faqView : any = {question : 'What is FAQs',answer :'Frequently asked question'}  
  constructor(private router : Router,public commonService: CommonService,private activatedroute : ActivatedRoute , public service:ApiFunctionalityService) { 
    this.activatedroute.queryParams.subscribe((res) => {
      this.faqId = res.id;
    })
  }

  ngOnInit(): void {
    // this.getFaq()
  }

  //----- get individual faq data ----//
  getFaq(){
    let url = "static/viewFAQ?FaqId="+this.faqId
    this.commonService.showSpinner()
    this.service.getApi(url,1).subscribe((res)=>{
      
      if(res['responseCode'] == 200){
        this.faqView = res['result']
        this.commonService.hideSpinner()
        // this.commonService.successToast(res['responseMessage'])
      }
      else{
        this.commonService.hideSpinner()
        this.commonService.errorToast(res['responseMessage'])
      }
    })
    }
}
