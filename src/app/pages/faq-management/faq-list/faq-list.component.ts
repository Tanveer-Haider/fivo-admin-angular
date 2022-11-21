import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';

declare var $;
@Component({
  selector: 'app-faq-list',
  templateUrl: './faq-list.component.html',
  styleUrls: ['./faq-list.component.css']
})
export class FaqListComponent implements OnInit {
  faqList:any
  faqResult: any=[{question : 'What is FAQs',answer :'Frequently asked question'}];
  id: any;
  total:any
  itemsPerPage: number = 10;
  currentPage: number = 1
  totalItems: number;
  constructor(private router: Router , public commonService:CommonService, public service: ApiFunctionalityService) {
    
  }
  
  ngOnInit(): void {
    // this.getFaqData()
  }

  //----- get list of faq -----//
   getFaqData(){
     var url = 'static/faqList?page='+this.currentPage+"&limit="+this.itemsPerPage
     this.commonService.showSpinner()
      this.service.getApi(url,1).subscribe(res=>{
        if(res['responseCode']==200){
        this.faqResult = res['result']
        this.total= this.faqResult.length
        this.commonService.hideSpinner()
        // this.commonService.successToast(res["responseMessage"]) 
      } 
      else{
      this.commonService.hideSpinner()
      this.commonService.errorToast(res['responseMessage'])
      }
     }, err => {
      this.faqResult = []
      this.total = 0
      this.commonService.hideSpinner();
    })
    }
    
  
  addFaq() {
    this.router.navigate(['/faq/add-faq'])
  }
  viewUser(id) {
    this.router.navigate(['/faq/view-faq'], { queryParams: { id: id } })
  }
  editFaq(id) {
    this.router.navigate(['/faq/edit-faq'], { queryParams: { id: id } })

  }

   //----delete faq ----//
  deleteFaqModal(id){
    this.id=  id
  }

  hideModal(){
    $("#delete").modal('hide');
  }

  deleteFaq(){
    this.commonService.showSpinner()
    this.service.deleteApi('static/deleteFAQ?_id='+this.id ,{} ,1).subscribe(res=>{
      if(res["responseCode"] == 200){
        this.commonService.successToast(res["responseMessage"])
        this.getFaqData()
      }
      else{
        this.commonService.hideSpinner()
        this.commonService.errorToast(res["responseMessage"])
      }
    })
  }

  //-----pagination----//
  pagination(event) {
    this.currentPage = event;
    this.getFaqData()    
  }
}
