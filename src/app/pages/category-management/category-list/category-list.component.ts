import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiFunctionalityService } from 'src/app/Services/api-functionality.service';
import { CommonService } from 'src/app/Services/common.service';

declare var $;
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  customerDataExcel: any = []
  pageSize: any = 10
  total
  currentPage = 1
  selectAll: any
  listArray: any = []
  category: any = []
  constructor(private apiService: ApiFunctionalityService, private router: Router, public commonService: CommonService, private datepipe: DatePipe) {
    console.log("product list component");

  }
  changePage(e) {

  }
  ngOnInit(): void {
    this.categoryList()
    this.getDashboard()
  }
  search: any

  status: any = "ALL"
  filterStatus(e) {
    this.status = e
    this.currentPage = 1
    console.log(e);

    this.categoryList()
  }
  categoryList() {
    let apiReqUrl = "category/listCategory"
    var apiReqData = {
      'page': String(this.currentPage),
      'limit': String(this.pageSize),
      'search': this.search,
      categoryType: this.status == "ALL" ? '' : this.status

    };
    var temp = this.commonService.removeEmptyKey(apiReqData)
    // var apiReqData = new FormData();
    // apiReqData.append('page',String(this.currentPage))
    this.commonService.showSpinner()
    this.apiService.postFormDataApi(apiReqUrl, temp, 1).subscribe((res: any) => {
      if (res.responseCode == 200) {
        // console.log(res.result.docs);
        this.listArray = res.result.docs
        this.total = res.result.total
        this.commonService.hideSpinner()
        //  this.commonService.successToast(res.responseMessage)
      }
      else {
        this.listArray = []
        this.commonService.hideSpinner()
        this.commonService.errorToast(res.responseMessage)
      }
    }, err => {
      this.listArray = []
      this.commonService.hideSpinner()
      this.commonService.errorToast(err.error.responseMessage)
    })
  }

  //  open modal to delete admin
  deleteAdminId: any = []
  openDeleteModal(id) {
    this.deleteAdminId = []
    this.deleteAdminId[0] = id
    $('#deleteModal').modal({
      show: true,
      backdrop: false
    })
  }
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
      this.commonService.infoToast("Please select category to delete.")
    }
  }

  navigateEdit(id) {
    this.router.navigate([`/category/edit-category/${id}`])
  }

  deleteAdmin() {
    let url = "category/deleteAllCategory"
    const data = {
      categoryId: this.deleteAdminId
    }
    this.commonService.showSpinner()
    this.apiService.deleteApi(url, data, 1).subscribe((res) => {
      if (res.responseCode == 200) {
        for (let i = 0; i < this.checkbox.length; i++) {
          this.checkbox[i] = false
        }
        this.categoryList()
        this.deleteAdminId = []
        this.commonService.successToast(res.responseMessage)
        this.commonService.hideSpinner()
      } else {
        this.commonService.errorToast(res.responseMessage)
        this.commonService.hideSpinner()
      }
    })
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
    this.categoryList()

  }
  timer: any
  searchText(e) {
    console.log(e.target.value);

    let me = this
    this.search = e.target.value
    clearInterval(this.timer)
    this.timer = setTimeout(function () {
      me.currentPage = 0
      me.categoryList();
    }, 2000);
  }

  exportAsXLSX() {

    let apiReqUrl = `category/listCategory`
    let apiReqData = {
      'page': String(this.currentPage),
      'limit': String(this.total),
      'search': this.search
    }
    this.apiService.postFormDataApi(apiReqUrl, apiReqData, 1).subscribe((res: any) => {
      if (res.responseCode == 200) {
        this.customerDataExcel = res.result.docs;
        let dataArr = [];
        this.customerDataExcel.forEach((element, ind) => {
          console.log(element);

          let obj = {};
          obj = {
            "Category": element.categoryName ? element.categoryName : "--",
            "Category Type": element.categoryType ? element.categoryType : "--",
            // "Image": element.categoryImage ? element.categoryImage : "--",
          };
          dataArr.push(obj);
        });
        this.commonService.exportAsExcelFile(dataArr, "Category Management");
      }
    })
  }

  // category dashboard
  getDashboard() {
    let url = `admin/categoryDashboard`
    this.commonService.showSpinner()
    this.apiService.getApi(url, 1).subscribe((res) => {
      if (res.responseCode == 200) {
        this.category = res.result
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
