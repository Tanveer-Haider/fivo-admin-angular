import { Component, OnInit } from '@angular/core';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';
declare var $: any
@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {

  pageSize: any = 10
  total
  customerDataExcel: any = []
  currentPage = 1
  dashboard: any
  selectAll: any

  advertId: any;
  listArray: any = []
  notificationArray: any = []
  ServicePoviderHeader: any = [
    { "id": 1, "name": "All", "backgroundColor": "bg-green", "icon": "fa fa-bars" },
    { "id": 2, "name": "Assigned", "backgroundColor": "bg-yellow", "icon": "fa fa-star" },
    { "id": 3, "name": "Completed", "backgroundColor": "bg-violet", "icon": "fa fa-comment-alt" },
    { "id": 4, "name": "Started off", "backgroundColor": "bg-darkblue", "icon": "fa fa-heart" },
  ]
  // selectAll : any
  constructor(private apiService: ApiFunctionalityService, public commonService: CommonService) {

  }
  changePage(e) {
    this.currentPage = e
    let i = 0
    this.selectAll = false
    for (let item of this.listArray) {
      this.checkbox[i] = false
      i++

      this.recepentId = []
    }
    this.getAllUserList()
  }
  ngOnInit(): void {
    this.getAllUserList()
    this.notificationDashboard()
  }

  status: any = "ALL"
  filterStatus(e) {
    this.status = e
    this.currentPage = 1
    console.log(e);

    this.getAllUserList()
  }
  getAllUserList() {
    let url = `admin/listUser?page=${this.currentPage}&limit=${this.pageSize}${this.search ? '&search=' + this.search : ''}${this.status != 'ALL' ? '&userType1=' + this.status : ''}`

    this.commonService.showSpinner()
    this.apiService.getApi(url, 1).subscribe((res) => {
      if (res.responseCode == 200) {
        this.listArray = res.result.docs
        this.commonService.hideSpinner()
        this.total = res.result.total
        // this.commonService.successToast(res.responseMessage)
      }
      else {
        this.listArray = []
        this.commonService.hideSpinner()
        this.commonService.errorToast(res.responseMessage)
      }
    }, (err) => {
      this.listArray = []
      this.commonService.hideSpinner()
      this.commonService.errorToast(err.error.responseMessage)
    })
  }
  timer: any
  search: any
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
      me.getAllUserList();
    }, 2000);
  }
  addRow(e) {

    this.pageSize = e.target.value
    this.currentPage = 1
    this.getAllUserList()

  }

  // pushNotificationDashboard(){
  //   let url = "admin/serviceDashboard"
  // this.commonService.showSpinner()
  // this.apiService.getApi(url,1).subscribe((res)=>{
  // if(res.responseCode == 200){
  //   this.dashboard = res.result
  //   this.commonService.hideSpinner()
  // }else{
  //   this.commonService.hideSpinner()
  // }
  // })

  // }

  exportAsXLSX() {

    let apiReqUrl = `admin/listUser?page=${this.currentPage}&limit=${this.total}${this.search ? '&search=' + this.search : ''}`

    this.apiService.getApi(apiReqUrl, 1).subscribe((res: any) => {
      if (res.responseCode == 200) {
        this.customerDataExcel = res.result.docs;
        let dataArr = [];
        this.customerDataExcel.forEach((element, ind) => {
          let obj = {};
          obj = {
            "Name": element.firstName ? element.firstName : '-' + ' ' + element.surName ? element.surName : "-",
            "Recipient": element.userType ? element.userType : "--",
            "Phone Number": element.mobileNumber ? element.mobileNumber : "--",
            "Email": element.email ? element.email : "--",
          };
          let array = dataArr.push(obj);
        });
        this.commonService.exportAsExcelFile(dataArr, "Push Notification Management");
      }
    })
  }

  templateType: any
  openSelectTemplateModal(e) {
    if (this.recepentId.length == 0) {
      this.commonService.warningToast("Please select recepent")
      return
    }
    this.templateType = e
    this.getAllTemplateList()

  }
  recepentId: any = []
  addId(id, e) {
    console.log(id, e.target.checked);
    if (e.target.checked) {
      this.recepentId.push(id);
    } else {
      this.recepentId.splice(this.recepentId.indexOf(id), 1);
    }
    console.log(this.recepentId);
  }

  addMultipleId(e) {
    this.recepentId = []
    if (e.target.checked) {
      let i = 0
      for (let item of this.listArray) {
        this.checkbox[i] = true
        i++
        this.recepentId.push(item?._id)
      }
    }
    else {
      let i = 0
      for (let item of this.listArray) {
        this.checkbox[i] = false
        i++
        this.recepentId.push(item?._id)
      }

      this.recepentId = []
    }
    console.log(this.recepentId);

  }
  checkbox: any = []
  templateList: any = []
  getAllTemplateList() {
    let url = `notification/notificationListWithoutPagination?notificationType=${this.templateType}`

    this.commonService.showSpinner()
    this.apiService.getApi(url, 1).subscribe((res) => {
      if (res.responseCode == 200) {
        this.templateList = res.result
        // this.total = res.result.total

        this.commonService.hideSpinner()

        $('#selectTemplateModalModal').modal({
          show: true,
          backdrop: false
        })
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
  templateId: any = "none"
  sendNotification() {
    if (this.templateId == "none") {
      this.commonService.warningToast("Please select template")
      return
    }
    let url = "admin/broadCast?templateId=" + this.templateId
    const data = {
      userId: this.recepentId,

    }
    this.commonService.showSpinner()
    this.apiService.postApi(url, data, 1).subscribe((res) => {
      if (res.responseCode == 200) {
        let i = 0
        this.selectAll = false
        for (let item of this.listArray) {
          this.checkbox[i] = false
          i++

          this.recepentId = []
        }
        this.templateId = "none"
        $('#selectTemplateModalModal').modal('hide')


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

  deleteAdmin() {
    let url = "admin/deleteManyCoupon"
    const data = {
      couponId: this.deleteAdminId
    }
    this.commonService.showSpinner()
    this.apiService.deleteApi(url, data, 1).subscribe((res) => {
      if (res.responseCode == 200) {
        for (let i = 0; i < this.checkbox.length; i++) {
          this.checkbox[i] = false
        }
        this.getAllUserList()
        this.deleteAdminId = []
        this.commonService.successToast(res.responseMessage)
        this.commonService.hideSpinner()
      } else {
        this.commonService.errorToast(res.responseMessage)
        this.commonService.hideSpinner()
      }
    })
  }
  //  open modal to delete admin for particular delete
  deleteAdminId: any = []
  openDeleteModal(id) {
    this.deleteAdminId = []
    this.deleteAdminId[0] = id
    $('#deleteModal').modal({
      show: true,
      backdrop: false
    })
  }
  // delete for bulk delete
  action: any = 0
  openBulkDeleteModal() {
    if (this.deleteAdminId != '') {
      if (!this.action || this.action == 0) {
        return
      }
      $('#deletebulkModal').modal({
        show: true,
        backdrop: false
      })
    }
    else {
      this.commonService.infoToast("Please select notification to delete.")
    }
  }
  // editAdmin(id){
  //   this.router.navigate(["/admin/edit-admin"],{queryParams : {id}})
  // }

  // add id which is to be delete
  addAdminId(id, e) {
    console.log(id, e.target.checked);
    if (e.target.checked) {
      this.deleteAdminId.push(id);
    } else {
      this.deleteAdminId.splice(this.deleteAdminId.indexOf(id), 1);
    }
    console.log(this.deleteAdminId);
  }
  // checkbox : any =[]
  // add all id by single click
  // addMultipleId(e){
  //   this.deleteAdminId = []
  //   if(e.target.checked){
  //     let i = 0
  //     for(let item of this.listArray){
  //       this.checkbox[i] = true
  //       i++
  //       this.deleteAdminId.push(item?._id)
  //     }
  //   }
  //   else{
  //     let i = 0
  //     for(let item of this.listArray){
  //       this.checkbox[i] = false
  //       i++
  //       this.deleteAdminId.push(item?._id)
  //     }

  //     this.deleteAdminId = []
  //   }
  //   console.log(this.deleteAdminId);

  // }

  listNotification(type) {
    console.log(type)
    let url = "notification/listPushNotification"
    const data = {
      notificationType: type,
      // page: this.currentPage,
      // limit: this.pageSize
    }
    this.commonService.showSpinner()
    this.apiService.postApi(url, data, 1).subscribe((res) => {
      if (res.responseCode == 200) {
        this.commonService.hideSpinner()
        this.commonService.successToast(res.responseMessage)
        // this.router.navigate(['/admin'])
      } else {
        this.commonService.hideSpinner()
        this.commonService.errorToast(res.responseMessage)
      }
    })


  }


  notificationDashboard() {
    let url = `admin/mainDashbord`
    this.commonService.showSpinner()
    this.apiService.getApi(url, 1).subscribe((res) => {
      if (res.responseCode == 200) {
        this.notificationArray = res.result
        this.commonService.hideSpinner()
        // this.commonService.successToast(res.responseMessage)
      }
      else {
        this.commonService.hideSpinner()
        // this.commonService.errorToast(res.responseMessage)
      }
    },
      (err: any) => {
        this.commonService.hideSpinner();
        // this.commonService.errorToast(error.error.responseMessage)
      })
  }
}
