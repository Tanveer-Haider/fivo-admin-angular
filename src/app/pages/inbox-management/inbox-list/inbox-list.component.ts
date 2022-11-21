import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';
declare var $ : any
@Component({
  selector: 'app-inbox-list',
  templateUrl: './inbox-list.component.html',
  styleUrls: ['./inbox-list.component.css']
})
export class InboxListComponent implements OnInit {
  pageSize : any = 10
  total = 10
  selectAll : any
  currentPage = 0
  action : any = 0
  deletePoductId : any = []
  listArray : any = []
  constructor(public commonService:CommonService, private apiService:ApiFunctionalityService, private route:Router) { }

 ngOnInit(): void {
  //  this.inboxList()
 }

inboxList(){
  let url = ``
  this.commonService.showSpinner()
  this.apiService.getApi(url,1).subscribe(res=>{
    if(res.responseCode==200){
      this.listArray = res.result
      this.commonService.hideSpinner()
      this.commonService.successToast(res.responseMessage)
    }
    else{
      this.commonService.hideSpinner()
      this.commonService.errorToast(res.responseMessage)
    }
  })
}

openDeleteModal(){
  this.deletePoductId = []
  this.deletePoductId[0] = 'id'
  $('#deleteModal').modal({
    show : true,
    backdrop : false
  })
}

openBulkDeleteModal(){
  if(this.deletePoductId!=''){
    if(!this.action || this.action == 0){
      return
    }
    $('#deletebulkModal').modal({
      show : true,
      backdrop : false
    })
  }
  else{
    this.commonService.infoToast("Please select email to delete.")
  }
}

  closeDeleteModal(){
    $('#deleteModal').modal('hide')
    
  }

  // delete product
  deleteInbox(){
    let url = `product/deleteAllProduct`
    let data = {
        "productId": this.deletePoductId
    }
    this.commonService.showSpinner()
    this.apiService.deleteApi(url,data,1).subscribe(res=>{
      if(res.responseCode==200){
        for(let i = 0 ; i < this.checkbox.length ; i ++){
          this.checkbox[i] = false
        }
        this.inboxList()
        this.deletePoductId = []
        this.closeDeleteModal()
        this.commonService.hideSpinner()
        this.commonService.successToast(res.responseMessage)
      }
      else{
        this.commonService.hideSpinner()
        this.commonService.errorToast(res.responseMessage)
      }
    })
  }
 changePage(e){
  this.currentPage = e
  this.selectAll = false
  let i = 0
    for(let item of this.listArray){
      this.checkbox[i] = false
      i++

      this.deletePoductId = []
    }
  this.inboxList()
 }

 addAdminId(id, e){
  console.log(id, e.target.checked);
  if ( e.target.checked) {
    this.deletePoductId.push(id);
  } else {
    this.deletePoductId.splice(this.deletePoductId.indexOf(id), 1);
  }
  console.log(this.deletePoductId);
}
checkbox : any =[]
addMultipleId(e){
  this.deletePoductId = []
  if(e.target.checked){
    let i = 0
    for(let item of this.listArray){
      this.checkbox[i] = true
      i++
      this.deletePoductId.push(item?._id)
    }
  }
  else{
    let i = 0
    for(let item of this.listArray){
      this.checkbox[i] = false
      i++
      this.deletePoductId.push(item?._id)
    }
    
    this.deletePoductId = []
  }
  console.log(this.deletePoductId);
  
}

addRow(e){
  
  this.pageSize = e.target.value
  this.currentPage = 1
  this.inboxList()
  
}



}
