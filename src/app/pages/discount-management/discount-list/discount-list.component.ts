import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';

declare var $;
@Component({
  selector: 'app-discount-list',
  templateUrl: './discount-list.component.html',
  styleUrls: ['./discount-list.component.css']
})
export class DiscountListComponent implements OnInit {

  pageSize: any = 5
  total
  currentPage = 1
  customerDataExcel = []
  listArray: any = []
  selectAll: any
  AgentHeader: any = [
    { "id": 1, "name": "All", "backgroundColor": "bg-green", "icon": "fa fa-users" },
    { "id": 2, "name": "Active agents", "backgroundColor": "bg-darkblue", "icon": "fa fa-check" },
    { "id": 3, "name": "Inactive agents", "backgroundColor": "bg-lightessblack", "icon": "fa fa-times" }
  ]
  useCurrency: any = localStorage.getItem("useCurrency")

  constructor(private apiService: ApiFunctionalityService, public commonService: CommonService, private datepipe: DatePipe) {
    console.log("agent list component");

    // for( let i = 0 ; i < this.listArray.length ; i++){
    //   this.checkbox[i] = false
    // }

  }
  changePage(e) {
    this.currentPage = e
    this.selectAll = false
    let i = 0
    for (let item of this.listArray) {
      this.checkbox[i] = false
      i++

      this.deleteId = []
    }
    this.getAllDiscount()
  }
  search: any
  ngOnInit(): void {
    this.getAllDiscount()
  }
  getAllDiscount() {
    let url = `admin/listDiscount?page=${this.currentPage}&limit=${this.pageSize}${this.search ? '&search=' + this.search : ''}`
    this.commonService.showSpinner()
    this.apiService.getApi(url, 1).subscribe((res) => {
      if (res.responseCode == 200) {
        this.listArray = res.result.docs
        this.total = res.result.total
        this.commonService.hideSpinner()
        this.deleteId = []
        // this.commonService.successToast(res.responseMessage)
      } else {
        this.commonService.hideSpinner()
        this.commonService.errorToast(res.responseMessage)
      }
    }, (err) => {
      this.commonService.hideSpinner()
      this.commonService.errorToast(err.error.responseMessage)
    })
  }
  // delete discount
  deleteDiscount() {
    let url = `admin/deleteDiscount`
    const data = {
      discountId: this.deleteId
    }
    this.commonService.showSpinner()
    this.apiService.deleteApi(url, data, 1).subscribe((res) => {
      if (res.responseCode == 200) {
        for (let i = 0; i < this.checkbox.length; i++) {
          this.checkbox[i] = false
        }
        this.deleteId = []
        this.getAllDiscount()
        this.commonService.hideSpinner()
        this.commonService.successToast(res.responseMessage)
      } else {
        this.commonService.hideSpinner()
        this.commonService.errorToast(res.responseMessage)
      }
    })
  }
  //  open modal to delete discount
  deleteId: any = []
  openDeleteModal(id) {

    this.deleteId = []
    this.deleteId[0] = id
    $('#deleteModal').modal({
      show: true,
      backdrop: false
    })
  }
  action: any = 0
  openBulkDeleteModal() {
    if (this.deleteId != '') {
      if (!this.action || this.action == 0) {
        return
      }
      $('#deletebulkModal').modal({
        show: true,
        backdrop: false
      })
    }
    else {
      this.commonService.infoToast("Please select discount to delete.")
    }
  }
  addDeleteId(id, e) {
    console.log(id, e.target.checked);
    if (e.target.checked) {
      this.deleteId.push(id);
    } else {
      this.deleteId.splice(this.deleteId.indexOf(id), 1);
    }
    console.log(this.deleteId);
  }
  checkbox: any = []
  addMultipleId(e) {
    this.deleteId = []
    if (e.target.checked) {
      let i = 0
      for (let item of this.listArray) {
        this.checkbox[i] = true
        i++
        this.deleteId.push(item?._id)
      }
    }
    else {
      let i = 0
      for (let item of this.listArray) {
        this.checkbox[i] = false
        i++
        this.deleteId.push(item?._id)
      }

      this.deleteId = []
    }
    console.log(this.deleteId);

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
      me.currentPage = 1
      me.getAllDiscount();
    }, 2000);
  }
  addRow(e) {

    this.pageSize = e.target.value
    this.currentPage = 1
    this.getAllDiscount()

  }

  exportAsXLSX() {

    let apiReqUrl = `admin/listDiscount?page=${this.currentPage}&limit=${this.total}${this.search ? '&search=' + this.search : ''}`
    // let apiReqData={
    //   'limit':String(this.total),
    //   'search':this.search
    // }
    this.apiService.getApi(apiReqUrl, 1).subscribe((res: any) => {
      if (res.responseCode == 200) {
        this.customerDataExcel = res.result.docs;
        let dataArr = [];
        this.customerDataExcel.forEach((element, ind) => {
          let obj = {};
          obj = {
            "Name": element.name ? element.name : "--",
            "Amount": element.amount ? 'k' + element.amount : "--",
            "Discount Type": element.disCountType ? element.disCountType : "--",
            "Start Date": element.startDate ? this.datepipe.transform(element.startDate, "medium") : "--",
            "End Date": element.endDate ? this.datepipe.transform(element.endDate, "medium") : "--",
            "Status": element.status ? element.status : "--",
          };
          let array = dataArr.push(obj);
        });
        this.commonService.exportAsExcelFile(dataArr, "Discount Management");
      }
    })
  }

}
