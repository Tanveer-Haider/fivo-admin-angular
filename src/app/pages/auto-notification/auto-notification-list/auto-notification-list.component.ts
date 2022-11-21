import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';
declare var $ : any
@Component({
  selector: 'app-auto-notification-list',
  templateUrl: './auto-notification-list.component.html',
  styleUrls: ['./auto-notification-list.component.css']
})
export class AutoNotificationListComponent implements OnInit {
  pageSize : any = 5
  total:any
  currentPage = 1
  listArray : any = []
  selectAll : any
  search :any
  constructor(private apiService:ApiFunctionalityService,public commonService:CommonService, private router:Router) {
    console.log("serviceProvider list component");
    console.log(this.listArray)
   }

  ngOnInit(): void {
    this.autoNotificationList()
  }

    /* -=-=-=-=-=-=- Api of Auto Notification  List -=-=-=-=-=-==-=-= */
    autoNotificationList(){
      let apiReqUrl="notification/listAutoNotification"
      var apiReqData = new FormData();
      apiReqData.append('page',String(this.currentPage))
      apiReqData.append('limit',String(this.pageSize))
      this.commonService.showSpinner()
      this.apiService.postFormDataApi(apiReqUrl,apiReqData,1).subscribe((res:any)=>{
       if(res.responseCode==200){
         this.listArray = res.result.docs
         this.total = res.result.total
         this.commonService.hideSpinner()
        //  this.commonService.successToast(res.responseMessage)
       }
       else{
         this.commonService.hideSpinner()
         this.commonService.errorToast(res.responseMessage)
       }
      })
     }

     veiwNotification(id){
      this.router.navigate([`/auto-notification/view-auto-notification/${id}`])
     }
     editNotification(id){
      this.router.navigate([`/auto-notification/edit-auto-notification/${id}`])
     }

     changePage(e){
      this.currentPage = e
      this.selectAll = false
      let i = 0
        for(let item of this.listArray){
        
          this.checkbox[i] = false
          i++
  
          this.deleteAdminId = []
        }
      this.autoNotificationList()
     }
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
        this.commonService.infoToast("Please select notification to delete.")
      }
    }

     deleteNotifaication(){
      let url = "notification/deleteAllNotification"
      const data = {
        notificationId : this.deleteAdminId
      }
      this.commonService.showSpinner()
      this.apiService.deleteApi(url,data,1).subscribe((res)=>{
        if(res.responseCode == 200){
          for(let i = 0 ; i < this.checkbox.length ; i ++){
            this.checkbox[i] = false
          }
          this.autoNotificationList()
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
      console.log(id, e.target.checked);
      if ( e.target.checked) {
        this.deleteAdminId.push(id);
      } else {
        this.deleteAdminId.splice(this.deleteAdminId.indexOf(id), 1);
      }
      console.log(this.deleteAdminId);
    }
    checkbox : any =[]
    // add all id by single click
    addMultipleId(e){
      this.deleteAdminId = []
      if(e.target.checked){
        let i = 0
        for(let item of this.listArray){
          this.checkbox[i] = true
          i++
          this.deleteAdminId.push(item?._id)
        }
      }
      else{
        let i = 0
        for(let item of this.listArray){
          this.checkbox[i] = false
          i++
          this.deleteAdminId.push(item?._id)
        }
        
        this.deleteAdminId = []
      }
      console.log(this.deleteAdminId);
      
    }
    addRow(e){
    
      this.pageSize = e.target.value
      this.currentPage = 1
      this.autoNotificationList()
      
    }
   timer : any
    searchText(e) {
      console.log(e.target.value);

      let me = this
      this.search = e.target.value
      clearInterval(this.timer)
      this.timer = setTimeout(function () {
        me.currentPage = 0
        me.autoNotificationList();
      }, 2000);

     
}
}