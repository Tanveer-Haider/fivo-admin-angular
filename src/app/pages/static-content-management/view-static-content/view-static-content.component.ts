import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-view-static-content',
  templateUrl: './view-static-content.component.html',
  styleUrls: ['./view-static-content.component.css']
})
export class ViewStaticContentComponent implements OnInit {
pageName : any
data : any 
id:any
title:any

  constructor(private activatedRoute : ActivatedRoute,private apiService:ApiFunctionalityService, private commonService:CommonService,private router:Router) {
    this.activatedRoute.queryParams.subscribe((res)=> {
      this.pageName = res.pageName
    })
   }

  ngOnInit(): void {
    this.viewStaticContent()
  }

  viewStaticContent(){
    let url = `slider/viewStatic?_id=${this.pageName}`
    this.commonService.showSpinner()
    this.apiService.getApi(url,1).subscribe(res=>{
      if(res.responseCode==200){
        this.data = res.result.description ? res.result.description : '---'
        this.id = res.result._id
        this.title = res.result.title
        this.commonService.hideSpinner()
        // this.commonService.successToast(res.responseMessage)
      }
      else{
        this.data = '---'
        this.commonService.hideSpinner()
        this.commonService.errorToast(res.responseMessage)
      }
    })
  }


  editStaticContent(){
    return
    let url = `static/editStaticContent`
    let data = {
      "_id": this.id,
      "title": this.title,
      "description": this.data
    }
    this.commonService.showSpinner()
    this.apiService.putApi(url,data,1).subscribe(res=>{
      if(res.responseCode==200){
        this.router.navigate(['/static-content'])
        this.commonService.hideSpinner()
        this.commonService.successToast(res.responseMessage)
      }
      else{
        this.commonService.hideSpinner()
        this.commonService.errorToast(res.responseMessage)
      }
    })
  }
}
