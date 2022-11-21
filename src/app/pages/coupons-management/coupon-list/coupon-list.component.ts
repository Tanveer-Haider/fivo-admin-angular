import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';

declare var $;
@Component({
  selector: 'app-coupon-list',
  templateUrl: './coupon-list.component.html',
  styleUrls: ['./coupon-list.component.css']
})
export class CouponListComponent implements OnInit {

  pageSize: any = 5
  total: any
  currentPage = 1
  //  adminList : any  = []
  selectAll: any
  advertId: any;
  listArray: any = []
  search: any
  useCurrency: any = localStorage.getItem("useCurrency")

  constructor(
    private activatedRouting: ActivatedRoute, public commonService: CommonService, public service: ApiFunctionalityService, private router: Router) {
    this.activatedRouting.queryParams.subscribe((res: any) => {
      this.advertId = res.id
    })
    for (let i = 0; i < this.listArray.length; i++) {
      this.checkbox[i] = false
    }
  }

  changePage(e) {
    this.currentPage = e
    this.selectAll = false
    let i = 0
    for (let item of this.listArray) {
      this.checkbox[i] = false
      i++

      this.deleteAdminId = []
    }
    this.getCategoryList()
  }
  ngOnInit(): void {
    this.getCategoryList()
  }
  getCategoryList() {
    let url = `admin/listCoupon?page=${this.currentPage}&limit=${this.pageSize}${this.search ? "&search=" + this.search : ''}`

    this.commonService.showSpinner()
    this.service.getApi(url, 1).subscribe((res) => {
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
      this.commonService.hideSpinner()
    })
  }


  deleteAdmin() {
    let url = "admin/deleteManyCoupon"
    const data = {
      couponId: this.deleteAdminId
    }
    this.commonService.showSpinner()
    this.service.deleteApi(url, data, 1).subscribe((res) => {
      if (res.responseCode == 200) {
        for (let i = 0; i < this.checkbox.length; i++) {
          this.checkbox[i] = false
        }
        this.deleteAdminId = []
        this.getCategoryList()
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
      this.commonService.infoToast("Please select coupon to delete.")
    }
  }

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
    this.getCategoryList()

  }
  timer: any
  searchText(e) {
    console.log(e.target.value);


    let me = this
    this.search = e.target.value
    clearInterval(this.timer)
    this.timer = setTimeout(function () {
      me.currentPage = 0
      me.getCategoryList();
    }, 2000);
  }


}
