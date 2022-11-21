import { Component, OnInit } from '@angular/core';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';

declare var $;
@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.css']
})
export class TemplateListComponent implements OnInit {
  pageSize: any = 5
  total 
  currentPage = 1
  selectAll : any
  listArray: any = []
  ServicePoviderHeader: any = [
    { "id": 1, "name": "All", "backgroundColor": "bg-green", "icon": "fa fa-bars" },
    { "id": 2, "name": "Assigned", "backgroundColor": "bg-yellow", "icon": "fa fa-star" },
    { "id": 3, "name": "Completed", "backgroundColor": "bg-violet", "icon": "fa fa-comment-alt" },
    { "id": 4, "name": "Started off", "backgroundColor": "bg-darkblue", "icon": "fa fa-heart" },
  ]
  constructor(private apiService: ApiFunctionalityService, public commonService: CommonService) {
    console.log("serviceProvider list component");
    console.log(this.listArray)
  }
  changePage(e) {
    this.currentPage = e
    this.selectAll = false
    let i = 0
      for(let item of this.listArray){
        this.checkbox[i] = false
        i++

        this.deleteId = []
      }
      this.getAllTemplateList()
  }
  search :any
  ngOnInit(): void {
    this.getAllTemplateList()
  }
  getAllTemplateList() {
    let url = 'notification/listPushNotification'
    const data = {
      page: this.currentPage,
      limit: this.pageSize
    }
    this.commonService.showSpinner()
    this.apiService.postApi(url, data, 1).subscribe((res) => {
      if (res.responseCode == 200) {
        this.listArray = res.result.docs
        this.total = res.result.total
        this.commonService.hideSpinner()
        // this.commonService.successToast(res.responseMessage)
      }
      else {
        this.commonService.hideSpinner()
        this.commonService.errorToast(res.responseMessage)
      }
    }, (err) => {
      this.commonService.hideSpinner()
      this.commonService.errorToast(err.responseMessage)
    })
  }

  //  open modal to delete notification
  deleteId = []
  openDeleteModal(id) {
    this.deleteId = []
    this.deleteId[0] = id
    $('#deleteModal').modal({
      show: true,
      backdrop: false
    })
  }
  action : any = 0
  openBulkDeleteModal(){
    if(!this.action || this.action == 0){
      return
    }
    $('#deletebulkModal').modal({
      show : true,
      backdrop : false
    })
  }
  addDeleteId(id, e){
    console.log(id, e.target.checked);
    if ( e.target.checked) {
      this.deleteId.push(id);
    } else {
      this.deleteId.splice(this.deleteId.indexOf(id), 1);
    }
    console.log(this.deleteId);
  }
  checkbox : any =[]
  addMultipleId(e){
    this.deleteId = []
    if(e.target.checked){
      let i = 0
      for(let item of this.listArray){
        this.checkbox[i] = true
        i++
        this.deleteId.push(item?._id)
      }
    }
    else{
      let i = 0
      for(let item of this.listArray){
        this.checkbox[i] = false
        i++
        this.deleteId.push(item?._id)
      }
      
      this.deleteId = []
    }
    console.log(this.deleteId);
    
  }
  timer : any
  searchText(e) {
    console.log(e.target.value);
    

    // if (!e.target.value) {
    //   return
    // }
    let me = this
    this.search = e.target.value
    clearInterval(this.timer)
    this.timer = setTimeout(function () {
      me.currentPage = 1
      me.getAllTemplateList();
    }, 2000);
  }
  addRow(e){
  
    this.pageSize = e.target.value
    this.currentPage = 1
    this.getAllTemplateList()
    
  }
  deleteTemplate(){
    let url = 'notification/deleteAllNotification'
    const data = {
      notificationId: this.deleteId
    }
    this.commonService.showSpinner()
    this.apiService.deleteApi(url, data, 1).subscribe((res) => {
      if (res.responseCode == 200) {
       this.getAllTemplateList()
        this.commonService.hideSpinner()
        this.commonService.successToast(res.responseMessage)
      }
      else {
        this.commonService.hideSpinner()
        this.commonService.errorToast(res.responseMessage)
      }
    }, (err) => {
      this.commonService.hideSpinner()
      this.commonService.errorToast(err.responseMessage)
    })
  }
}
