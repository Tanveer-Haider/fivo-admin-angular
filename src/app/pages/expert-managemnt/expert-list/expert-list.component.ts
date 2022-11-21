import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';
declare var $: any
@Component({
  selector: 'app-expert-list',
  templateUrl: './expert-list.component.html',
  styleUrls: ['./expert-list.component.css']
})
export class ExpertListComponent implements OnInit {
  pageSize: any = 5
  selectedItems = []
  customerDataExcel: any = [];
  total: any
  currentPage = 1
  action: any = 0
  selectAll: any
  search: any
  service = []
  serviceList = []
  listArray: any = []
  constructor(private apiService: ApiFunctionalityService, private commonService: CommonService, private router: Router,private date : DatePipe) {
    console.log("order list component");

  }

  ngOnInit(): void {
    // this.getAllServiceList()
    this.expertList()
    this.expertDashboard()
  }

  trade: any
  status: any = "ALL"
  filterStatus(e) {
    this.status = e
    this.currentPage = 1
    console.log(e);

    this.expertList()
  }
  /* -=-=-=-=-=-=- Api of expert List -=-=-=-=-=-==-=-= */
  expertList() {
    let apiReqUrl = "admin/listExpert"
    // var apiReqData = new FormData();
    // apiReqData.append('page',String(this.currentPage))
    // apiReqData.append('limit',String(this.pageSize))
    // if(this.status != 'ALL'){
    //   apiReqData.append('status1',String(this.status))

    // }
    var apiReqData = {
      page: this.currentPage,
      limit: this.pageSize,
      status1: this.status != 'ALL' ? this.status : ''
    }
    var temp = this.commonService.removeEmptyKey(apiReqData)
    this.commonService.showSpinner()
    this.apiService.postFormDataApi(apiReqUrl, temp, 1).subscribe((res: any) => {
      if (res.responseCode == 200) {
        this.listArray = res.result.docs
        // this.tradeData = res.result.docs
        this.total = res.result.total
        res.result.docs.forEach((element, index) => {
          this.trade = element.trade
          console.log(this.trade);
        });



        // this.getAllServiceList()
        // var str2 = this.listArray.forEach(element => {
        //     return element.trade
        // });

        // this.selectedItems = this.serviceList.filter((response,index)=>{
        //   return str2[index].includes(response?._id)
        // })
        // console.log(this.selectedItems);

        // this.selectedItems
        this.commonService.hideSpinner()
        //  this.commonService.successToast(res.responseMessage)
      }
      else {
        this.commonService.hideSpinner()
        this.commonService.errorToast(res.responseMessage)
      }
    }, (err) => {
      this.listArray = []
    })
  }

  //  getAllServiceList(){
  //   let url = "service/listServiceWithoutPagination"
  //   this.commonService.showSpinner()
  //   this.apiService.getApi(url,1).subscribe((res)=>{    
  //       this.serviceList = res.result
  //       console.log(this.listArray);

  //       this.commonService.hideSpinner() 
  //   })
  // }

  changePage(e) {
    this.currentPage = e
    this.selectAll = false
    let i = 0
    for (let item of this.listArray) {
      this.checkbox[i] = false
      i++

      this.deleteAdminId = []
    }
    this.expertList()
  }
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

  openBulkDeleteModal() {
    if (!this.action || this.action == 0) {
      return
    }
    $('#deleteModal').modal({
      show: true,
      backdrop: false
    })
  }

  deleteAdmin() {
    let url = `admin/deleteExpert`
    const data = {
      expertId: this.deleteAdminId
    }
    this.commonService.showSpinner()
    this.apiService.deleteApi(url, data, 1).subscribe((res) => {
      if (res.responseCode == 200) {
        for (let i = 0; i < this.checkbox.length; i++) {
          this.checkbox[i] = false
        }
        this.expertList()
        this.deleteAdminId = []
        this.commonService.successToast(res.responseMessage)
        this.commonService.hideSpinner()
      } else {
        this.commonService.errorToast(res.responseMessage)
        this.commonService.hideSpinner()
      }
    })
  }
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
  checkbox: any = []
  // add all id by single click
  addMultipleId(e) {
    this.deleteAdminId = []
    if (e.target.checked) {
      let i = 0
      for (let item of this.listArray) {
        this.checkbox[i] = true
        i++
        this.deleteAdminId.push(item?._id)
      }
    }
    else {
      let i = 0
      for (let item of this.listArray) {
        this.checkbox[i] = false
        i++
        this.deleteAdminId.push(item?._id)
      }

      this.deleteAdminId = []
    }
    console.log(this.deleteAdminId);

  }
  addRow(e) {

    this.pageSize = e.target.value
    this.currentPage = 1
    this.expertList()

  }
  timer: any
  searchText(e) {
    console.log(e.target.value);


    // if (!e.target.value) {
    //   return
    // }
    let me = this
    this.search = e.target.value
    clearInterval(this.timer)
    this.timer = setTimeout(function () {
      me.currentPage = 0
      me.expertList();
    }, 2000);
  }

  navigateEdit(id) {
    this.router.navigate([`/expert/edit-expert/${id}`])
  }

  navigateView(id) {
    this.router.navigate([`/expert/view-expert/${id}`])
  }

  exportAsXLSX() {

    let apiReqUrl = `admin/listExpert`
    var apiReqData = {
      'page': String(this.currentPage),
      'limit': String(this.total),
    };
    this.apiService.postFormDataApi(apiReqUrl, apiReqData, 1).subscribe((res: any) => {
      if (res.responseCode == 200) {
        this.customerDataExcel = res.result.docs;
        this.customerDataExcel.forEach(element => {
          let trade = '';
          // create trade as a string from array of object
          element.trade.forEach(ele => {
            trade = trade + (trade ? ('/' + ele.description) : ele.description)
          });
          element.trade = trade
          // end trade as a string from array of object
        })
        let dataArr = [];
        this.customerDataExcel.forEach((element, ind) => {
          let obj = {};
          obj = {
            "Expert Name": element.firstName ? element.firstName : '--',
            "Phone Number": element.mobileNumber ? element.mobileNumber : '--',
            "Email": element.email ? element.email : "--",
            // "Trade": element.trade.length != 0 ? trade : '--',
            "Trade": element.trade ? element.trade : '--',
            "Completed Delevery" : element.completedDeliveries ? element.completedDeliveries : '0',
            "Last Login" :  element.updatedAt ? this.date.transform(element.updatedAt,'medium') : '--',
            "Status": element.status ? element.status : "--",
          };
          let array = dataArr.push(obj);
        });
        console.log(dataArr)
        this.commonService.exportAsExcelFile(dataArr, "Expert Management");
      }
    })
  }

  //  expert dashboard
  dashboard: any
  expertDashboard() {
    let url = "admin/expertDashbord"
    this.commonService.showSpinner()
    this.apiService.getApi(url, 1).subscribe((res) => {
      if (res.responseCode == 200) {
        this.dashboard = res.result
        // this.commonService.successToast(res.responseMessage)
        this.commonService.hideSpinner()
      } else {
        this.commonService.errorToast(res.responseMessage)
        this.commonService.hideSpinner()
      }
    })

  }
  assending : boolean = true
  sorting(){
    if(this.assending){
     this.listArray =  this.listArray.sort((a,b)=>{
       let a1 = Date.parse(a.updatedAt)
       let a2 = Date.parse(b.updatedAt)
     return   a1 - a2
        
      })
      this.assending = false

    }
    else{
     this.listArray = this.listArray.sort((a,b)=>{
      let a1 = Date.parse(a.updatedAt)
      let a2 = Date.parse(b.updatedAt)
       return   a2 - a1
        
      })
      this.assending = true
    }
    
    console.log(this.listArray);
    
  }
}
