import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';

declare var $;
@Component({
  selector: 'app-cancellation-reason',
  templateUrl: './cancellation-reason.component.html',
  styleUrls: ['./cancellation-reason.component.css']
})
export class CancellationReasonComponent implements OnInit {
  listArray:any=[]
  total:any
  reasonId:any
  itemsPerPage : any = 10
  currentPage = 1
  cancellationAmount = "0"
  constructor(public commonService:CommonService, private apiService:ApiFunctionalityService,private router:Router) {
    console.log("agent list component");
    // this.listArray=dummy
    
   }
  ngOnInit(): void {
    this.getBannerList()
  }


// get product list
getBannerList(){
  let url = `admin/listCancellationReason`
  this.commonService.showSpinner()
  this.apiService.getApi(url,1).subscribe((res)=>{
    if(res.responseCode==200){
      this.listArray = res.result
      this.cancellationAmount = res.result[0].cancellationFee
      this.total= res.result.length
      this.commonService.hideSpinner()
      this.commonService.successToast(res.responseMessage)
    }
    else{
      this.commonService.hideSpinner()
      this.commonService.errorToast(res.responseMessage)
    }
  })
}
  openDeleteModal(id){
    this.reasonId=id
    $('#deleteModal').modal({
      show : true,
      backdrop : false
    })
  }
  

  deleteReason(){
    let url = `admin/deleteCancellationReason?cancellationReasonId=${this.reasonId}`
    this.commonService.showSpinner()
    this.apiService.deleteApi(url,{},1).subscribe((res)=>{
      if(res.responseCode==200){
        this.getBannerList()
        this.commonService.hideSpinner()
        this.commonService.successToast(res.responseMessage)
      }
      else{
        this.commonService.hideSpinner()
        this.commonService.errorToast(res.responseMessage)
      }
    })
  }

  addReason(){
    this.router.navigate(['setting/add-cancellation-reason'])
  }

  editReason(id){
    this.router.navigate(['setting/edit-cancellation-reason'],{queryParams:{id:id}})
  }

  changePage(e){
    this.currentPage = e
  }

  getCancellationFee(){
    let url = `admin/listCancellationReason`
    this.commonService.showSpinner()
    this.apiService.getApi(url,1).subscribe((res)=>{
      if(res.responseCode==200){
        this.listArray = res.result
        this.total= res.result.length
        this.commonService.hideSpinner()
        this.commonService.successToast(res.responseMessage)
      }
      else{
        this.commonService.hideSpinner()
        this.commonService.errorToast(res.responseMessage)
      }
    })
  }
  updateCancellationFee(){
    let url = `admin/cancellationFee`
    const data = {
      cancellationFee : this.cancellationAmount
    }
    this.commonService.showSpinner()
    this.apiService.postApi(url,data,1).subscribe((res)=>{
      if(res.responseCode==200){
       
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
