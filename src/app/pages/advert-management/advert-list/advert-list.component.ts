import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';


declare var $;
@Component({
  selector: 'app-advert-list',
  templateUrl: './advert-list.component.html',
  styleUrls: ['./advert-list.component.css']
})
export class AdvertListComponent implements OnInit {

  pageSize: any = 5
  isAll = false
  total: any
  currentPage = 1
  customerDataExcel: any = []
  //  adminList : any  = []
  selectAll: any
  advertId: any;
  listArray: any = []
  search: any
  advert: any = []

  constructor(
    private activatedRouting: ActivatedRoute, public commonService: CommonService, public service: ApiFunctionalityService, private router: Router, private datepipe: DatePipe) {
    this.activatedRouting.queryParams.subscribe((res: any) => {
      this.advertId = res.id
    })
  }

  changePage(e) {
    this.currentPage = e
    this.selectAll = true
    let i = 0
    for (let item of this.listArray) {
      this.checkbox[i] = false
      i++

      this.deleteAdvertId = []
    }
    this.getAdvertList()
  }
  ngOnInit(): void {
    this.getAdvertList()
  }
  getAdvertList() {
    let url = `admin/listAdvertiesment?page=${this.currentPage}&limit=${this.pageSize}${this.search ? "&search=" + this.search : ''}`
    let data = {

    }
    this.commonService.showSpinner()
    this.service.postApi(url, data, 1).subscribe((res) => {
      if (res['responseCode'] == 200) {
        this.listArray = res['result']["docs"]
        this.total = res.result.total
        this.commonService.hideSpinner()
        // this.commonService.successToast(res["responseMessage"])

      }
      else {
        this.listArray = []
        this.commonService.hideSpinner()
        this.commonService.errorToast(res["responseMessage"])
      }
    }, err => {
      this.listArray = []
    })
  }
  //  open modal to delete advert
  // openDeleteModal(){
  //   $('#deleteModal').modal({
  //     show : true,
  //     backdrop : false
  //   })
  // }

  deleteAdmin() {
    let url = "admin/deleteAdvertiesment"
    let data;
    if (this.isAll == false) {
      data = {
        advertiesmentId: this.deleteAdvertId
      }
    }
    else {
      data = {
        'advertiesmentId': [],
        'isAll': this.isAll
      }
      console.log(data);
    }

    this.commonService.showSpinner()
    this.service.deleteApi(url, data, 1).subscribe((res) => {
      if (res.responseCode == 200) {
        for (let i = 0; i < this.checkbox.length; i++) {
          this.checkbox[i] = false
        }
        this.deleteAdvertId = []
        this.getAdvertList()
        this.commonService.successToast(res.responseMessage)
        this.commonService.hideSpinner()
      } else {
        this.commonService.errorToast(res.responseMessage)
        this.commonService.hideSpinner()
      }
    })
    // console.log(this.isAll, data);

  }
  //  open modal to delete admin for particular delete
  deleteAdvertId: any = []
  openDeleteModal(id) {
    this.deleteAdvertId = []
    this.deleteAdvertId[0] = id
    $('#deleteModal').modal({
      show: true,
      backdrop: false
    })
  }
  // delete for bulk delete
  action: any = 0
  openBulkDeleteModal() {
    if (this.deleteAdvertId != '') {
      if (!this.action || this.action == 0) {
        return
      }
      $('#deletebulkModal').modal({
        show: true,
        backdrop: false
      })
    }
    else {
      this.commonService.infoToast("Please select advert to delete.")
    }
  }
  // editAdmin(id){
  //   this.router.navigate(["/admin/edit-admin"],{queryParams : {id}})
  // }

  // add id which is to be delete
  addAdminId(id, e) {
    console.log(id, e.target.checked);
    if (e.target.checked) {
      this.deleteAdvertId.push(id);
    } else {
      this.deleteAdvertId.splice(this.deleteAdvertId.indexOf(id), 1);
    }
    console.log(this.deleteAdvertId);
  }
  checkbox: any = []
  // add all id by single click
  addMultipleId(e) {
    if (this.isAll == true) {
      this.isAll = false
    }
    else {
      this.isAll = true
    }
    this.deleteAdvertId = []
    if (e.target.checked) {
      let i = 0
      for (let item of this.listArray) {
        this.checkbox[i] = true
        i++
        this.deleteAdvertId.push(item?._id)
      }
    }
    else {
      let i = 0
      for (let item of this.listArray) {
        this.checkbox[i] = false
        i++
        this.deleteAdvertId.push(item?._id)
      }

      this.deleteAdvertId = []
    }
    console.log(this.isAll);

  }
  addRow(e) {

    this.pageSize = e.target.value
    this.currentPage = 1
    this.getAdvertList()

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
      me.getAdvertList();
    }, 2000);
  }

  //------------------ export as excel for download file --------------//
  exportAsXLSX() {
    let apiReqBody = {
      'search': this.search,
      'limit': String(this.total)
    };

    let apiReqUrl = `admin/listAdvertiesment?page=${this.currentPage}&limit=${this.pageSize}${this.search ? "&search=" + this.search : ''}`
    this.service.postApi(apiReqUrl, apiReqBody, 1).subscribe((res: any) => {
      if (res.responseCode == 200) {
        this.customerDataExcel = res.result.docs;
        let dataArr = [];
        this.customerDataExcel.forEach((element, ind) => {
          let obj = {};
          obj = {
            "Description": element.description ? element.description : "--",
            "Runtime": element.runtime + 'Seconds' ? element.runtime + 'Seconds' : "--",
            // "Image": element.advertiesmentImage ? element.advertiesmentImage : "--",
            // "Discount": element.discount+'%' ? element.discount+'%' : "--",
          };
          let array = dataArr.push(obj);
        });
        this.commonService.exportAsExcelFile(dataArr, "Advert Management");
      }
    })
  }


  // advert dashboard
  getDashboard() {
    let url = `admin/categoryDashboard`
    this.commonService.showSpinner()
    this.service.getApi(url, 1).subscribe((res) => {
      if (res.responseCode == 200) {
        this.advert = res.result
        this.commonService.hideSpinner()
        // this.commonService.successToast(res.responseMessage)
      }
      else {
        this.commonService.hideSpinner()
        this.commonService.errorToast(res.responseMessage)
      }
    })
  }
}
