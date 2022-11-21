import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';
declare var $ : any
@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {

  pageSize : any = 5
  total : any
  currentPage = 1
 adminList : any  = [{userName : 'Mr. Sub Admin',email : 'subadmin@finvo.com',updatedAt : new Date()}]
 selectAll : any
  constructor(private apiService : ApiFunctionalityService,private router : Router,public commonService : CommonService) {
  
   }
   changePage(e){
    this.currentPage = e
    this.selectAll = false
    let i = 0
      for(let item of this.adminList){
        this.checkbox[i] = false
        i++

        this.deleteAdminId = []
      }
    this.getAllAdminList()
   }
  ngOnInit(): void {
    this.getAllAdminList()
  }
  search :any
  getAllAdminList(){
    return
    let url = `admin/subAdminList?page=${this.currentPage}&limit=${this.pageSize}${this.search ? "&search="+this.search : ''}`
    this.commonService.showSpinner()
    this.apiService.getApi(url,1).subscribe((res)=>{
      if(res.responseCode == 200){
        this.adminList = res.result.docs
        this.total = res.result.total
        this.commonService.hideSpinner()
      }else{
        this.commonService.errorToast(res.responseMessage)
        this.commonService.hideSpinner()
      }
    })
  
  }

  //  open modal to delete admin for particular delete
  deleteAdminId : any = []
  openDeleteModal(id){
    this.deleteAdminId = []
    this.deleteAdminId[0] = id
    $('#deleteModal').modal({
      show : true,
      backdrop : false
    })
  }
  // delete for bulk delete
  action : any = 0
  openBulkDeleteModal(){
    if(this.deleteAdminId!=''){
      if(!this.action || this.action == 0){
        return
      }
      $('#deletebulkModal').modal({
        show : true,
        backdrop : false
      })
    }
    else{
      this.commonService.infoToast("Please select admin to delete.")
    }
  }
  viewAdmin(id){
    this.router.navigate(["/admin/view-admin"],{queryParams : {id}})
  }
  editAdmin(id){
    this.router.navigate(["/admin/edit-admin"],{queryParams : {id}})
  }
  blockUnblockUser(id){
    let url = "admin/userActiveBlock?_id="+id
    this.commonService.showSpinner()
    this.apiService.putApi(url,{},1).subscribe((res)=>{
      if(res.responseCode == 200){
        $('#deleteModal').modal({
          show : false,
          backdrop : false
        })
        this.getAllAdminList()
        this.commonService.successToast(res.responseMessage)
        this.commonService.hideSpinner()
      }else{
        this.commonService.errorToast(res.responseMessage)
        this.commonService.hideSpinner()
      }
    })
  }
  deleteAdmin(){
    let url = "admin/deleteUser"
    const data = {
      userId : this.deleteAdminId
    }
    this.commonService.showSpinner()
    this.apiService.deleteApi(url,data,1).subscribe((res)=>{
      if(res.responseCode == 200){
        for(let i = 0 ; i < this.checkbox.length ; i ++){
          this.checkbox[i] = false
        }
        this.getAllAdminList()
        this.deleteAdminId = []
        this.commonService.successToast(res.responseMessage)
        this.commonService.hideSpinner()
      }else{
        this.commonService.errorToast(res.responseMessage)
        this.commonService.hideSpinner()
      }
    })
  }
  // add id which is to be delete
  addAdminId(id, e){
    if ( e.target.checked) {
      this.deleteAdminId.push(id);
    } else {
      this.deleteAdminId.splice(this.deleteAdminId.indexOf(id), 1);
    }
  }
  checkbox : any =[]
  // add all id by single click
  addMultipleId(e){
    this.deleteAdminId = []
    if(e.target.checked){
      let i = 0
      for(let item of this.adminList){
        this.checkbox[i] = true
        i++
        this.deleteAdminId.push(item?._id)
      }
    }
    else{
      let i = 0
      for(let item of this.adminList){
        this.checkbox[i] = false
        i++
        this.deleteAdminId.push(item?._id)
      }
      
      this.deleteAdminId = []
    }
    
  }
  addRow(e){
  
    this.pageSize = e.target.value
    this.currentPage = 1
    this.getAllAdminList()
    
  }
 timer : any
  searchText(e) {
    

    // if (!e.target.value) {
    //   return
    // }
    let me = this
    this.search = e.target.value
    clearInterval(this.timer)
    this.timer = setTimeout(function () {
      me.currentPage = 1
      me.getAllAdminList();
    }, 2000);
  }
  

}
