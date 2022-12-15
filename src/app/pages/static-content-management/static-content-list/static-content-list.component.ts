import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-static-content-list',
  templateUrl: './static-content-list.component.html',
  styleUrls: ['./static-content-list.component.css']
})
export class StaticContentListComponent implements OnInit {

  pageSize : any = 10
  total = 10
  currentPage = 0
  listArray : any = []
 

  ServicePoviderHeader:any = [
    {"id":1,"name":"All Reviews","backgroundColor":"bg-green","icon":"fa fa-star"},
  ]
  constructor(private router :Router,private apiService:ApiFunctionalityService,private commonService:CommonService) {
  this.total = this.listArray.length
    console.log(this.listArray)
   }
   navigateToViewStaticContent(pageName){
    this.router.navigate(["/static-content/view-static-content"],{queryParams : {pageName}})
   }
   changePage(e){

   }
  ngOnInit(): void {
    this.getStaticContentList()
  }

  getStaticContentList(){
    let url =`static/listStaticContent`
    this.commonService.showSpinner()
    this.apiService.postApi(url,{},1).subscribe(res=>{
      if(res.responseCode==200){
        this.listArray = res.result.docs
        this.commonService.hideSpinner()
        // this.commonService.successToast(res.responseMessage)
      }
      else{
        this.commonService.hideSpinner()
        this.commonService.errorToast(res.responseMessage)
      }
    },err=>{
        this.commonService.hideSpinner()
        this.commonService.errorToast(err.responseMessage)
    }
    )
  }

}
